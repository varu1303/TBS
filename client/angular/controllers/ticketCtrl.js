angular.module('edApp')
.controller('ticketController', ticketController);

function ticketController($rootScope, tokenService, httpRequest, $routeParams, timestamp, $route) {

  $rootScope.notLogged = false;
  
  let payload = tokenService.getPayload(tokenService.getToken());
  $rootScope.name = payload.data.name;
  $rootScope.isAdmin = payload.data.admin;

  let tc = this;

  tc.isAdmin = payload.data.admin;
  tc.tId = $routeParams.ticketId;
  tc.this = '';
  tc.text = '';
  tc.closeText = '';
  tc.reopenText = '';
  tc.rating = 5;
  tc.post = false;
  tc.closePopup = false;
  tc.closeSub = false;
  tc.reopenPopup = false;
  tc.reopenSub = false;
  tc.ratePopup = false;
  tc.involvePopup = false;
  tc.involveSub = false;
  tc.tobeInvolved = [];


  if (tc.isAdmin) {
    httpRequest.viewAdminsTicket(tc.tId)
    .then(res => {
      tc.this = res.data.data;
      tc.this.date = timestamp.getFromId(tc.this._id);
      // console.log(tc.this.chat);
      tc.this.chat.forEach( (val, ind) => {
        val.date = timestamp.getFromId(val._id);
      })
    })
    .catch(res => {
      console.log(res);
    })
  } else {
    httpRequest.viewUsersTicket(tc.tId)
      .then(res => {
        tc.this = res.data.data;
        tc.this.date = timestamp.getFromId(tc.this._id);
        tc.this.chat.forEach( (val, ind) => {
          val.date = timestamp.getFromId(val._id);
        })
      })
      .catch(res => {
        console.log(res);
      })
  }


  tc.addComment = function (form_invalid) {
    
    if(form_invalid)
      tc.post= true;
    else {
      tc.post = false;
      httpRequest.addComment(tc.tId, tc.text)
        .then( res => {
          httpRequest.getUpdatedChat(tc.tId)
            .then( res => {
              tc.text = '';
              tc.this.chat = res.data.data;
              tc.this.chat.forEach( (val, ind) => {
                val.date = timestamp.getFromId(val._id);
              })
            })
            .catch (res => {
              console.log('get error ', res);
            })
        })
        .catch( res => {
          console.log('error ',res);
        })
    }
    
  }

  tc.closingComment = function (invalid) {
    if(invalid) {
      tc.closeSub = true;
    } else {
      
      let closingText = '(Closed This ticket) ' + tc.closeText;
      httpRequest.addComment(tc.tId, closingText)
        .then( res => {
          httpRequest.closeTicket(tc.tId)
            .then( res => {
              tc.closeText = '';
              $route.reload();              
            })
            .catch (res => {
              console.log('error ', res);
            })
        })
        .catch (res => {
          console.log('error ', res);
        })

      tc.closeSub = false;

    }
  }

  tc.reopenTicket = function (invalid) {
    if(invalid) {
      tc.reopenSub = true;
    } else {

      let reopenText = '(Reopend This ticket) ' + tc.reopenText;
      
      httpRequest.reopenTicket(tc.tId)
        .then( res => {
          httpRequest.addComment(tc.tId, reopenText)
            .then( res => {
              tc.reopenText = '';
              $route.reload();              
            })
            .catch (res => {
              console.log('error ', res);
            })
        })
        .catch (res => {
          console.log('error ', res);
        })


      tc.reopenSub = false;


    }
  }

  tc.submitRating = function () {

    httpRequest.rateTicket(tc.tId, tc.rating)
      .then( res => {
        $route.reload();       
      })
      .catch( res => {
        console.log('error ', res);
      })
  }

  tc.involve = function () {
    tc.involvePopup = true;
    httpRequest.getAdmins()
      .then( res => {
        tc.admins = res.data.data;
      })
      .catch ( res => {
        console.log('error ', res);
      })
  }

  tc.involveThisAdmin = adminEmail => {

    if( tc.tobeInvolved.indexOf(adminEmail) == -1 ) 
      tc.tobeInvolved.push(adminEmail);
    else 
      tc.tobeInvolved.pop(adminEmail);
    
    console.log(tc.tobeInvolved);
  }

  tc.involvedAdmin = email => {
    if( tc.tobeInvolved.indexOf(email) != -1 )
      return true;
    else 
      return false;
  }

  tc.getAdminsInvolved = function () {

    if(tc.tobeInvolved.length) {

      let text = '(Involved) ';
      tc.tobeInvolved.forEach( (val, ind) => {
        if(ind)
          text += ` and ${val}`
        else
          text += val;
      })
  
      httpRequest.addComment(tc.tId, text)
        .then( res => {

          let ticket = {};
          ticket.ticketId = tc.tId;
          ticket.ticketNo = tc.this.ticketNo;
          let involvePromises = []; 
          
          tc.tobeInvolved.forEach( val => {
            involvePromises.push(httpRequest.invloveAdmin(val, ticket));
          })

          Promise.all(involvePromises)
            .then(values => { 
              console.log('got them involved ', values); 
              $route.reload();
            })
            .catch(error => {
              console.log('all error ', error);
            })
        })
        .catch( res => {
          console.log('error in adding comment ',res);
        })
    }
  }

}