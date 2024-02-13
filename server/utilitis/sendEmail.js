import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "ayyappadasas008@gmail.com",
      pass: "jwdklebzsrllorkm",
    },
  });
  
  
  async function sendMail(to, subject, text, html) {
    const info = await transporter.sendMail({
        from: 'ayyappadasas008@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: html
    });
}

  export {sendMail}