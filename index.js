/** @global */
var height = NaN;
var width = NaN;
var canvas = null;
var circle = null;
var l = null;
var ball = null;
var processing = false;
document.addEventListener('mousemove', function(e) {
  onMouseUpdate(e);
})

$(document).ready(function() {
  // canvas and ball html elements 
  canvas = $("#draw-canvas");
  ball = $("#ball");

  // width and height of a canvas 
  width  = canvas.width();
  height = canvas.height();
  var x = Math.random() * width;
  var y = Math.random() * height;

  console.log("Screen width: %d | height: %d", width, height);

  // new circle element
  circle = new Circle(width / 2, height / 2, 25, 0, 0);

  ball.css({top : height/2+'px', left : width/2+'542px'})

  ball.click(function() {
    circle.vx = Math.random() * 200 - 100;
    circle.vy = Math.random() * 200 - 100;
    generate();
  });

});


/*      MOUSE AND MOVEMENT FUNCTIONS     */
/* ------------------------------------- */

function onMouseUpdate(e) {

  if (circle.vx != 0 || circle.vy != 0) {
    console.log("Ni enak")
    return;
  }

  console.log("Move");
  
  var pos = getMousePos(e);

  // mouse coordinates
  var pageX = e.pageX - circle.r;
  var pageY = e.pageY - circle.r;

  // actual ball coordinates
  var parentOffset = ball.offset(); 
  const x = parentOffset.left;
  const y = parentOffset.top;

  if (Math.abs(x - pageX < 25) && Math.abs(y - pageY) < 25) {
    circle.vx += 50;
    circle.vy += 50;
    generate();
  }
}


function generate() {

  console.log("Generate");

  if (circle.vx != 0 || circle.vy != 0) {

    ball.animate({
      top : '+='+circle.vx+'px', 
      left : '+='+circle.vy+'px'
    });

    circle.x += circle.vx;
    circle.y += circle.vy;

    if (collision()) {
      generate();

    } else {
      circle.vx = 0;
      circle.vy = 0;
    }
  }

  // set interval for function moveBall to 30ms
  /*
  var id = setInterval(moveBall, 30);

  function moveBall() {

    if (circle.vx > 0 || circle.vy > 0) {

      circle.x += circle.vx; 
      circle.y += circle.vy;

      

      // TODO ***
      // speed does not decrease linearly
      circle.vx--;
      circle.vy--;

      setBallPosition(circle.x, circle.y);

    } else {

      console.log("Else");
      processing = false;
      clearInterval(id);

    } 
  }
  */

}

function collision() {

  var collision_detection = false;

  if (circle.x >= width || circle.x == 0) {
    circle.vx = circle.vx * -1; 
    collision_detection = true;
  }

  if (circle.y >= height || circle.y == 0) {
    circle.vy = circle.vy * -1; 
    collision_detection = true;
  }

  if (collision_detection) {
    return true;
  }
}

function getMousePos(e) {
  /*
  //const rect = canvas.getBoundingClientRect()
  const x = e.clientX
  const y = e.clientY
  */

  var ballOffset = ball.offset();

  const x = ballOffset.left + circle.r
  const y = ballOffset.top  + circle.r
  return ({x:x, y:y});
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

/*      CANVAS DRAWING FUNCTIONS         */
/* ------------------------------------- */

function Circle(x, y, r, vx , vy) {
  this.x  = x;
  this.y  = y;
  this.r  = r;
  this.vx = vx;
  this.vy = vy;

  this.decreaseVX = function() {
    if (this.vx < 0) {
      this.vx++;

    } else if (this.vx > 0) {
      this.vx--;

    }
  }

  this.decreaseVY = function() {
    if (this.vy < 0) {
      this.vy++;

    } else if (this.vy > 0) {
      this.vy--;

    }
  }
}