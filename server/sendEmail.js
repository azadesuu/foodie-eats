const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "foodieeats.team",
        pass: process.env.EMAIL_PWD
      }
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: `FoodieEats: ${subject}`,
      text: text
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
