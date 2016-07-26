'use strict'

angular.module("analysisApp", [])

    .controller("controller", function($scope, $http, $parse){
    
    $scope.results = [];
    $scope.load = function($var)
    {
        var siteTest = {
            "speed": 'src/speed.php?url='+$var,
            "mobile": 'src/mobile.php?url='+$var,
        };
        angular.forEach(siteTest, function(value, key){
             var title = key;
            
            $http.get(value).success(function(data){
                $scope.results.push(title , data);
            });
        }); 
        
    }
    
    




});
    