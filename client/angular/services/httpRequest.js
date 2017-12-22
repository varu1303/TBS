angular.module('edApp')
  .service('httpRequest', httpRequest);


function httpRequest($http, tokenService) {
  
  this.toRegister = function (userDetails) {
    return $http.post('/signup', { userDetails });    
  }

  this.toLogin = function (userCredentials) {
    return $http.post('/login', { userCredentials })
  }

  this.getAssignedTicket = function () {
    return $http.get('/admin/assignedTickets',{
        headers: {'x-auth' : tokenService.getToken()
      }
    });  
  }

  this.getRaisedTicket = function () {
    return $http.get('/allTicketRaised',{
      headers: {'x-auth' : tokenService.getToken()
      }
    });
  }

  this.viewUsersTicket = function (id) {
    return $http.get('/ticket/'+id, {
      headers: {'x-auth' : tokenService.getToken()
      }    
    })
  }

  this.viewAdminsTicket = function (id) {
    return $http.get('/admin/ticket/'+id, {
      headers: {'x-auth' : tokenService.getToken()
      }    
    })
  }

  this.changePass = function (newPassword) {
    return $http.post('/changePassword', { newPassword }, {
      headers: {'x-auth' : tokenService.getToken()
      }    
    })
  }

  this.raiseTicket = function (ticketDetail) {
    return $http.post('/raiseTicket', { ticketDetail }, {
      headers: {'x-auth' : tokenService.getToken()
      }    
    })
  }

  this.allTickets = function () {
    return $http.get('admin/allTickets', {
      headers: {'x-auth' : tokenService.getToken()
      }
    })
  }
}