//Canvas setup.
var canvas = document.getElementById("game_canvas");
canvas.width = .9*window.innerWidth;
canvas.height = .9*window.innerHeight;

var context = canvas.getContext("2d");
context.fillStyle = "#cccccc";

// http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
HTMLCanvasElement.prototype.relMouseCoords = function (event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    // Fix for variable canvas width
    canvasX = Math.round( canvasX * (this.width / this.offsetWidth) );
    canvasY = Math.round( canvasY * (this.height / this.offsetHeight) );

    return {x:canvasX, y:canvasY}
}

var radius = Math.min(20, 0.4*(canvas.width)/11, 0.4*(canvas.height)/6);
var n_x = Math.floor(0.8*canvas.width/(2*radius)) - 2;
var n_y = Math.floor(0.8*canvas.height/(2*radius)) - 1;
var w = canvas.width;
var h = canvas.height;

var coord_array = []
var c = 0
for (y = 0; y < n_y ; y++){
	for (x = 0; x < n_x ; x++) { 
		var x_coord = 0.5*(w/n_x) + x*(w)/(n_x);
		var y_coord = 0.5*(h/n_y) + y*(h)/(n_y);
    coord_array[c] = x_coord
    c++
    coord_array[c] = y_coord
    c++
		context.beginPath();
		context.arc(x_coord, y_coord, radius, 0, 2 * 3.1415);
		context.fillStyle = '#5555aa';
		context.fill();
		context.lineWidth = 2;
		context.strokeStyle = '#333388';
		context.stroke();
		// context.beginPath();
		// context.style.lineHeight = '50';
    // figure out how to scale font size with radius
    // context.font = '20px Courier';
    // context.fillStyle = 'white'; '
    // context.textAlign = 'center';
    // context.style.verticalAlign=center;
    // context.fillText('\u2588', x_coord, y_coord + 20/(2.62)); // make sure penultimate number is same as context.font
	}
}

function reset_circles(){
  for (y = 0; y < n_y ; y++){
    for (x = 0; x < n_x ; x++) { 
      var x_coord = 0.5*(w/n_x) + x*(w)/(n_x);
      var y_coord = 0.5*(h/n_y) + y*(h)/(n_y);
      context.beginPath();
      context.arc(x_coord, y_coord, radius, 0, 2 * 3.1415);
      context.fillStyle = '#5555aa';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#333388';
      context.stroke();
    }
  }
}

function distance(x1, y1, x2, y2){return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2))
}

function clicky(){
  reset_circles();
  for (var i = 0; i < (coord_array.length)/2; i++) {    
    coords = canvas.relMouseCoords(event);
    canvasX = coords.x;
    canvasY = coords.y;
    var x_one = coord_array[2*i]
    var y_one = coord_array[2*i + 1]
    if (distance(x_one, y_one, canvasX, canvasY) < radius){
      reset_circles
      context.beginPath();
      context.arc(x_one, y_one, radius, 0, 2 * 3.1415);
      context.fillStyle = '#aa5555';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#883333';
      context.stroke();
    }
  }
}

var fps = 30;
var count = 0;
// setInterval(function() {
// 	count += 1;
// 	context.clearRect(0, 0, canvas.width, canvas.height);
// 	context.fillText(count, 10, 10);
// }, 1000/fps);