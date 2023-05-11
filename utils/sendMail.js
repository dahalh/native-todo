import { createTransport } from "nodemailer";
import nodemailer from "nodemailer";

const emailProcessor = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(email, subject, text);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

export const sendMail = async (email, subject, text) => {
  const mailBody = {
    from: process.env.SMTP_USER,
    to: email,
    subject,
    text,
  };

  emailProcessor(mailBody);
};

// export const sendMail = async (email, subject, text) => {
//   const transport = createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   await transport.sendMail({
//     from: process.env.SMTP_USER,
//     to: email,
//     subject,
//     text,
//   });
// };
