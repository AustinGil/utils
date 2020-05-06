// @ts-check
const nodemailer = require("nodemailer")
const { MAIL_USER, MAIL_PASS, MAIL_FROM } = require("./config")

const isProd = process.env.NODE_ENV === "production"

class Transporter {
  async _createInstance() {
    let options

    if (!isProd) {
      // Generate test SMTP service account from ethereal.email
      const testAccount = await nodemailer.createTestAccount()
      options = {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      }
    } else {
      options = {
        service: "SendinBlue", // no need to set host or port etc.
        // host: "smtp-relay.sendinblue.com",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS,
        },
      }
    }

    return nodemailer.createTransport(options)
  }

  async send({ to, from = MAIL_FROM, subject, text, html, templateId }) {
    const self = await this._createInstance()
    const info = await self.sendMail({
      to,
      from,
      subject,
      text,
      html,
      templateId,
    })

    if (!isProd) {
      console.log("Message sent: %s", info.messageId)
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    }
  }
}

/**
 * Sends an email
 * @param {object} options
 * @param {string} options.to "Recipient email address"
 * @param {string} options.subject "Email subject line"
 * @param {string} [options.from] "Senders email address"
 * @param {string} [options.text] "Email text contents"
 * @param {string} [options.html] "Email html contents"
 * @param {string} [options.templateId] "Template ID if supported"
 */
const mail = async ({ to, from, subject, text, html, templateId }) => {
  if (!isProd) {
    subject = `[${process.env.NODE_ENV}] ${subject}`
  }

  console.log("TODO: put mailer back online")

  // const mailer = new Transporter()
  // await mailer.send({ to, from, subject, text, html, templateId })
}

module.exports = mail
