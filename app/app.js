'use strict';

var app = angular.module("analysisApp", ["ngRoute"]);

   app.config(function($routeProvider){
    
    $routeProvider.
    when('/', {
        templateUrl: 'app/views/search.html',
        controller: 'myController'
    })
})
   
   app.controller("myController",function($scope, $http){
    $scope.results = [];
    $scope.load = function ($var) {
        var siteTest = {
            "speed": 'src/speed.php?url='+$var,
            "mobile": 'src/mobile.php?url='+$var,
            "w3": 'src/w3valid.php?url='+$var
        };
        angular.forEach(siteTest, function(value, key){
            $http.get(value).success(function(data){
                var obj = {};
                obj[key] = data; 
                $scope.results.push(obj);
            });
        }); 
        
    }
});
    

