'use strict';

var app = angular.module("analysisApp");
app.controller("lookUpController",function($scope, $http, $base64){
    
    $scope.form = true;   
    $scope.site = "Lookup";   
    $scope.screenshot= '';
    
    $scope.load = function ($var) {
        $scope.form = false; 
        $scope.site = $var;
        $scope.results = [];
        $scope.showResults = false;
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
                "HTMLmarkup":'src/w3valid.php?url='+$var,
            };
            /* LOCAL FILES */
            var siteTest = {
                "speed": 'dev/static/speed.json',
                "mobile": 'dev/static/mobile.json',
                "HTMLmarkup":'dev/static/w3.json',
            };
            /* END LOCAL*/
            angular.forEach(siteTest, function(value, key){
                $http.get(value).success(function(data){
                    var obj = {};
                    var bar = "";
                    var icon = "";
                    var title = "";
                    var score = 0;
                    var alerts = 0;
                    var messages= {};
                       
                        //set score
                        if(key == "HTMLmarkup")
                        {
                            score = (100 - data.messages.length);
                            title = "HTML Markup";
                            alerts = data.messages.length;
                            console.log(data.messages.length);
                            icon = "html5";
                            messages = data.messages[0];
                        }
                        else
                        {
                            messages = data.messages;
                            if(key == "mobile")
                            {
                                icon = "mobile";
                                title = "Mobile Optimization";
                               
                                var imgData = data.screenshot.data;
                                
                                var cleanThis = function(data){
                                    data = data.replace(/_/g,'/');
                                    data = data.replace(/-/g, '+');
                                    return data;
                                }
                                 $scope.imageView = cleanThis(imgData);
                                
                                
                                $scope.screenshot = data.screenshot.data;
                                
                                
                            }
                            
                            else if(key == "speed")
                            {icon = "tachometer";title = "Load Speed";}
                            
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
                    
                    //group results
                    obj[key] = {
                    "title": title,
                    "icon": icon,
                    "label": bar,
                    "score": score,
                    "alerts": alerts,
                    "messages": messages,
                    // to add Raw data add: "data":data
                    }; 
                    
                    //push into results
                    $scope.results.push(obj);
                });
            });
        }
    }

    $scope.load("http://google.com");

    
    var logo = 'app/assets/imgs/vivid_logo.png';
    var logoData = $base64.encode(logo);
    
    console.log(logoData);
    
    /*PDF Export Function*/
    $scope.export = function() {
             
        var date = new Date();
        
        
        var docDefinition = {
            content: [
            {
                text: $scope.site,
                fontSize: 20,
            },
            {
                image: 'data:image/jpeg;base64,'+ $scope.screenshot,
                width: 100,
            },
            {
                text: $scope.site,
                fontSize: 25
            }
            ]};
            
            var lolo = {text:"THIS TITLE", fontSize:24};
        
        
        angular.forEach($scope.results, function(obj){
                    
            console.log(obj)    
            
                 docDefinition.content.push(lolo);
                
            
                });
        pdfMake.createPdf(docDefinition).download("VividSoftWareSolution_report_"+$scope.site+"_"+date+".pdf");
    

    }
    
    //clear search
    $scope.clearLookUp = function()
    {
        $scope.results = [];
        $scope.imageView = '';
        $scope.form = true;
    }
    

    /* DEBUGGING TOOL*/
    $scope.debug = false;
    $scope.debugger = function(){
        
        if($scope.debug == true)
        {$scope.debug = false;}
        else
        {$scope.debug = true}
        
    }
    
    
});