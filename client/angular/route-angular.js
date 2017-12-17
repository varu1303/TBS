angular.module('edApp')
  .config(function($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/sign.html',
        controller: 'signController',
        controllerAs: 'Sign'
      })
      .when('/dashboard', {
        templateUrl: 'templates/dash.html',
        controller: 'dashController',
        controllerAs: 'Dash'
      })
      .when('/me', {
        templateUrl: 'templates/me.html',
        controller: 'meController',
        controllerAs: 'Me'
      })
      .when('/ticket/:ticketNo', {
        templateUrl: 'templates/ticket.html',
        controller: 'ticketController',
        controllerAs: 'Ticket'
      })
      .when('/aboutEd', {
        templateUrl: 'templates/about.html',
        controller: 'aboutController',
        controllerAs: 'About'
      })
      .when('/forgotPass', {
        templateUrl: 'templates/forgot.html',
        controller: 'forgotController',
        controllerAs: 'Forgot'
      })
      .when('/logout', {
        templateUrl: 'templates/logout.html',
        controller: 'logoutController',
        controllerAs: 'Logout'
      })
      .otherwise({
        redirectTo: '/'
      });

//To make the URLs pretty (getting rid of #)
$locationProvider.html5Mode(true);

});