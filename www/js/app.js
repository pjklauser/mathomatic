// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('mathstrainer', ['ionic', 'mathstrainer.controllers', 'mathstrainer.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  $ionicPlatform.onHardwareBackButton(function() {
	     event.preventDefault();
	     event.stopPropagation();
	  });  
})



.directive('d3Bars', ['$window', '$timeout', 
  function($window, $timeout) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        label: '@',
        onClick: '&'
      },
      link: function(scope, ele, attrs) {
          var renderTimeout;
          var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 2,
              highlightIndex = parseInt(attrs.highlightIndex) || 0;
          highlightIndex -= 1; // set 1 in template to match 1st entry
          
          var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%');
 
          $window.onresize = function() {
            scope.$apply();
          };
 
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });
 
          scope.$watch('data', function(newData) {
            scope.render(newData);
          }, true);
 
          scope.render = function(data) {
            svg.selectAll('*').remove();
 
            if (!data) return;
            if (renderTimeout) clearTimeout(renderTimeout);
 
            renderTimeout = $timeout(function() {
              var width = d3.select(ele[0]).node().offsetWidth - margin,
                  height = scope.data.length * (barHeight + barPadding),
                  xScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) {
                      return d.correct + d.incorrect;
                    })])
                    .range([0, width]),
                  //translucentIndex = 1 / (scope.data.length+5)
                    translucentIndex = 0
                    ;
 
              svg.attr('height', height);
 
              var e = svg.selectAll('rect')
                .data(data)
                .enter();
              e
                  .append('rect')
                  .on('click', function(d,i) {
                    return scope.onClick({item: d});
                  })
                  .attr('height', barHeight)
                  .attr('width', 100)
	              .attr('fill-opacity', function(d,i) {
	                return 1.0 - ( i * translucentIndex);
	              })
                  .attr('x', Math.round(margin/2))
                  .attr('y', function(d,i) {
                    return i * (barHeight + barPadding);
                  })
                  .attr('fill', function(d,i) {
                	  if ( i == highlightIndex ) {
                          return '#2f2'; //color(d.correct);
                	  }
                	  return '#090'; //color(d.correct);
                  })
                  .transition()
                    .duration(1000)
                    .attr('width', function(d) {
                      return xScale(d.correct);
                    })
                    
                    ;
              e
              .append('rect')
              .on('click', function(d,i) {
                return scope.onClick({item: d});
              })
              .attr('height', barHeight)
              .attr('width', 100)
              .attr('x', Math.round(margin/2))
              .attr('y', function(d,i) {
                return i * (barHeight + barPadding);
              })
              .attr('fill-opacity', function(d,i) {
                return 1.0 - ( i * translucentIndex);
              })
              .attr('fill', function(d,i) {
            	  if ( i == highlightIndex ) {
                      return '#f22'; //color(d.correct);
            	  }
            	  return '#900'; //color(d.correct);
              })
              .transition()
                .duration(1000)
                .attr('x', function(d) {
                  return Math.round(margin/2) + xScale(d.correct) -1;
                })
                .attr('width', function(d) {
                  return xScale(d.incorrect);
                })
                
                ;
              
              
              var t = svg.selectAll('text')
                .data(data)
                .enter();
              
              t.append('text')
                  .attr('fill', '#fff')
                  .attr('y', function(d,i) {
                    return i * (barHeight + barPadding) + 15;
                  })
                  .attr('x', 15)
                  .text(function(d) {
                    return DisplayDate(d.timestamp);
                  });
              t.append('text')
              .attr('fill', '#fff')
              .attr('y', function(d,i) {
                return i * (barHeight + barPadding) + 15;
              })
              .attr('x',function(d) {
                return Math.round(margin/2) + xScale(d.correct) - 10*(NumberOfDigits(d.correct));
              })
              .text(function(d) {
                return d.correct;
              });

              t.append('text')
              .attr('fill', '#fff')
              .attr('y', function(d,i) {
                return i * (barHeight + barPadding) + 15;
              })
              .attr('x', function(d) {
                return Math.round(margin/2) + xScale(d.correct);
              })
              .text(function(d) {
                return d.incorrect;
              });
            
            }, 200);
          };
        
      }}
}])


.directive('face', ['$window', 'faceService', 
  function($window, faceService) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        label: '@',
        onClick: '&'
      },
      link: function(scope, ele, attrs) {
    	  var color = attrs.color;
    	  var emo = attrs.emo;
          var canvas = ele[0];
          
          $window.onresize = function() {
            scope.$apply();
          };
 
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });
 
          scope.$watch('data', function(newData) {
            scope.render(newData);
          }, true);
 
          scope.render = function(data) {

              if (!data) {
            	  data = RandomIntFromInterval(1,100);
              }
              var width = canvas.width;
              var height = canvas.height;
              var faceData = faceService.get(emo, data-1);
              var w = Math.floor(width / 9);
              var h = Math.floor(height / 9);
        	  if (canvas.getContext) {
        	        var ctx = canvas.getContext("2d");

        	        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        	        ctx.fillRect (0, 0, width, height);
        	        ctx.fillStyle = color;
        	        for( var x = 0; x < 9; x++ ) {
        	        	for( var y = 0; y < 9; y++) {
        	        		if ( faceData[y][x] == 1 ) {
        	        	        ctx.fillRect (x*w, y*h, w-1, h-1);
        	        		}
        	        	}
        	        }
       	      }
          };
      }}
}])



