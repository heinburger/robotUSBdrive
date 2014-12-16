var robot = angular.module('robot', ['ui.router']);

robot.config(function($stateProvider, $urlRouterProvider){

  //$urlRouterProvider.when('/edit','/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'assets/templates/home.html',
      controller: function($scope, $state) {
        
      }
    })
    .state('facetime', {
      url: '/',
      templateUrl: 'assets/templates/facetime.html',
      controller: function($scope, $state) {
        
      }
    })
    .state('map', {
      url: '/map',
      templateUrl:'assets/templates/map.html',
      controller: function ($scope, $state) {
        var map;
        
        $scope.insertMap = function() {
          map = new GMaps({
            div: '#insert-map',
            lat: 40.457656,
            lng: -79.717438,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            zoom:19
          });
        };
        $scope.insertMap();

        map.addMarker({
          lat: 40.457656,
          lng: -79.717438,
          title: "Buggie's House",
          click: function(e) {
            
          },
          infoWindow: {
            content: '<p>This is where Buggie lives</p>'
          }
        });
        /*
        map.drawOverlay({
          lat: 40.457656,
          lng: -79.717438,
          content: '<div class="overlay">This Pittsburgh</div>'
        });
        */
        
      }
    })
    .state('photo', {
      url: '/photo',
      templateUrl:'assets/templates/photo.html',
      controller: function ($scope, $state) {

        $scope.useCamera = function(){
          var uid = randomUID();
          var promise;
          promise = takePhoto(uid);
          q.when(promise).then(function(){
            $scope.pathToImage='photos/'+uid+'/photo.jpg';
            $scope.uid=uid;
            $scope.$digest();
          });

        };
  
      }
    })
    .state('draw', {
      url: '/draw/:uid',
      templateUrl:'assets/templates/draw.html',
      controller: function ($scope, $state, $stateParams) {
        $scope.pageHeight = $('#page').height();
        $scope.pageWidth = $('#page').width();
        $.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
          $('.tools').append("<a href='#colors_sketch' data-color='" + this + "' class='color-swatch' style='background: " + this + "; color: "+this+"'>col</a>");
        });
        $.each([{font:'14px',size:5},{font:'17px',size:15},{font:'20px',size:25}], function() {
          $('.tools').append("<a href='#colors_sketch' data-size='" + this.size + "' class='marker' style='font-size: "+this.font+";'><span class='glyphicon glyphicon-pencil'></span</a>");
        });
        if ($stateParams.uid) {
          $('#colors_sketch').css('background', "url('photos/"+$stateParams.uid+"/photo.jpg')");
          $('#colors_sketch').css('background-size','cover');
        }
        $('#colors_sketch').sketch();


        $scope.saveImage = function() {
          //save to the root directory of the drive
          var image = $('#colors_sketch').get(0).toDataURL();
          var link = document.createElement("a");
          //link.download = 'myDrawing';
          link.href = image;
          //link.target = '_blank';
          link.click();


        };
          
      }
    });

  $urlRouterProvider.otherwise('/');

});

robot.controller('robotCtrl', function ($scope, $http, $state) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParam, fromState, fromParam){ 
    $scope.page = toState.name;
    $scope.hideHome=true;   
  
    if (toState.name==='home') {
      $scope.hideHome=true;
    } else {
      $scope.hideHome=false;
    }

  });

});


function randomUID(){
  return 'xxxxxxxxxxxx4xxxyxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });

}



