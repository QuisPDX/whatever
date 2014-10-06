//Canvas setup.
var canvas = document.getElementById("game_canvas");
canvas.width = .99*(.8*window.innerWidth - 31);
canvas.height = .9*window.innerHeight;
canvas.style.border = "3px solid #222222"
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

    canvasX = Math.round( canvasX * (this.width / this.offsetWidth) );
    canvasY = Math.round( canvasY * (this.height / this.offsetHeight) );

    return {x:canvasX, y:canvasY}
}

// ==============================

var color1 = '#333333';
var color2 = '#444444';
var color3 = '#346a5b';
var color4 = '#124839';

var radius = Math.min(20, 0.4*(canvas.width)/11, 0.4*(canvas.height)/6);
var coord_array = [];
var c = 0;
var saved_index = 0;
var n_x = Math.floor(0.8*canvas.width/(2*radius));
var n_y = Math.floor(0.8*canvas.height/(2*radius));
var w = canvas.width;
var h = canvas.height;


function initalize_circles(){
  for (y = 0; y < n_y ; y++){
    for (x = 0; x < n_x ; x++) { 
      var x_px_coord = 0.5*(w/n_x) + x*(w)/(n_x);
      var y_px_coord = 0.5*(h/n_y) + y*(h)/(n_y);
      var x_nm_coord = x;
      var y_nm_coord = y;
      var currently_selected     = 0;
      var state = 0;

      coord_array[c] = currently_selected;  c++;
      coord_array[c] = state;               c++;
      coord_array[c] = x_nm_coord;          c++;
      coord_array[c] = y_nm_coord;          c++;      
      coord_array[c] = x_px_coord;          c++;
      coord_array[c] = y_px_coord;          c++;
    };
  };
};

function reset_circles(){
  for (y = 0; y < n_y ; y++){
    for (x = 0; x < n_x ; x++) { 
      var x_px_coord = 0.5*(w/n_x) + x*(w)/(n_x);
      var y_px_coord = 0.5*(h/n_y) + y*(h)/(n_y);
      var x_nm_coord = x
      var y_nm_coord = y
      context.beginPath();
      context.arc(x_px_coord, y_px_coord, radius, 0, 2 * 3.1415);
      context.fillStyle = color1;
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = color2;
      context.stroke();
    };
  };
};

function print_string_centered_here(x1,y1,text_string){
      context.font = '20px Helvetica'; 
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText(text_string, x1, y1 + 20/(2.62)); // make sure penultimate number is same as context.font
};

function distance(x1, y1, x2, y2){
  return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
};

// var foobar = 0
function toggle_currently_selected(old_index, cur_index){ 
   if (old_index != cur_index){
    coord_array[6*old_index] = 0; //turn off old index
    coord_array[6*cur_index] = 1; //turn on new index
  } else {
    coord_array[6*cur_index] = (coord_array[6*cur_index] == 1) ? 0 : 1; //toggle old index
  };
  saved_index = cur_index;
  // context.fillText(coord_array[6*old_index], 10+160*foobar, 10);
  // context.fillText(coord_array[6*cur_index], 40+160*foobar, 10);
  // context.fillText(old_index, 70+160*foobar, 10);
  // context.fillText(cur_index, 100+160*foobar, 10);
  // foobar++;
};

function update_state(i){
  coord_array[6*i+1] = (coord_array[6*i+1] + 1) % 4;
};

function color_based_on_state(i, x1, y1){
  context.beginPath();
  context.arc(x1, y1, radius, 0, 2 * 3.1415);
  if (coord_array[6*i+1] == 0){
    context.fillStyle = color1;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = color2;
  }else{
    context.fillStyle = color3;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = color4;
    print_string_centered_here(x1,y1,coord_array[6*i+1])
  };
  context.stroke();
};

function color_circle_under_cursor(){
  for (var i = 0; i < (coord_array.length)/6; i++) {
    coords = canvas.relMouseCoords(event);
    canvasX = coords.x;
    canvasY = coords.y;
    var x_one = coord_array[6*i + 4];
    var y_one = coord_array[6*i + 5];
    if (distance(x_one, y_one, canvasX, canvasY) < radius){
      toggle_currently_selected(saved_index,i);
      update_state(i);
      color_based_on_state(i, x_one, y_one);
      return
    };
  };
};

function print_non_zeros(){
  var count = 0;
  for (var i = 0; i < (coord_array.length)/6; i++) {
    if (coord_array[6*i+1] != 0){
      count++;
    };
  };
  context.beginPath();
  context.arc(coord_array[4],coord_array[5], radius, 0, 2 * 3.1415);
  context.fillStyle = color1;
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = color2;
  context.stroke();
  print_string_centered_here(coord_array[4],coord_array[5],count);
};


function click_function(){
  color_circle_under_cursor();
  print_non_zeros();
 // Does not always print
  return false;
};

initalize_circles(); // creates array
reset_circles();     // draws circless
