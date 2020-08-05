/** @global */
var height = NaN;
var width = NaN;
var canvas = null;
var circle = null;
var l = null;
var ball = null;
var processing = false;
document.addEventListener('mousemove', function(e) {
  if (!processing) { 

    generate(e); 
  }
})

document.addEventListener('click', function(e) {
  console.log("Shake")
  
  circle.vx = 100;
  circle.vy = 100;

  animate();

})

$(document).ready(function(e) {
  // canvas and ball html elements 
  canvas = $("#draw-canvas");
  ball = $("#ball");

  // width and height of a canvas 
  width  = window.innerWidth;
  height = window.innerHeight;
  $(document.body).height( height );
  var x = Math.random() * width;
  var y = Math.random() * height;

  console.log("Screen width: %d | height: %d", width, height);

  // new circle element
  circle = new Circle(width / 2, height / 2, 25, 0, 0);

  ball.css({top : height/2+'px', left : width/2+'px'})

  ball.click(function() {
    circle.vx = Math.random() * 200 - 100;
    circle.vy = Math.random() * 200 - 100;
    generate();
  });

  //var id = setInterval(generate, e, 30);


});


/*      MOUSE AND MOVEMENT FUNCTIONS     */
/* ------------------------------------- */

function animate() {

  console.log("Animate")

  ball.velocity({
    top : circle.y+'px', 
    left : circle.x+'px'
    },
    { duration : 1000 } 
  );

  console.log("Done animating");

}


function generate(e) {

  console.log("Generate");
  processing = true;

  var coordinates = getMousePos(e);


  if (Math.abs(circle.x - coordinates.x) < 100 && Math.abs(circle.y - coordinates.y) < 100) {

    /**
     * calculating direction angel of approaching mouse pointer
     */
    var hip = Math.sqrt(Math.pow(circle.x - coordinates.x, 2) + Math.pow(circle.y - coordinates.y, 2));

    // c is the third point of the triangle that all three points form 
    // we create it by using x coordinate from a ball and y from a mouse 
    var c = {x:circle.x, y:coordinates.y};

    // mapping mouse in one of 4 quadrants
    var leva  = false;
    var zgoraj = false;
    if (coordinates.x < circle.x) { leva = true; }
    if (coordinates.y < circle.y) { zgoraj = true; }

    var kat = Math.sqrt(Math.pow(c.x - coordinates.x, 2) + Math.pow(c.y - coordinates.y, 2));
    var kot = Math.tan((kat / hip)) * 180 / Math.PI;

    /**
     *  setting the right direction and speed for the ball
     */
     
    if (leva && !zgoraj) {
      kot = 180 - kot;
    } else if (!leva && !zgoraj) {
      kot = 180 + kot;
    } else if (!leva && zgoraj) {
      kot = 360 - kot;
    }


    circle.vx = Math.sin(kot / 180 * Math.PI) * (200 - hip);
    circle.vy = Math.cos(kot / 180 * Math.PI) * (200 - hip);

  }

  if (circle.vx != 0 || circle.vy != 0) {

    circle.x += circle.vx;
    circle.y += circle.vy;

    animate();

    if (collision()) {
      generate(e);

    } else {
      circle.vx = 0;
      circle.vy = 0;

    }
  }
  processing = false;
}

function collision() {

  var collision_detection = false;

  if (circle.x >= width || circle.x <= 0) {
    circle.vx = circle.vx * -1; 
    collision_detection = true;
  }

  if (circle.y >= height || circle.y <= 0) {
    circle.vy = circle.vy * -1; 
    collision_detection = true;
  }

  if (collision_detection) {

    collision_detection = false;

    return true;
  }
}

function getMousePos(e) {
  
  var x = e.pageX - circle.r;
  var y = e.pageY - circle.r;

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