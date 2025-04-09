// 18 Image Manipulation
// Grace
// April 9th
//
//

let pilot;  // p5.image

function preload(){
  pilot = loadImage("assets/aviator.png");
}

function setup() {
  createCanvas(pilot.width, pilot.height);

}

function setPixelColor(pos, r, g, b){
  // assume pos points at a RED Component
  pixels[pos] = r;
  pixels[pos + 1] = g;
  pixels[pos + 2] = b;
}

function draw() {
  image(pilot, 0, 0);
  loadPixels();    // Fills pixels array
  greyScale();
  background(0);
  drawCharacter();

  //updatePixels();
}

function drawCharacter(){
  // render an image using characters
  fill(255);

  for(let x = 0; x < width; x+= 10){
    for(let y = 0; y < height; y += 10){
      let location = (y*pilot.width + x) * 4;
      let avg = avgPixel(location);

      if(avg > 200){
        text('*', x, y);
      }
      else if(avg > 150){
        text('*', x, y);
      }
      else if(avg > 100){
        text('-', x, y);
      }
      else if (avg > 70){
        text(',', x, y);
      }
      else if(avg > 50){
        text('.', x, y);
      }

    }
  }
}

function avgPixel(i){
  // i is the index of red component
  let r = pixels[i];
  let g = pixels[i + 1];
  let b = pixels[i + 2];
  return (r+g+b)/3;
}

function greyScale(){
  // a desaturation filter
  for( let i = 0; i < pixels.length; i += 4){
    let avg = avgPixel(i);
    setPixelColor(i, avg, avg, avg);
  }

}

function boostImage(){
  // brightening filter; make pixels brighter
  let boost = 50;
  for(let i = 0; i < pixels.length; i+= 4){
    let r = pixels[i] + boost;
    let g = pixels[i + 1] + boost;
    let b = pixels[i + 2] + boost;
    setPixelColor(i, r, g, b);
  }
}
