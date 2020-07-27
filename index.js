/** @global */
var height = NaN;
var width = NaN;
var canvas = null;
var circle = null;
var l = null;
var ball = null;
var processing = false;
document.addEventListener('mousemove', function(e) {
  //onMouseUpdate(e);
})

$(document).ready(function() {
  initiate();
});

function initiate() {

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
  circle = new Circle(x, y, 20, 20, 20);
  setBallPosition(x, y);

  generate();

}

/*      MOUSE AND MOVEMENT FUNCTIONS     */
/* ------------------------------------- */

function onMouseUpdate(e) {
  //console.log("Move");
  var pos = getMousePos(e);

  var pageX = e.pageX;
  var pageY = e.pageY;

  console.log("%d %d %d %d", pageX, circle.x, pos.y, circle.y);

  if (Math.abs(pageX - circle.x) < 10 && Math.abs(pageY - circle.y) < 10 && !processing) {
    circle.vx = 10;
    circle.vy = 10;

    generate();
  }
}

function generate() {

  processing = true;

  console.log("Generate");

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
}

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

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


function setBallPosition(x, y) {
  ball.css("top", canvas.height() - y);
  ball.css("left", x);

  console.log("Ball moved to posotion: %d %d", x, canvas.height() - y);
}

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