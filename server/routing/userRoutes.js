const bcrypt = require('bcrypt');
//
const {responseObj} = require('./../config/response');
//Controller functions
const {saveUser, loginUser, updPassword, refRaisedTicket, getRaisedTicket} = require('./../controller/userController');
const {saveTicket} = require('./../controller/ticketController');
const {generateJWT} = require('./../controller/utilFunctions/jwt');
const createNewPassword = require('./../controller/utilFunctions/randomString');
const {sendPassMail} = require('./../controller/utilFunctions/mailer');
//Middlewares
const {isLoggedIn} = require('./middleware/isLoggedIn');

module.exports = app => {

// USER can 1) SIGNUP 
//          2) LOGIN 
//          3) FORGET PASSWORD
      /***below mentioned routes only works if user is logged in (A valid JWT required to be passed in header)***/
//          4) CHANGE PASSWORD
//          5) RAISE TICKET
//          6) GET ALL TICKETS RAISED BY HIM
//          7) GET ALL DETAILS OF ANY ONE PARTICULAR TICKET RAISED BY HIM
//          8) OPEN/CLOSE THAT TICKET
//          9) POST COMMENT ON THAT TICKET
         
        

  app.post('/signup', (req, res) => {
    let userDetails = req.body.userDetails;
    saveUser(userDetails)
      .then((user) => {
        res.json(responseObj(null,'Sign up successful',200,user.getPublicFields()));
      })
      .catch((error) => {
        res.status(400).json(responseObj(error,'Sign up failed',400,null));
      })
  })

  app.post('/login', (req,res) => {
    let userCredentials = req.body.userCredentials;
    if(!userCredentials.emailId)
      res.status(400).json(responseObj(null,'Email ID not provided',400,null));
    else {
      loginUser(userCredentials.emailId)
        .then((user) => {
          if(!user)
            res.status(404).json(responseObj(null,'Email ID not found in the Database',404,null));
          else {
            if(!userCredentials.password)
              res.status(400).json(responseObj(null,'Password not provided',400,null));
            else {
              bcrypt.compare(userCredentials.password, user.password, function(err, match) {
                if(err) {
                  res.status(500).json(responseObj(err,'Error in decrypting Password',500,null));
                } else if(match) {
                    let token = generateJWT(user.getPayload());
                    let data = user.getPublicFields();
                    data.token = token;
                    res.json(responseObj(null,'Login Successful',200,data));
                } else {
                    res.status(400).json(responseObj(null,'Incorrect Password',400,null));  
                }
              })              
            }
          }
        })
        .catch((error) => {
          res.status(500).json(responseObj(error,'Error in Finding user in DB',500,null));
        })
      }
  })

  app.post('/forgotpassword', (req, res) => {
    let emailId = req.body.emailId;
    if(!emailId)
      res.status(400).json(responseObj(null,'Email ID not provided',400,null)); 
    else {
      loginUser(emailId)
        .then((user) => {
          if(!user)
            res.status(404).json(responseObj(null,'Email ID not found in the Database',404,null));
          else {
            sendPassMail(emailId,createNewPassword())
              .then((updateDetails) => {
                return updPassword(updateDetails);                 
              })
              .then((user) => {
                res.json(responseObj(null,'New password set and sent',200,user.getPublicFields()));    
              })
              .catch((error) => {
                res.status(500).json(responseObj(error,'Error in Setting and sending new password',500,null));
              })
          }
        })
        .catch((error) => {
          res.status(500).json(responseObj(error,'Error in Finding user in DB',500,null));
        })      
    }
  })

  app.post('/changePassword', isLoggedIn, (req, res) => {
    if(!req.body.newPassword)
      res.status(400).json(responseObj(null,'New password not provided',400,null));  
    else {
      let u = {};
      u.email = req.emailidFROMTOKEN;
      u.pass = req.body.newPassword;
      updPassword(u)
        .then((user) => {
          res.json(responseObj(null,'Password changed',200,user.getPublicFields()));     
        })
        .catch((error) => {
          res.status(500).json(responseObj(error,'Error in changing password',500,null));        
        })
  
      }
    })
    
    app.post('/raiseTicket', isLoggedIn, (req, res) => {
      let ticketDetail = req.body.ticketDetail;
      let by = {};
      by.Name = req.nameFROMTOKEN;
      by.EmailId = req.emailidFROMTOKEN;
      by.PhoneNumber = req.phonenumberFROMTOKEN;
      saveTicket(ticketDetail, by)
        .then((ticket) => {
          return refRaisedTicket(ticket.raisedBy.emailId, ticket._id); 
        })
        .then((user) => {
          res.json(responseObj(null,'Ticket saved and referenced',200,user.getPublicFields()))
        })
        .catch((error) => {
          res.status(500).json(responseObj(error,'Error in saving Ticket',500,null));
        })
    })

    app.get('/allTicket', isLoggedIn, (req, res) => {
      getRaisedTicket(req.emailidFROMTOKEN)
        .then((user) => {
          data = user.getPublicFields();
          data.raisedTickets = user.raisedTickets;
          res.json(responseObj(null,'Got all the tickets raised by me',200,data));
        })
        .catch((error) => {
          res.status(500).json(responseObj(null,'error in getting raised tickets',500,null));
        })
    })

    app.get('/ticket/:ticketid', isLoggedIn, (req, res) => {
      
    })


}
