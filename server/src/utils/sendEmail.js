import nodeMailer from "nodemailer";

const sendEmail = async (options) => {
  const transpoter = nodeMailer.createTransport({
    host: process.env.SMTP_MAIL_HOST,
    port: process.env.SMTP_MAIL_PORT,
    auth: {
      user: process.env.SMTP_USER_MAIL,
      pass: process.env.SMTP_PASS,
    },
    service: process.env.SMTP_SERVICE,
  });

  const mailOptions = {
    from: process.env.SMTP_USER_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  return await transpoter.sendMail(mailOptions)
};

export default sendEmail;
