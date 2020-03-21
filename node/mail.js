const nodemailer = require("nodemailer");

const isProd = process.env.NODE_ENV === "production";

class Transporter {
  async _createInstance() {
    let options;

    if (!isProd) {
      // Generate test SMTP service account from ethereal.email
      const testAccount = await nodemailer.createTestAccount();
      options = {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      };
    } else {
      options = {
        service: "SendinBlue", // no need to set host or port etc.
        // host: "smtp-relay.sendinblue.com",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
          user: "me@me.co",
          pass: "1234567890"
        }
      };
    }

    return nodemailer.createTransport(options);
  }

  async send({ to, from = mail.defaultFrom, subject, text, html, templateId }) {
    const self = await this._createInstance();
    const info = await self.sendMail({ to, from, subject, text, html, templateId });

    if (!isProd) {
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  }
}

const mail = async ({ to, from, subject, text, html, templateId }) => {
  if (!isProd) {
    subject = `[${process.env.NODE_ENV}] ` + subject;
  }

  const mailer = new Transporter();
  await mailer.send({ to, from, subject, text, html, templateId });
};

mail({
  to: "you@you.co",
  from: "me@me.co",
  subject: "Check it",
  text: "This is a great email!"
}).then(console.log);

module.exports = mail;
