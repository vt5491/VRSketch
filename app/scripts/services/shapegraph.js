'use strict';

/**
 * @ngdoc service
 * @name vrsketchApp.shapeGraph
 * @description
 * # shapeGraph
 * Service in the vrsketchApp.
 */

// Since three.js does not allow to create customized renderable objects,
// we maintain our own state about node and edge connections, and then push
// physical lines onto the scene.  Then it's just up to us to maintain the
// synchronization between our state and the physical renderable objects (lines)
// that we push on to the scene
// Note: I'm pretty sure this has to be a factory.  It won't work as a service.
// update: no, it's seems to work a service too.
angular.module('vrsketchApp')
  //.service('shapeGraph', function ($http) {
  .factory('shapeGraph', function ($http) {
    
    // instantiate our initial object
    var shapeGraph = function(nodes, edges) {
      this.nodes = nodes;
      this.edges = edges;

      // //
      // if(edges) {

      // }
    };

    shapeGraph.prototype.abc = function() {
      //console.log("shapeGraph.abc: hello");
      return 7;
    };

    shapeGraph.prototype.debug = function(tgtVar) {
      //console.log("shapeGraph.debug: hello, tgtVar=" + tgtVar);

      this.parseJson('config/birdies/simplex.json', tgtVar);

      //console.log("shapeGraph.debug: result=");
      //return result;
      //tgtVar = result;
    };

    //Defunct
    shapeGraph.prototype.parseJson = function(url, tgtVar) {
      //console.log("entered parseJson, tgtVar=" + tgtVar);
      $http.get('config/birdies/simplex.json')
        .then(function(res){
          //$scope.todos = res.data;
          // console.log("parseJson: promise handler: tgtVar=" + tgtVar);
          // console.log("parseJson: res.data.title=" + res.data.title);
          // console.log("parseJson: res.data.nodes[0].name=" + res.data.nodes[0].name);

          var graph = new shapeGraph(res.data.nodes, res.data.edges);
          //console.log("parseJson: promise handler: graph=" + graph);

          //return graph;
          tgtVar = graph;
          //console.log("parseJson: promise handler: tgtVar=" + tgtVar);
        });
    };

    //Next: create new getNodeByName using a simple array loop instead of foreach
    shapeGraph.prototype.getNodeByName = function(nodeName) {
      var nodesLength = this.nodes.length;
      
      for (var i = 0; i < nodesLength; i++) {
        var node = this.nodes[i];
        if( node.name == nodeName) { 
          return node;
        }
      };
    };

    // this adds an edge to a scene
    // TODO: rename 'scene' to 'group' thoughout this module
    shapeGraph.prototype.addEdge = function(edge, group) {
      var node1Name = edge.node1Name,
          node2Name = edge.node2Name,
          color = edge.color;
      //    scene = edge.scene;
      var line, lineMaterial, lineGeometry;

      var node1 = this.getNodeByName(node1Name);
      var node2 = this.getNodeByName(node2Name);

      //TODO: offset is defunct, because we do it at the group level now.
      //var offset = new THREE.Vector3(0,0,0);
      //this.edges.push({node1: node1, node2: node2, color: color});
      //console.log("shapegraph.addEdge: color=" + color);

      lineMaterial = new THREE.LineBasicMaterial();

      switch(color) {
        case 'red':
          lineMaterial.color = new THREE.Color(255,0,0);
        break;

        case 'green':
          lineMaterial.color = new THREE.Color(0,255,0);
        break;

        case 'blue':
          lineMaterial.color = new THREE.Color(0,0,255);
        break;

        case 'yellow':
          lineMaterial.color = new THREE.Color(128,128,0);
        break;
        
        default:
          lineMaterial.color = new THREE.Color(255,0,0);
        break;

      };

      //lineMaterial.color = new THREE.Color(255,0,0);

      lineGeometry = new THREE.Geometry();

      // lineGeometry.vertices.push( THREE.Vector3.addVectors(new THREE.Vector3(node1.x, node1.y, node1.z), offset));
      // lineGeometry.vertices.push( THREE.Vector3.addVectors(new THREE.Vector3(node2.x, node2.y, node2.z), offset));
      lineGeometry.vertices.push( new THREE.Vector3(node1.x, node1.y, node1.z));
      lineGeometry.vertices.push( new THREE.Vector3(node2.x, node2.y, node2.z));

      line = new THREE.Line(lineGeometry, lineMaterial);

      group.add(line);

      //vt-hack
      // var mesh = new THREE.Mesh( new THREE.PlaneGeometry(5, 10), new THREE.MeshBasicMaterial({color: 'green'}));
      // //
      // scene.add(mesh);
      // //mesh.position = new THREE.Vector3(node1.x, node1.y, node1.z);
      // mesh.position.set(node1.x, node1.y, node1.z);
       
      
    };

    
    // sychronize the shapeGraph to the scene.  This is mostly just used to initliaze
    // the scene, but it's general enough to called idempotently.
    shapeGraph.prototype.addToGroup = function(group) {
      var edgesLength = this.edges.length;
      
      for (var i = 0; i < edgesLength; i++) {
        //this.prototype.addEdge(edge, this.edge_color, scene);
        this.addEdge(this.edges[i], group);
        //console.log("groupSync: added edge=" + this.edges[i].node1Name);
      } 
      // this.edges.forEach(function (edge) {
      //   this.prototype.addEdge(edge, this.edge_color, scene);
      // });
    };
    
    return shapeGraph;
    
    // var factory = {};

    // // define a constructor
    // factory.shapeGraph = function() {
    // };
    
    // factory.nodes = [];

    // factory.edges = [];

    // factory.draw = function() {
    // };

    // factory.addNode = function() {
    // };

    // factory.getNodeByName = function(nodeName) {
    //   //foreach(var node)
    //   var foundMatch = false;
    //   var matchedNode = null;
      
    //   this.nodes.forEach(function(node) {
    //     console.log("forEach entry: foundoMatch=" + foundMatch);
    //     console.log("forEach entry: matchedNode=" + matchedNode);

    //     if(foundMatch) {
    //       //return matchedNode;
    //       return;
    //     }
        
    //     console.log("shapeGraph.getNode: node.name=" + node.name);
    //     console.log("shapeGraph.getNode: nodeName=" + nodeName);
    //     console.log("shapeGraph.getNode: node.name == nodeName->" + (node.name == nodeName));
    //     if (node.name == nodeName) {
    //       console.log("found match");
    //       foundMatch = true;
    //       matchedNode = node;
          
    //       return node;
    //       console.log("after return node");
    //     };
    //     console.log("after if: foundMatch=" + foundMatch);
    //   });

    //   return matchedNode;
    // };

    // factory.getNodeByNumber = function(nodeNumber) {
    //   return this.nodes[nodeNumber];
    // };
    
    // factory.addEdge = function(args) {
    //   var node1Name = args.node1Name,
    //       node2Name = args.node2Name,
    //       color = args.color,
    //       scene = args.scene;
    //   var line, lineMaterial, lineGeometry;

    //   var node1 = this.getNodeByName(node1Name);
    //   var node2 = this.getNodeByName(node2Name);
      
    //   this.edges.push({node1: node1, node2: node2, color: color});

    //   lineMaterial = new THREE.LineBasicMaterial();
    //   lineMaterial.color = new THREE.Color(0,255,0);

    //   lineGeometry = new THREE.Geometry();

    //   lineGeometry.vertices.push( new THREE.Vector3(node1.x, node1.y, node1.z));
    //   lineGeometry.vertices.push( new THREE.Vector3(node1.x, node1.y, node1.z));

    //   line = new THREE.Line(lineGeometry, lineMaterial);

    //   scene.add(line);
    // };

    // factory.parseJson = function(url) {
    //   console.log("entered parseJson");
    //   $http.get('config/birdies/simplex.json')
    //     .then(function(res){
    //       //$scope.todos = res.data;
    //       console.log("parseJson: res.data.title=" + res.data.title);
    //       console.log("parseJson: res.data.nodes[0].name=" + res.data.nodes[0].name);

    //       var graph = new shapeGraph();

    //       return graph;
    //     });
    // };

    // factory.debug = function(){
    //   var result = this.parseJson();

    //   console.log("shapeGraph.debug: result=" + result);
    // };
    
    // return factory;    
  });
