'use strict';

var app = angular.module("analysisApp", ["ngRoute", "angular-loading-bar"]);

   app.config(function($routeProvider){
    
    $routeProvider.
    when('/', {
        templateUrl: 'app/views/app.html',
        controller: 'lookUpController',
        controllerAs: 'main'
    })
});
    

