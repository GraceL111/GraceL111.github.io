// 12 Object Demo (Books)
// Grace Li
// March 12


let myBook;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myBook = new Book("CS30 Text", "Mr.Scott", 1234567891011, "leatherbound", 515, width*0.3);
  myBook1 = new Book("Grace", "GraceL", 1234567891012, "softcover", 34, width*2);
  myBook.printOut();
  myBook1.printOut();
}

function draw() {
  background(220);
  myBook.display();
  myBook1.display();
}

// Nice to organize class at the bottom.
class Book{
  // 1. Constructor
  constructor(tittle, author, isbn, cover, pages, x){
    this.tittle = tittle;
    this.author = author;
    this.isbn = isbn;
    this.cover = cover;
    this.pages = pages;
    this.x = x;

  }
  // 2. Class methods
  display(){
    // render our book obeject on the canvas
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(20);

    switch(this.cover){
      case "softcover":
        fill(250, 200, 150);
        break;
      case "hardcover":
        fill(12, 255, 255);
        break;
      case "leatherbound":
        fill(150, 100, 15);
        break;
    }

    rect(this.x,height/2, this.pages/10, 150);
    fill(255);
    text(this.tittle[0], this.x, height/2 -50);
  }


  printOut(){
    // print out the data in a nice format
    print(this.tittle + ", by " + this.author);
    print("length: " + this.pages);
    print("ISBN: " + this.isbn);
  }


}
