const bcrypt = require('bcrypt');
//
const {responseObj} = require('./../config/response');
//Controller functions
const {loginUser} = require('./../controller/userController');
const {getJWT} = require('./../controller/utilFunctions/jwt');


module.exports = app => {

  // app.post('/login/admin', (req,res) => {
  //   let userCredentials = req.body.userCredentials;
  //   if(!userCredentials.emailId)
  //     res.status(400).json(responseObj(null,'Email ID not provided',400,null));
  //   else {
  //     loginUser(userCredentials.emailId)
  //       .then((user) => {
  //         if(!user)
  //           res.status(404).json(responseObj(null,'Email ID not found in the Database',404,null));
  //         else if(!user.admin){
  //           res.status(400).json(responseObj(null,'User not an Admin',400,null));
  //         } else {
  //           if(!userCredentials.password)
  //             res.status(400).json(responseObj(null,'Password not provided',400,null));
  //           else {
  //             bcrypt.compare(userCredentials.password, user.password, function(err, match) {
  //               if(err) {
  //                 res.status(500).json(responseObj(err,'Error in decrypting Password',500,null));
  //               } else if(match) {
  //                   let token = getJWT(user.getPayload());
  //                   let data = user.getPublicFields();
  //                   data.token = token;
  //                   res.json(responseObj(null,'Login Successful',200,data));
  //               } else {
  //                   res.status(400).json(responseObj(null,'Incorrect Password',400,null));  
  //               }
  //             })              
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         res.status(500).json(responseObj(error,'Error in Finding user in DB',500,null));
  //       })
  //     }        
  // })

}