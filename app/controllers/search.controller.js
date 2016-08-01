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
    
        /*
        *
        *
        *  PDF Export Function
        *   -set content styles
        *   -
    */
    $scope.exportPDF = function() {
   
        
        var date = new Date();
        var docDefinition = {
            content: [],
            styles: {
                title: {
                    fontSize: 15,
                    margin: [0, 15, 0, 5],
                    alignment: 'center'
                    },
                subtitle:{
                    fontSize: 12,
                    margin:[0,15,0,5],
                    alignment: 'center'
                    },
                paragraph:{
                    fontSize: 9,
                    color:'black',
                    margin:[0,15,0,15],
                    alignment:'justify'
                },
                column:{
                    fontSize: 14,
                    color:'#222',
                    alignment:'center'
                    },
                success:{
                    color:'#5cb85c'
                    },
                danger:{
                    color:'#FF0000'
                    },
                warning:{
                    color:'#f0ad4e'
                    }
                }
            };
        //get logo
        var columnDefinition1 = { style:'column',columns:[]};  
        var columnDefinition2 = { style:'column',columns:[]};   

        
        //pdfTitle
        var pdfTitle = {
            columns:[
                {
                    style: 'title',
                    text: $scope.site
                }
            ]
        };
        docDefinition.content.push(pdfTitle);
        
        //pdf Subtitle
        var pdfSubtitle = {
            columns:[
                {
                    style: 'subtitle',
                    text: $scope.site+ "\n"+ "Web Analysis | "+ $scope.date
                }
            ]
        };
        docDefinition.content.push(pdfSubtitle);
        
        
        //pdf first Paragraph
        var pdf1stP = {
            columns:[
                {
                    style: 'paragraph',
                    text: 'Fusce a nisl ligula. Quisque sed fringilla mauris. Sed eu tincidunt tellus. Fusce imperdiet auctor felis quis imperdiet. Aenean efficitur nibh ut massa suscipit, ac tempus quam aliquet. Duis consequat sollicitudin vulputate. Curabitur egestas, diam quis molestie tincidunt, diam sapien vulputate massa, vitae pretium velit sem at purus. Mauris dignissim cursus sodales. Sed eu ex odio. Aenean vel mauris eu velit posuere molestie et eu massa. Aliquam quis pellentesque nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam ornare feugiat porttitor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
                }
            ]
        };
        docDefinition.content.push(pdf1stP);
        
        
        
        //get result screenshot
         html2canvas(document.getElementById('Export'), {
           onrendered: function(canvas){
               var resData = canvas.toDataURL();
               var resImg = {
                   image: resData,
                   width: 500,
                   pageBreak: 'after'
               };
              docDefinition.content.push(resImg);
           }
            
        });
        
        
        //create 1st row with columns
        angular.forEach($scope.results, function(obj, key){
            var data = Object.keys(obj);
            var x = data[0];
            var lolo = {text: obj[x].title};
            columnDefinition1.columns.push(lolo);
            if(columnDefinition1.columns.length == $scope.results.length)
            {
                docDefinition.content.push(columnDefinition1);
            }
        });
        
        angular.forEach($scope.results, function(obj, key){
            var data = Object.keys(obj);
            var x = data[0];
            var lolo = {style:obj[x].label,text: "\n score :"+ obj[x].score};
            columnDefinition2.columns.push(lolo);
            if(columnDefinition2.columns.length == $scope.results.length)
            {
                docDefinition.content.push(columnDefinition2);
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