const nodemailer = require("nodemailer");
const flash = require('connect-flash');


exports.getAboutPage = (req,res) => {
    res.status(200).render('about', {
        page_name: "about"
    });
};

exports.getIndexPage = (req,res) => {
    console.log(req.session.userID);
    res.status(200).render('index', {
        page_name: "index"
    });
};

exports.getRegisterPage = (req,res) => {
    res.status(200).render('register', {
        page_name: "register"
    });
};

exports.getLoginPage = (req,res) => {
    res.status(200).render('login', {
        page_name: "login"
    });
};

exports.getContactPage = (req,res) => {
    res.status(200).render('contact', {
        page_name: "contact"
    });
};

exports.sendEmail = async (req,res) => {
    try {
    const outputMessage = `
    <h1>Message Details </h1>
    <ul>
    <li> Name: ${req.body.name} </li>
    <li> Email: ${req.body.email} </li>
    </ul>
    <h1> Message </h1>
    <p> ${req.body.message} </p>
    
    `


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "eren.gp54@gmail.com", // gmail account
          pass: "pgkcjzydvrgilquw", // gmail password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Smart Edu Contact Form" <eren.gp54@gmail.com>', // sender address
        to: "eren.simsir@hotmail.com", // list of receivers
        subject: "Smart Edu Contact FORM New Message", // Subject line
        html: outputMessage, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...



      req.flash("success", "We succesfully received your e-mail.");
      res.status(200).redirect('/contact');
    
    } catch(error) {
      req.flash("error", `We didn't take your e-mail. ${error} `);
      res.status(200).redirect('/contact');
    }
};