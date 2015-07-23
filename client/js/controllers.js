// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', '$location', function($scope, cityService, $location) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });

    $scope.submit = function(){
        $location.path("/forecast");
    };
    
    $scope.myInterval = 4000; 
    $scope.slides =[
    {
        image: "img/f.jpg",
        link: "#"
    },
    {
        image: "img/sp.jpg",
        link: "#"
    },
    {
        image: "img/su.jpg",
        link: "#"
    },
    {
        image: "img/w.jpg",
        link: "#"
    }
    ];
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    
    
    $scope.convertToFahrenheit = function(degK) {
        
        return Math.round((1.8 * (degK - 273)) + 32);
        
    }
    
    $scope.convertToDate = function(dt) { 
      
        return new Date(dt * 1000);
        
    };
    
}]);