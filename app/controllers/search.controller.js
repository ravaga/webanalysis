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
                "Loading-Speed": 'src/speed.php?url='+$var,
                "Mobile-Optimization": 'src/mobile.php?url='+$var,
                "html-Markup":'src/w3valid.php?url='+$var,
            };
            /* LOCAL FILES */
            var siteTest = {
                "Loading-Speed": 'dev/static/speed.json',
                "Mobile-Optimization": 'dev/static/mobile.json',
                "html-Markup":'dev/static/w3.json',
            };
            /* END LOCAL*/
            angular.forEach(siteTest, function(value, key){
                $http.get(value).success(function(data){
                    var obj = {};
                    var bar = "";
                    var icon = "";
                    var score = 0;
                    var alerts = 0;
                    
                       
                        //set score
                        if(key == "html-Markup")
                        {
                            score = (100 - data.messages.length);
                            alerts = data.messages.length;
                            console.log(data.messages.length);
                            icon = "html5";
                        }
                        else
                        {
                            if(key == "Mobile-Optimization")
                                {icon = "mobile"}
                            else if(key == "Loading-Speed")
                                {icon = "tachometer"}
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
                    "icon": icon,
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
    
    $scope.load('http://g.com');
    //clear search
    $scope.clearLookUp = function()
    {
        $scope.results = [];
        $scope.form = true;
    }
    
    var date = new Date();
    console.log(date);

    
    
    
    $scope.export = function()
    {
        var logo = 'assets/imgs/logo.png';
        html2canvas(document.getElementById('export'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                        logo:logo
                    }]
                };
                pdfMake.createPdf(docDefinition).download("VividSoftWareSolution_report_"+$scope.site+"_"+date+".pdf");
            }
        });
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