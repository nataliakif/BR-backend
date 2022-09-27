const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "mailingListPlatform@gmail.com" };
  await sgMail
    .send(email)
    .then(() => {
      console.log("email send success");
      return true;
    })
    .catch((error) => console.log(error.message));
  return true;
};

module.exports = sendEmail;
