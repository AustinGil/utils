import nodemailer from 'nodemailer'
import { SMTP_URL, SMTP_USER, SMTP_PASS, SMTP_PORT, EMAIL_DEFAULT_FROM } from '../../constants.js'

const isProd = process.env.NODE_ENV === 'production';

class Transporter {
  async _createInstance() {
    const options = {
      host: SMTP_URL,
      port: SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: { user: SMTP_USER, pass: SMTP_PASS },
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
   * subject: string
   * from?: string
   * }
   * & ( { text: string, html?: never } | { text?: never, html: string } )
   * } options
   */
  async send({
    to,
    from = EMAIL_DEFAULT_FROM,
    subject,
    text,
    html,
  }) {
    const self = await this._createInstance();
    const info = await self.sendMail({
      to,
      from,
      subject,
      text,
      html,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      // Preview only available when sending through an Ethereal account
      console.log('Email Preview URL: %s', previewUrl);
    }
  }
}

/**
 * @type {InstanceType<typeof Transporter>['send']}
 */ 
export const mail = ({ to, from, subject, text, html }) => {
  if (!isProd) {
    subject = `[${process.env.NODE_ENV || 'DEV'}] ` + subject;
  }

  const mailer = new Transporter();
  return mailer.send({ to, from, subject, text, html });
};
