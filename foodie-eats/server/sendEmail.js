const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "hillm0551",
        pass: "Claudya290601!@#$%^&*()",
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
