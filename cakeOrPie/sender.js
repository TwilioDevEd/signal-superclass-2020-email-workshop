require('dotenv').config()

module.exports = function send(email, dynamicData) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Recipient from request
    from: "sender@example.com", // Change to your verified sender
    templateId: "YOUR TEMPLATE ID", // Change to a valid template ID
    dynamicTemplateData: dynamicData,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
