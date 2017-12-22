angular.module('edApp')
.controller('ticketController', ticketController);

function ticketController($rootScope, tokenService, httpRequest, $routeParams) {

  $rootScope.notLogged = false;
  
  let payload = tokenService.getPayload(tokenService.getToken());
  $rootScope.name = payload.data.name;
  $rootScope.isAdmin = payload.data.admin;

  let tc = this;

  tc.isAdmin = payload.data.admin;
  tc.tId = $routeParams.ticketId;

  if (tc.isAdmin) {
    httpRequest.viewAdminsTicket(tc.tId)
    .then(res => {
      tc.ticket = res.data.data;
    })
    .catch(res => {
      console.log(res);
    })
  } else {
    httpRequest.viewUsersTicket(tc.tId)
      .then(res => {
        tc.ticket = res.data.data;
      })
      .catch(res => {
        console.log(res);
      })
  }

}