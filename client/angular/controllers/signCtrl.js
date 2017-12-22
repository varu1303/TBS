angular.module('edApp')
  .controller('signController', signController);

function signController(httpRequest, tokenService, $location, $rootScope) {

  $rootScope.notLogged = true;


  const sc = this;
  sc.subDone = false;

  function init () {
    sc.logId = '';
    sc.logPass = '';
  
    sc.upId = '';
    sc.upPass = '';
    sc.upConPass = '';
    sc.upNumber = '';
    sc.upName = '';
    sc.regDone = false;
    sc.regNoMatch = false;
  }

  init();



  sc.active = "login";
  sc.tab = function (tabName) {
    sc.active = tabName;
  }

  sc.logSubmit = function(logFormInvalid) {
    sc.subDone = true;

    if (!logFormInvalid) {
      let userCredentials = {};
      userCredentials.emailId = sc.logId;
      userCredentials.password = sc.logPass;

      httpRequest.toLogin(userCredentials)
      .then(res => {
        
        let token = res.data.data.token;
        tokenService.saveToken(token);
        $rootScope.isAdmin = tokenService.isAdmin();
        $location.path('/me');
        // angular.element('.stretch').triggerHandler('click');

      })
      .catch(res => {
        console.log(res);
      })
    }
  }

  sc.regSubmit = function(regFormInvlaid) {
    sc.regDone = true;
    sc.regNoMatch = false;
    

    if ( sc.upPass != sc.upConPass )
      sc.regNoMatch = true;
    else if (!regFormInvlaid) {
      let userDetails = {};
      userDetails.name = sc.upName;
      userDetails.emailId = sc.upId;
      userDetails.password = sc.upPass;
      userDetails.phoneNumber = sc.upNumber;

      httpRequest.toRegister(userDetails)
        .then(res => {
          init();
        })
        .catch(res => {
          console.log(res);
        })
    }
  }
}