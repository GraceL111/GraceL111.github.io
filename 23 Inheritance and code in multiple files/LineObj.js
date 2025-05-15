
// Child Class 2- line
class LineObj extends AnimatedObject{
  constructor(){
      super(random(width),random(height));
    }
  
    move(){  // override+ build on parent class version
      super.move();    // first reference the parent class
      this.x -= 5;
      if(this.x < 0){
        this.x = width;
      }
    }
  
    display(){// full override
      if(mouseIsPressed){
        strokeWeight(12);
      }
      else {
        strokeWeight(2);
      }
      line(this.x, this.y, 0, random(height));
    }
}
  