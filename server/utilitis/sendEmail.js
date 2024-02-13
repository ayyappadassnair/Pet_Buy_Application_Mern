import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.Email_Host,
    secure: true,
    auth: {
      user: process.env.Email_Auth_User,
      pass: process.env.Email_Auth_Pass,
    },
  });

  async function sendMail(to, subject, text, html) {
    const info = await transporter.sendMail({
        from: process.env.Email_Auth_User,
        to: to,
        subject: subject,
        text: text,
        html: html
    });
}

  export {sendMail}