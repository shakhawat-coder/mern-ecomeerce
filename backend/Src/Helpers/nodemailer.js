const nodemailer = require("nodemailer");
const emailTemplate = require("./Template.js");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

async function sendMail(userEmail, otp) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Verify your email ✔",
    html: emailTemplate(otp), // html body
  });
  console.log(info);
  return info;

  // if (info.messageId) {
  //   return true;
  // }
  // console.log("Message sent: %s", info.messageId);
}

module.exports = { sendMail };
