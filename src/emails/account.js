// website = nodemailer.com

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {

    user: process.env.EMAIL,        // from where email will be sent
    pass: process.env.PASSWORD,      // app password of kunjv25@gmail.com
  },
});

// async..await is not allowed in global scope, must use a wrapper
const welcome = async (email, name) => {
    // send mail with defined transport object
    try {
      await transporter.sendMail({
        from: '"Task-Manager-App" <kunjv25@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "welcome ✔", // Subject line
        text: `Welcome ${name} to Task-Manager-app.Thank you for sign up ` // plain text body
        // html: "<b>Hello world?</b>", // html body
      });
    } catch (error) {}
  
    // console.log("Message sent: %s", messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  };

  const cancel = async (email, name) => {
    // send mail with defined transport object
    try {
      await transporter.sendMail({
        from: '"Task-Manager-App" <kunjv25@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "welcome ✔", // Subject line
        text: `${name} deleted` // plain text body that will be displayed in email
        // html: "<b>Hello world?</b>", // html body
      });
      console.log(`Hi ${name} got deleted`);
    } catch (error) {}
  
    // console.log("Message sent: %s", messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  };

module.exports = {
                    welcome ,
                    cancel
                 }