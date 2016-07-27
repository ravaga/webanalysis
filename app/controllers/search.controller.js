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
            console.log("Yes indeed");
            return false;
        }
        else
        {
            /* HTTP CALLS
            var siteTest = {
                "speed": 'src/speed.php?url='+$var,
                "mobile": 'src/mobile.php?url='+$var,
                "w3":'src/w3valid.php?url='+$var,
            };
            /* LOCAL FILES */
            var siteTest = {
                "speed": 'dev/static/speed.json',
                "mobile": 'dev/static/mobile.json',
                "w3":'dev/static/w3.json',
            };
            /* END LOCAL*/
            angular.forEach(siteTest, function(value, key){
                $http.get(value).success(function(data){
                    var obj = {};
                    var bar = "";
                    var score = 0;
                    var alerts = 0;
                       
                        //set score
                        if(key == "w3")
                        {
                            score = (100 - data.messages.length);
                            alerts = data.messages.length;
                            console.log(data.messages.length);
                        }
                        else
                        {
                            score = data.test.score;
                            alerts = data.alerts;
                            console.log(data.messages.length);
                        }
                    
                    //set bar flags
                    if(score < 33)
                    {bar = "danger";}
                    else if(score >= 34 && score <= 66)
                    {bar = "warning";}
                    else if(score >= 67)
                    {bar = "success";}
                    
                   
                
                    obj[key] = {
                    "label": bar,
                    "score": score,
                    "alerts": alerts,
                    "messages": data.messages,
                    //"data":data
                    }; 
                    $scope.results.push(obj);
                });
            });
        }
    }
    $scope.load('http://this.com');
    
    $scope.clearLookUp = function()
    
    {
        $scope.results = [];
        $scope.form = true;
    
    }
    
    $scope.debug = false;
    $scope.debugger = function(){
        
        if($scope.debug == true)
        {$scope.debug = false;}
        else
        {$scope.debug = true}
        
    }
    
    
});