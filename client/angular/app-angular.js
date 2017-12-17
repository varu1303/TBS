angular.module('edApp',['ngRoute','ngAnimate'])
.controller('MainController', MainController);



function MainController($location) {

  let mc = this;
  mc.currentLoc = $location.path();

  mc.newLoc = function (loc) {
    mc.currentLoc = loc;
  }



}