.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('face', {
      url: '/face',
      templateUrl: 'templates/face.html',
      controller: 'FaceCtrl'
    })

  .state('start', {
      url: '/start',
      templateUrl: 'templates/start.html',
      controller: 'StartCtrl'
    })

  .state('program', {
      url: '/program',
      templateUrl: 'templates/program.html',
      controller: 'ProgramCtrl'
    })

    .state('play', {
      url: '/play',
      templateUrl: 'templates/play.html',
      controller: 'PlayCtrl'
    })

    .state('score', {
      url: '/score',
      templateUrl: 'templates/score.html',
      controller: 'ScoreCtrl'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:
    .state('tab.results', {
      url: '/results',
      views: {
        'tab-results': {
          templateUrl: 'templates/tab-results.html',
          controller: 'ResultsCtrl'
        }
      }
    })

    .state('tab.result-detail', {
      url: '/results/detail/:programId',
      views: {
        'tab-results': {
          templateUrl: 'templates/tab-result-detail.html',
          controller: 'ResultDetailCtrl'
        }
      }
    })

    .state('tab.result-graph', {
      url: '/results/graph/:programId',
      views: {
        'tab-results': {
          templateUrl: 'templates/tab-result-graph.html',
          controller: 'ResultGraphCtrl'
        }
      }
    })

    .state('tab.config-pin', {
      url: '/config/pin',
      views: {
        'tab-config': {
          templateUrl: 'templates/tab-config-pin.html',
          controller: 'ConfigPinCtrl'
        }
      }
    })
    
    .state('tab.config-add-prog', {
      url: '/config/add-prog',
      views: {
        'tab-config': {
          templateUrl: 'templates/tab-config-add.html',
          controller: 'AddConfigCtrl'
        }
      }
    })

    .state('tab.config-add-smp', {
      url: '/config/newprog/smp',
      views: {
        'tab-config': {
          templateUrl: 'templates/tab-config-prog-smp.html',
          controller: 'AddModifySequentialMultiplicationConfigCtrl'
        }
      }
    })

    .state('tab.config-modify-smp', {
      url: '/config/modifyprog/smp/:programId',
      views: {
        'tab-config': {
          templateUrl: 'templates/tab-config-prog-smp.html',
          controller: 'AddModifySequentialMultiplicationConfigCtrl'
        }
      }
    })

    .state('tab.config-add-rsm', {
      url: '/config/newprog/rsm',
      views: {
        'tab-config': {
          templateUrl: 'templates/tab-config-prog-rsm.html',
          controller: 'AddModifyRandomSelectMultiplicationConfigCtrl'
        }
      }
    })

    .state('tab.config-modify-rsm', {
      url: '/config/modifyprog/rsm/:programId',
      views: {
        'tab-config': {
          templateUrl: 'templates/tab-config-prog-rsm.html',
          controller: 'AddModifyRandomSelectMultiplicationConfigCtrl'
        }
      }
    })

    .state('tab.config-add-ts', {
      url: '/config/newprog/ts',
      views: {
        'tab-config': {
          templateUrl: 'templates/tab-config-prog-ts.html',
          controller: 'AddModifyTotalSumConfigCtrl'
        }
      }
    })

    .state('tab.config-modify-ts', {
      url: '/config/modifyprog/ts/:programId',
      views: {
        'tab-config': {
          templateUrl: 'templates/tab-config-prog-ts.html',
          controller: 'AddModifyTotalSumConfigCtrl'
        }
      }
    })
	
    .state('tab.config-add-ubadd', {
      url: '/config/newprog/ubadd',
      views: {
        'tab-config': {
          templateUrl: 'templates/tab-config-prog-ubadd.html',
          controller: 'AddModifyUpperBoundedAdditionConfigCtrl'
        }
      }
    })

    .state('tab.config-modify-ubadd', {
      url: '/config/modifyprog/ubadd/:programId',
      views: {
        'tab-config': {
          templateUrl: 'templates/tab-config-prog-ubadd.html',
          controller: 'AddModifyUpperBoundedAdditionConfigCtrl'
        }
      }
    })
	
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');

})

.config(function($ionicNavBarConfig, $ionicTabsConfig) {
	  //$ionicNavBarConfig.transition = 'fade-out';
	  $ionicTabsConfig.type = 'tabs-positive';
	})
	
;

