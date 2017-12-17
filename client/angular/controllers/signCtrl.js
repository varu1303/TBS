angular.module('edApp')
  .controller('signController', signController);

function signController() {
  let sc = this;

  sc.active = "login";
  sc.tab = function (tabName) {
    sc.active = tabName;
  }
}