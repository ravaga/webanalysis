<html>
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Free Web tutorials">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
    <meta name="author" content="Hege Refsnes">
    
    <title>Vivid Software Solutions Web Analysis</title>
    
    <link type="text/css" rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
        
    
</head>
<body ng-app="analysisApp">
    
  
    <div ng-controller="controller">
          <form method="get">
        <label>Url:</label>
        <input type="text" ng-model="url">
        
        <button ng-click="load(url)">Get</button>
    </form>
    </div>

    
</body>
<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
<script type="text/javascript" src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>    
    
    
    
<script type="text/javascript">
angular.module("analysisApp", [])

    .controller("controller", function($scope, $http){
    
    
    $scope.load = function($var)
    {
        
    }
    
    
    
    
    $scope.that = "HELLO CLARISE";
    
    
});
    
    
</script>    
    
</html>