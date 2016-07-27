'use strict';

var app = angular.module("analysisApp");
app.controller("lookUpController",function($scope, $http){
    
    $scope.form = true;   
    $scope.site = "Lookup";   
    $scope.results = [];
    
    $scope.load = function ($var) {
        $scope.form = false; 
        $scope.site = $var;    
        if($var == undefined)
        {
            console.log("yes indeed");
        }
        else
        {
            console.log($var);
            var siteTest = {
                "speed": 'src/speed.php?url='+$var,
                "mobile": 'src/mobile.php?url='+$var,
                "w3":'src/w3valid.php?url='+$var,
            };
            angular.forEach(siteTest, function(value, key){
                $http.get(value).success(function(data){
                    var obj = {};
                    var bar = "";
                    var score = data.score;
                        //set score flags
                        if(score < 33)
                            {
                            bar = "danger";
                            }
                        else if(score >= 34 && score <= 66)
                            {
                                bar = "warning";
                            }
                        else if(score >= 67)
                            {
                                bar = "success";
                            }
                
                    obj[key] = {
                    "bar": bar,
                    "data": data,
                }; 
                $scope.results.push(obj);
            });
        }); 
        
        }
    }
});