<template>
 <v-app>
  <v-btn
      class="btn"
      large
      color="purple"
      @click = "drawGrid()"
    >
      <v-icon dark>
        mdi-android
      </v-icon>
      Calculate<v-icon dark>
        mdi-android
      </v-icon>
    </v-btn>
    <canvas id="canvas" width="1800" height="1600"></canvas>
     
    <div class="ontop d-flex justify-start mb-6">
      <v-textarea
      background-color="grey lighten-2"
      color="cyan"
      label="adjmatrix"
      v-model="userGraph"
    ></v-textarea>
      
      
    </div>
    
 </v-app>
</template>

<script>
import rough from 'roughjs/bundled/rough.cjs';
  export default {
    name: 'HelloWorld',
    
    data () {
      return {
        userGraph: "",

      };
    },
  methods: 
  {

  drawGrid()
  {
  

  //Queue class for BFS functionality of drawing
  class Queue {
    constructor() {
      this.items = {};
      this.headIndex = 0;
      this.tailIndex = 0;
    }

    enqueue(item) {
      this.items[this.tailIndex] = item;
      this.tailIndex++;
    }

    dequeue() {
      const item = this.items[this.headIndex];
      delete this.items[this.headIndex];
      this.headIndex++;
      return item;
    }

    peek() {
      return this.items[this.headIndex];
    }

    get length() {
      return this.tailIndex - this.headIndex;
    }
  }


    //convert user given adjmatrix into a 2D array using regex
    let adjmatrix = [];
    var tmp = (this.userGraph).split('], ');

    for (var i=0; i<tmp.length; i++) {
        adjmatrix.push(tmp[i].replace(/\[|\]/g, '').split(', '));
    }

    //print contents of the adjmatrix
    console.log(adjmatrix);

    let start_off_hang = 800;
    const drawingQ = new Queue();
    let visited = [];
    let drawn = [];
    let coords = [];

    //create a coordinate array
    for (var i=0; i<adjmatrix.length; i++)
    {
      coords.push([0,0]);
    }

    //set root node position
    coords[0][0] = start_off_hang;
    coords[0][1] = 110;
    drawingQ.enqueue(0);
    const rc = rough.canvas(document.getElementById('canvas'));
    rc.circle(coords[0][0], coords[0][1], 40, { fill: 'red' });



    //perform a BFS drawing each node with a line connect their.X, theirY to the relavant parent.X and parentY
    while (drawingQ.length != 0)
    {
      
      var currentNode = drawingQ.dequeue();
      console.log("... exploring from node: " + currentNode);
      visited.push(currentNode);
      
      let number_of_children = 4;
      let cnt = - 0.5 * number_of_children;
      let offset =  100;

      for (var i = 0; i < adjmatrix[currentNode].length; i++)
      {
        if (adjmatrix[currentNode][i] == 1 && !visited.includes(i) && currentNode != i)
        {
          cnt += 1;

          if (coords[i][0] == 0 && coords[i][1] == 0)
          {
            let childX = coords[currentNode][0] + cnt * offset 
            let childY = coords[currentNode][1] + 80;
            coords[i][0] = childX;
            coords[i][1] = childY;
          }
          

          console.log("found " + i + " (" + coords[i][0] +  "," + coords[i][1] + ") from parent: " + currentNode + " (" + coords[currentNode][0] +  "," + coords[currentNode][1] + ")");
         
          if (!drawn.includes(i))
          {
            rc.circle(coords[i][0], coords[i][1], 40, { fill: 'red' });
          }
          drawn.push(i);
          rc.line(coords[i][0], coords[i][1], coords[currentNode][0], coords[currentNode][1]);
          drawingQ.enqueue(i);
        }
      }





    }

    
  
    
  }
  
  },
  
  
  }
</script>


<style>
.ontop
{
  z-index: 4;
  position: absolute;
  left: 1500px;
  top: 150px;
  width: 40em;
  margin-right: 00px;
}
.btn
{
  z-index: 1;
  margin-right: 0px;
}
</style>