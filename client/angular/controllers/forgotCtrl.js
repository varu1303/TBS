angular.module('edApp')
.controller('forgotController', forgotController);

function forgotController($rootScope) {

  $rootScope.notLogged = true;
  
  const fc = this;

  fc.emailId = '';
  fc.forgetSubmit = false;

  fc.forgotSubmit = function (invalid) {
    fc.forgetSubmit = true;
    if(!invalid) {
      console.log('send password');   
    }
  }
}