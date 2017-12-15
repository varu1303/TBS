const nodemailer = require('nodemailer');
//
const {emailId, password} = require('./../../config/email-cred');

let transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  auth: {
      user: emailId, // Your email id
      pass: password // Your password
  }
});

module.exports = {
  
  sendPassMail: (email, newpass) => {
  
    return new Promise((resolve, reject) => {
        let text = `Hey! Your new PASSWORD is : ${newpass}. Look for the lock icon in 'YOUR PROFILE' to change password!` 
        let mailOptions = {
                from: emailId, // sender address
                to: email, // list of receivers
                subject: 'Password Change', // Subject line
                text: text 
            };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                reject();

            }else{
                resolve({
                    email,
                    pass: newpass
                });
            }
        }); 
        
    });


  }

}