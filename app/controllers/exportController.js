'use strict';

var app = angular.module('analysisApp');

app.controller('exportController', function($scope, resultService, $filter){
        

        $scope.savePDF = function($foo){
            var exp = exportPDF($foo);
            
        }
        
        /*
        * 
        *
        *  PDF Export Function
        *   -set content styles
        *   -
    */
    var exportPDF = function($foo) {
    
        if($foo == null )
            return false;
        
        var site = resultService.getSite();     
        var results = resultService.getResults();
        var date = $filter('date')(new Date(), "MMM d, y h:mm:ss a");
        var datefilter = $filter('date')(date, "MMMdyhmmssa");
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
                footer:{
                    background:'#000'
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
                    text: site
                }
            ]
        };
        docDefinition.content.push(pdfTitle);
        
        //pdf Subtitle
        var pdfSubtitle = {
            columns:[
                {
                    style: 'subtitle',
                    text: site+ "\n"+ "Web Analysis | "+ date
                }
            ]
        };
        docDefinition.content.push(pdfSubtitle);
        
        
        //pdf first Paragraph
        var pdf1stP = {
            columns:[
                {
                    style: 'paragraph',
                    text: $foo
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
        angular.forEach(results, function(obj, key){
            var data = Object.keys(obj);
            var x = data[0];
            var lolo = {text: obj[x].title};
            columnDefinition1.columns.push(lolo);
            if(columnDefinition1.columns.length == results.length)
            {
                docDefinition.content.push(columnDefinition1);
            }
        });
        
        angular.forEach(results, function(obj, key){
            var data = Object.keys(obj);
            var x = data[0];
            var lolo = {style:obj[x].label,text: "\n score :"+ obj[x].score};
            columnDefinition2.columns.push(lolo);
            if(columnDefinition2.columns.length == results.length)
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
                download("Web_report_"+site+"_"+datefilter+".pdf");

            }
        });
    }
        
        
        
    
});