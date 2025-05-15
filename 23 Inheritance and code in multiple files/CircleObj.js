// Child class #1 - circle
class CircleObj extends AnimatedObject{
    constructor(x,y){
      super(x,y);       //Call Parent class constructor 
      this.size = random(20, 40);
    }
    display(){  // function override; copies overtop parent version
      if(dist(this.x, this.y, mouseX, mouseY) < this.size/2){
        fill(255, 0 ,0);
      }
      else{
        fill(255);
      }
      circle(this.x,this.y, this.size);
    }
  
  }
  