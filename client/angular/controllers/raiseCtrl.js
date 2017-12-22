angular.module('edApp')
.controller('raiseController', raiseController);

function raiseController($rootScope, tokenService, httpRequest) {

  $rootScope.notLogged = false;

  let payload = tokenService.getPayload(tokenService.getToken());
  $rootScope.name = payload.data.name;
  $rootScope.isAdmin = payload.data.admin;

  let rc= this;

  rc.tickAttempt = false;
  rc.tickRaised = false;
  rc.tickTitle = '';
  rc.tickDescription = '';

  rc.tickSubmit = function () {
    rc.tickAttempt = true;

    if (rc.tickTitle && rc.tickDescription) {
      rc.tickAttempt = false;
      let ticketDetail = {};
      ticketDetail.ticketTitle = rc.tickTitle;
      ticketDetail.ticketDescripton = rc.tickDescription;
      httpRequest.raiseTicket(ticketDetail)
        .then(res => {
          rc.tickTitle = '';
          rc.tickDescription = '';
          rc.tickRaised = true;
          console.log(res);
        })
        .catch(res => {
          console.log('error ', res);
        })
    }
  }

}