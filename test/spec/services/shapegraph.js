'use strict'; 

ddescribe('Service: shapeGraph', function () {

  // load the service's module
  beforeEach(module('vrsketchApp'));

  // instantiate service
  var shapeGraphBasic, shapeGraph;
  var scene;
  
  beforeEach(inject(function (_shapeGraph_) {
    shapeGraphBasic = angular.copy(_shapeGraph_);
    shapeGraph = _shapeGraph_;

    shapeGraph.nodes.push({name: 'a', x: 0, y:0, z: 0});
    shapeGraph.nodes.push({name: 'b', x: 1, y:0, z: 0});
    
    scene = [];
    
    scene.add = function(x) {
      this.push(x);
    };
  }));

  it('should do something', function () {
    expect(!!shapeGraph).toBe(true);
  });

  it('default constructor has proper attributes', function() {
    expect(shapeGraph.nodes).toBeArray();
    expect(shapeGraph.edges).toBeArray();
  }); 

  it('nodes.push adds a new node structure', function() {
    shapeGraphBasic.nodes.push({name: 'node1', x: 7});
    
    expect(shapeGraphBasic.nodes[0].name).toEqual('node1');
    expect(shapeGraphBasic.nodes[0].x).toEqual(7);
  });

  it('getNodeByName returns the proper node', function() {
    var node = shapeGraph.getNodeByName('a');

    console.log("ut: node=" + node);

    expect(node).toBeTruthy();
  });

  it('getNodeByNumber returns the proper node', function() {
    var node = shapeGraph.getNodeByNumber(1);

    //console.log("ut: node=" + node);

    expect(node).toBeTruthy();
    expect(node.name).toEqual('b');
  });
  
  it('addEdge adds to the scene', function() {
    shapeGraph.addEdge({node1Name: 'a', node2Name: 'b', color: 'red', scene: scene});

    expect(scene[0]).toBeTruthy();
    console.log("scene[0]=" + scene[0]);
    //expect(scene[0]).name.toEqual('Line');
  });

  iit('parseJson parse right', function() {
    shapeGraph.parseJson(); 
  });
 
});
