var robot = angular.module('app', ['ui.router']);

robot.config(function($stateProvider, $urlRouterProvider){

  //$urlRouterProvider.when('/edit','/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'assets/templates/home.html',
      controller: function($scope, $state) {
        $scope.helloMessage='hi';
      }
    })
    .state('map', {
      url: '/map',
      templateUrl:'assets/templates/map.html',
      controller: function ($scope, $state) {
        $scope.insertMap = function() {
          new GMaps({
            div: '#insert-map',
            lat: 40.457656,
            lng: -79.717438
            //mapTypeId: google.maps.MapTypeId.SATELLITE
          });
        };
        $scope.insertMap();
      }
    })
    .state('draw', {
      url: '/draw',
      templateUrl:'assets/templates/draw.html',
      controller: function ($scope, $state) {
        $scope.pageHeight = $('#page').height();
        $scope.pageWidth = $('#page').width();
        $.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
          $('.tools').append("<a href='#colors_sketch' data-color='" + this + "' style='background: " + this + "; color: "+this+"'>"+this+"</a>");
        });
        $.each([3, 5, 10, 15], function() {
          $('.tools').append("<a href='#colors_sketch' data-size='" + this + "' style='background: #ccc; padding:3px;'>" + this + "</a>");
        });
        $('#colors_sketch').sketch();
      }
    });

  $urlRouterProvider.otherwise('/');

})



