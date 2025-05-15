// Parent Class:
class AnimatedObject{
    constructor(x, y){
      this.x = x;
      this.y = y;
      this.size = 1;
    }
  
    move(){
      this.x += random(-2, 2);
      this.y += random(-2, 2);
    }
  
    display(){
      strokeWeight(6);
      point(this.x, this.y);
    }
  }
  
  
  