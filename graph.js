/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    // find the adjacencies - loop
    // delete adjacency
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    // delete vertex
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */

  // build complex graph
  //
  //                       Q --P -- S
  //                      /  \ |      \
  //                     R     X   --  U
  //                     | \   |  \   /
  //                     |  \  |    V
  //                      \    Y    |
  //                       \     \  /
  //                         T --- W
  //

  depthFirstSearch(start) {
    // let current = start;
    let toVisitStack = [start]; // neighbors to visit

    let visitedNodesStack = new Set([start]); // neighbors visited
    let results = [start];


    while (toVisitStack.length > 0) {
      let current = toVisitStack.pop();

      if (!visitedNodesStack.has(current)) {
        visitedNodesStack.add(current);
        results.push(current.value);
      }

      // add all neighbors to to visit stack if they haven't been visited
      for (let neighbor of current.adjacent) {
        if (!visitedNodesStack.has(neighbor)) {

          toVisitStack.push(neighbor);
        }
      }
      // set current to most recent neighbor in toVisit stack
    }
    return results
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) { 
    let toVisitQueue = [start];
    let visitedNodesQueue = new Set([start]);
    let results = [start];

    while (toVisitQueue.length>0){
      let current = toVisitQueue.shift();
      if(!visitedNodesQueue.has(current)){
        visitedNodesQueue.add(current);
        results.push(current.value);
      }
      for (let neighbor of current.adjacent) {
        if (!visitedNodesQueue.has(neighbor)) {
          toVisitQueue.push(neighbor);
        }
      }
    }

    return results

  }

  
  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) { 
    if(!this.nodes.has(start) || !this.nodes.has(end)){
      return;
    }
    if(start===end) return 0;

    let visitedNodesVertex = new Set([start]);
    let nodeDistances = [[start, 0]];
    let distances = [];
    while(nodeDistances.length>0){
      let [currentNode, distance] = nodeDistances.shift();

      if(currentNode===end){
        nodeDistances.shift();
        distances.push(distance);
      }
      for(let neighbor of currentNode.adjacent){
        if(!visitedNodesVertex.has(neighbor)){
          visitedNodesVertex.add(neighbor);
          nodeDistances.push([neighbor, distance+1]); 
        }
      }
    }
    console.log(distances);
    return Math.min(...distances);
    
  }
}

module.exports = { Graph, Node };
