'use strict';

/**
 * @ngdoc function
 * @name vrsketchApp.controller:CustCtrl
 * @description
 * # CustCtrl
 * Controller of the vrsketchApp
 */
angular.module('vrsketchApp')
  .controller('CustCtrl', function ($scope, VrsketchService, shapeGraph, $http, $q) {
    $scope.bg = {
      structure: 'sparseGrid'
    };

    $scope.eventHandler = function() {
      console.log("CustCtrl.eventHandler: $scope.bg.structure=" + $scope.bg.structure);
      VrsketchService.bg.structure = $scope.bg.structure;
    };

    //var ctrlResult1, ctrlResult2;
    $scope.ctrlResult1 = 7;
    $scope.ctrlResult2 = null;
    
    // $scope.debugHandler = function() {
    //   // var myGraph = new shapeGraph();
    //   // myGraph.abc();
    //   // myGraph.debug();
    //   shapeGraph.prototype.debug($scope.ctrlResult1);
      
      
    //   // console.log("CustCtrl.debugHandler: about to call debug");
      
    //   // shapeGraph.debug();
    // };

    $scope.inspectHandler = function() {
      console.log("CustCtrl.inspectHandler: ctrlResult1=" + $scope.ctrlResult1);
      console.log("CustCtrl.inspectHandler: ctrlResult1.nodes[0].title=" + $scope.ctrlResult1.nodes[0].name);
      console.log("CustCtrl.inspectHandler: ctrlResult2=" + $scope.ctrlResult2);
      console.log("CustCtrl.inspectHandler: ctrlResult2.nodes[0].title=" + $scope.ctrlResult2.nodes[0].name);
      
    };

    function asyncGreet(url) {
      // perform some asynchronous operation, resolve or reject the promise when appropriate.
      return $q(function(resolve, reject) {
        // setTimeout(function() {
        //   if (okToGreet(name)) {
        //     resolve('Hello, ' + name + '!');
        //   } else {
        //     reject('Greeting ' + name + ' is not allowed.');
        //   }
        // }, 1000);
        //$http.get('config/birdies/simplex.json')
        $http.get(url)
          .then(function(res){
            // console.log("parseJson: promise handler: tgtVar=" + tgtVar);
            // console.log("parseJson: res.data.title=" + res.data.title);
            // console.log("parseJson: res.data.nodes[0].name=" + res.data.nodes[0].name);

            var graph = new shapeGraph(res.data.nodes, res.data.edges);
            console.log("cust.js: promise handler: graph=" + graph);

            //return graph;
            resolve(graph);
            //tgtVar = graph;
            //console.log("parseJson: promise handler: tgtVar=" + tgtVar);
          });        
      });
    }

    $scope.debugHandler = function () {
      var promise = asyncGreet('config/birdies/simplex.json');

      console.log("cust.js.debugHandler: calling promise");
      promise.then(function(graph) {
        console.log('Success: graph=' + graph);
        $scope.ctrlResult1 = graph;
        
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
      console.log("cust.js.debugHandler: back from promise");

      promise = asyncGreet('config/birdies/simplex2.json');
      console.log("cust.js.debugHandler: calling promise 2");
      promise.then(function(graph) {
        console.log('Success: graph=' + graph);
        $scope.ctrlResult2 = graph;
        
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
      console.log("cust.js.debugHandler: back from promise 2");      
    };
    
    //var ctrlResult1, ctrlResult2;
    
    // $scope.debugHandler2 = function() {
    //   $http.get('config/birdies/simplex.json')
    //     .success(function (data) {
    //          $scope.listOfCustomers = data;
    //      })
    //      .error(function (data, status, headers, config) {
    //          //  Do some error handling here
    //      });
    // // shapeGraph.prototype.parseJson = function(url) {
    // //   console.log("entered parseJson");
    // //   $http.get('config/birdies/simplex.json')
    // //     .then(function(res){
    // //       //$scope.todos = res.data;
    // //       console.log("parseJson: res.data.title=" + res.data.title);
    // //       console.log("parseJson: res.data.nodes[0].name=" + res.data.nodes[0].name);

    // //       var graph = new shapeGraph(res.data.nodes, res.data.edges);

    // //       return graph;
    // //     });
    // // };

    // };
    
  });
