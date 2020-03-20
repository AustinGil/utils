const nodemailer = require("nodemailer")
const SparkPost = require("sparkpost")
const { mail } = require("../config")

const isProd = process.env.NODE_ENV === "production"

class Transporter {
  async _createInstance() {
    if (isProd) {
      const transporter = new SparkPost(mail.apiKey)
      return {
        async send({ from, to, subject, text, html, templateId }) {
          const params = {
            options: { open_tracking: false, click_tracking: false },
            content: { from, subject, text, html, template_id: templateId },
            recipients: [{ address: to }],
          }
          await transporter.transmissions.send(params)
        },
      }
    } else {
      // Generate test SMTP service account from ethereal.email
      const testAccount = await nodemailer.createTestAccount()
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })
      return {
        async send({ from, to, subject, text, html }) {
          const info = await transporter.sendMail({
            from,
            to,
            subject,
            text,
            html,
          })
          console.log("Message sent: %s", info.messageId)
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
        },
      }
    }
  }

  async send({ from = mail.defaultFrom, subject, to, text, html, templateId }) {
    const self = await this._createInstance()
    self.send({ subject, to, text, html, templateId, from })
  }
}

module.exports = async ({ subject, to, text, html, templateId, from }) => {
  if (!subject || !to || !(text + html + templateId)) {
    throw new Error("missing params")
  }

  if (!isProd) {
    subject = `[${process.env.NODE_ENV}] ` + subject
  }

  const mailer = new Transporter()
  await mailer.send({ to, text, html, templateId, subject, from })
}
