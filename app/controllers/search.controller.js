'use strict';

var app = angular.module("analysisApp");
app.controller("lookUpController",function($scope, $http, $filter){
    
    $scope.form = true;   
    $scope.site = "Lookup";   
    $scope.screenshot= '';
    
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

    
    /*PDF Export Function*/
    $scope.export = function() {
             
        var date = new Date();
        var docDefinition = {content: []};
        //get logo
        var columnDefinition = {columns:[]}    
        
        
        var dateFilter = $filter('date')(date, "MMM d, y h:mm:ss a")
        //pdfTitle
        var pdfTitle = {
            columns:[
                {
                    text: "Test Results for: "+ $scope.site, fontSize: 14
                },
                {
                    text:"Test Date: "+ dateFilter , fontSize: 12
                }
            ]
        };
        docDefinition.content.push(pdfTitle);
        
        
        //get result screenshot
         html2canvas(document.getElementById('Export'), {
           onrendered: function(canvas){
               var resData = canvas.toDataURL();
               var resImg = {
                   image: resData,
                   width: 500
               };
               console.log(resImg);
              docDefinition.content.push(resImg); 
           }
            
        });
        
        
        //create columns
        angular.forEach($scope.results, function(obj, key){
            var data = Object.keys(obj);
            var x = data[0];
            var lolo = {text: obj[x].title + " score :"+ obj[x].score};
            columnDefinition.columns.push(lolo);
            if(columnDefinition.columns.length == $scope.results.length)
            {
                docDefinition.content.push(columnDefinition);
            }
        });
         
        
        //generate logo and print pdf
        html2canvas(document.getElementById('logo'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                //Add logo
                var logo = {
                        image: data,
                        width:500
                    };
                //push to front
                docDefinition.content.splice(0,0, logo);
                
                //create PDF
                pdfMake.createPdf(docDefinition).
                download("VividSoftWareSolution_report_"+$scope.site+"_"+date+".pdf");

            }
        });
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
    // TEST JSON FILE
    $scope.load("http://google.com");
});