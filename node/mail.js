const nodemailer = require('nodemailer');
const { EMAIL_KEY, EMAIL_DEFAULT_FROM } = require('../config');

const isProd = process.env.NODE_ENV === 'production';

class Transporter {
  async _createInstance() {
    const options = {
      host: 'smtp.sparkpostmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: { user: 'SMTP_Injection', pass: EMAIL_KEY },
    };

    if (!isProd) {
      // Generate test SMTP service account from ethereal.email
      const testAccount = await nodemailer.createTestAccount();
      options.host = 'smtp.ethereal.email';
      options.auth = { user: testAccount.user, pass: testAccount.pass };
    }

    return nodemailer.createTransport(options);
  }

  /**
   * @param {{
   * to: string
   * from?: string
   * subject: string
   * text?: string
   * html?: string
   * templateId?: string
   * }} options
   * @returns {Promise<void>}
   */
  async send({
    to,
    from = EMAIL_DEFAULT_FROM,
    subject,
    text,
    html,
    templateId,
  }) {
    const self = await this._createInstance();
    const info = await self.sendMail({
      to,
      from,
      subject,
      text,
      html,
      templateId,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      // Preview only available when sending through an Ethereal account
      console.log('Email Preview URL: %s', previewUrl);
    }
  }
}

/**
 * @param {{
 * to: string
 * from?: string
 * subject: string
 * text?: string
 * html?: string
 * templateId?: string
 * }} options
 * @returns {Promise<void>}
 */
const mail = ({ to, from, subject, text, html, templateId }) => {
  if (!isProd) {
    subject = `[${process.env.NODE_ENV || 'DEV'}] ` + subject;
  }

  const mailer = new Transporter();
  return mailer.send({ to, from, subject, text, html, templateId });
};

module.exports = mail;
