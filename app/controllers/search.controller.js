'use strict';

var app = angular.module("analysisApp");
app.controller("lookUpController",function($scope, $http, resultService,  $filter, $sce, $uibModal){
    
    $scope.form = true;   
    $scope.screenshot= '';
    $scope.date = $filter('date')(new Date(), "MMM d, y h:mm:ss a")
    
    $scope.load = function ($var) {
        
        $scope.form = false; 
        $scope.site = $var;
        $scope.results = [];
        if($var == undefined)
        {
            console.log("Yes indeed");
            return false;
        }
        else
        {
            /* HTTP CALLS*/
            var siteTest = {
                "speed": 'src/speed.php?url='+$var,
                "mobile": 'src/mobile.php?url='+$var,
                "HTMLmarkup":'src/w3valid.php?url='+$var,
            };
        
            
            /* LOCAL FILES   
            var siteTest = {
                "speed": 'dev/static/speed.json',
                "mobile": 'dev/static/mobile.json',
                "HTMLmarkup":'dev/static/w3.json',
            };
            /* END LOCAL*/
            var testKeys = Object.keys(siteTest);
            var testLength = testKeys.length;
            var testScore = 0;
            var testMessages = 0;
            var site = resultService.addSite($var);
            
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
                        }
                    
                    //set bar flags
                    if(score < 33)
                    {bar = "danger";}
                    else if(score >= 34 && score <= 66)
                    {bar = "warning";}
                    else if(score >= 67)
                    {bar = "success";}
                    
                    testScore = testScore + score;
                    testMessages = testMessages + alerts;
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
                    var addtoResults = resultService.addResults(obj);
                    var results = resultService.getResults();
                    
                    //check for final result
                    if(results.length == testLength)
                        {
                            var finalScore = testScore / testLength;
                            var label = '';
                            var message = '';
                            
                            if(finalScore < 65)
                            {label = "danger"; message = 'This site needs  optimization ASAP'; icon = 'thumbs-down'}
                            else if(finalScore >= 66 && finalScore <= 79)
                            {label = "warning"; message='This site requires some optimization'; icon = 'thumbs-up'}
                            else if(finalScore >= 80)
                            {label = "success"; message = 'Congrats! this site is well optimized'; icon='thumbs-down';}    
                            
                            
                            
                            $scope.alert = {
                                "title": "Test Results",
                                "score": testScore / testLength,
                                "label": label,
                                "messages": testMessages,
                                "message": message,
                                "icon": icon
                            };
                            $scope.results = resultService.getResults();
                            $scope.tools($scope.site);
                        }
                    
                });
            });
            
        }
        
    }
    
 
    /*
    *   Tools*/
    $scope.tools  = function($var)
    {
        //iframe sizes
        if($var ==false)
            return false;
        $scope.iframe_tools = true;
        var url = $sce.trustAsResourceUrl($scope.site);
        var iframe = function(w, h){
            var g = {
                width:w,
                height:h,
                title:w+'x'+h,
                class:w+'x'+h+'Modal',
                site: url
            }
            return g; 
        }
        
        $scope.buttons = [iframe(375,667), iframe(320, 568)];    
    }
    
    
    
    $scope.export = function()
    {
        
        var modal = $uibModal.open({
            templateUrl:'export.html', 
            controller:'exportController',
            size: 'md'
        });

    }
    
    
    //clear search
    $scope.clearLookUp = function()
    {
        
        $scope.results = resultService.clearResults();
        $scope.imageView = '';
        $scope.form = true;
        $scope.alert = {};
        $scope.site = '';
    }
    

    /* DEBUGGING TOOL*/
    $scope.debugPannel = false;
    
    $scope.debugger = function(){
        $scope.load("http://google.com");
        if($scope.debug == true)
        {$scope.debug = false;}
        else
        {$scope.debug = true}
        
    }
  
});