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

// http://stackoverflow.com/questions/8301400/how-do-you-easily-create-empty-matrices-javascript
function n_by_n_zero_matrix(n){
  var matrix = [];
  for(i2=0; i2 < n; i2++) {
    matrix[i2] = [];
    for(j2=0; j2 < n; j2++) {
      matrix[i2][j2] = 0;
    }
  }
  return matrix}

var color1 = '#333333'; var color2 = '#444444'; var color3 = '#346a5b'; var color4 = '#124839';

var radius = Math.min(20, 0.4*(canvas.width)/11, 0.4*(canvas.height)/6);
var j = [];
var c = 0;
var saved_index = 0;
var max_a = Math.floor(0.8*canvas.width/(2*radius));
var max_b = Math.floor(0.8*canvas.height/(2*radius));
var w = canvas.width;
var h = canvas.height;
var atox = [];
var btoy = [];
var max_vertex = 5;
var proximity_matrix;

function initialize_atox_and_btoy(){
  for (a = 0; a < max_a ; a++){
    atox[a] = 0.5*(w/max_a) + a*w/max_a;
  }
  for (b = 0; b < max_b ; b++){
     btoy[b] = 0.5*h/max_b + b*h/max_b;
  }}

function initalize_j(){
  for (b = 0; b < max_b ; b++){
    for (a = 0; a < max_a ; a++) { 
      currently_selected = 0;
      state = 0;
      j[c] = currently_selected;  c++;
      j[c] = state;               c++;
      j[c] = a;                   c++;
      j[c] = b;                   c++;
    }
  }}

function reset_circles(){
  context.canvas.width = context.canvas.width;
  for (b = 1; b < max_b ; b++){
    for (a = 0; a < max_a ; a++) {
      color_based_on_state(j[r_index(a,b)+1], a, b);
    }
  }}

function print_string_centered_here(a1,b1,text_string){
  context.font = '20px Helvetica'; 
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.fillText(text_string, atox[a1], btoy[b1] + 20/(2.62));} // make sure penultimate number is same as context.font

function distance(x1, y1, x2, y2){return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));}

function toggle_currently_selected(old_index, cur_index){
  if (old_index != cur_index){
    j[4*old_index] = 0; //turn off old index
    j[4*cur_index] = 1; //turn on new index
  }else{
    j[4*cur_index] = (j[4*cur_index] == 1) ? 0 : 1; //toggle old index
  }
  saved_index = cur_index;}

function update_state(i){j[4*i+1] = (j[4*i+1] + 1) % (max_vertex+1);}

function color_based_on_state(state, a1, b1){
  context.beginPath();
  context.arc(atox[a1], btoy[b1], radius, 0, 2 * 3.1415);
  if (state == 0){
    context.fillStyle = color1;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = color2;
  }else{
    context.fillStyle = color3;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = color4;
    print_string_centered_here(a1, b1, state);
  }
  context.stroke();}

function color_circle_under_cursor(){
  for (i = max_a; i < (j.length)/4; i++) {
    coords = canvas.relMouseCoords(event);
    canvasX = coords.x;
    canvasY = coords.y;
    var x1 = atox[j[4*i + 2]];
    var y1 = btoy[j[4*i + 3]];
    if (distance(x1, y1, canvasX, canvasY) < radius){ // There is a much faster way of doing this: find a then find b
      toggle_currently_selected(saved_index, i);
      update_state(i);
      color_based_on_state(j[4*i+1], j[4*i + 2], j[4*i + 3]);
      return
    }
  }}

function number_of_vertices(){
  var count = 0;
  for (var i = 0; i < (j.length)/4; i++) {
    if (j[4*i+1] != 0){
      count++;
    }
  }
  context.beginPath();
  context.arc(atox[j[2]], btoy[j[3]], radius, 0, 2 * 3.1415);
  context.fillStyle = color1;
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = color2;
  context.stroke();
  print_string_centered_here(j[2],j[3],count);}

function draw_line(a1, b1, a2, b2){
  context.beginPath();
  if(a1 == a2){
    x1 = atox[a1]
    x2 = atox[a2]
    y1 = btoy[Math.min(b1,b2)]+radius+2
    y2 = btoy[Math.max(b1,b2)]-radius-2
  }else{
    x1 = atox[Math.min(a1,a2)]+radius+2
    x2 = atox[Math.max(a1,a2)]-radius-2
    y1 = btoy[b1]
    y2 = btoy[b2]
  }
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = 5;
  if (j[r_index(a1,b1)+1] != j[r_index(a2,b2)+1]){
  context.strokeStyle = 'white';
  }else{context.strokeStyle = color1;}
  context.stroke();}

function r_index(a,b){return 4*(max_a*b + a)}

function compare_right_and_down_and_draw(a,b){
  ab_state = j[r_index(a,b)+1];
  i_touches_j(ab_state, ab_state, proximity_matrix);

  if(a == max_a && b == max_b){
  return  
  }

  if(a != max_a){
  right_state = j[r_index(a+1,b)+1];
  }

  if(b != max_b){
  down_state = j[r_index(a,b+1)+1];
  }

  if (ab_state != 0 && right_state > 0){
    draw_line(a, b, a+1, b);
    i_touches_j(ab_state,right_state,proximity_matrix);
  }

  if (ab_state != 0 && down_state > 0){
    draw_line(a, b, a, b+1);
    i_touches_j(ab_state, down_state, proximity_matrix);
  }}

function draw_all_lines(){
  for (b = 0; b < max_b ; b++){
    for (a = 0; a < max_a ; a++){
      compare_right_and_down_and_draw(a,b);
    }
  } }

function i_touches_j(i,j,matrix){
  if (i==0 || j == 0){return}
  matrix[i-1][j-1] = 1;
  matrix[j-1][i-1] = 1;}

function sum_matrix(matrix){
  var sum = 0;
  for (i2=0; i2 < matrix.length; i2++){
    for (j2=0; j2 < matrix[0].length; j2++){
      sum = sum + matrix[i2][j2];
    }
  }
  return sum;}

function largest_full_submatrix(matrix){
  for (i1 = 0; i1 < matrix.length+1; i1++){
    for (i2 = 0; i2 < i1; i2++){
      for (i3 = 0; i3 < i1; i3++){
        if( matrix[i2][i3] == 0){
          return i1-1
        }
      }
    }
  }
  return matrix.length}

function proximityscore(){
  print_string_centered_here(1, 0, largest_full_submatrix(proximity_matrix))
}

function click_function(){
  proximity_matrix = n_by_n_zero_matrix(max_vertex)
  reset_circles();
  color_circle_under_cursor();
  number_of_vertices();
  draw_all_lines(); 
  proximityscore();
  print_string_centered_here(max_a-1, 0, "-");
  print_string_centered_here(max_a-2, 0, max_vertex);
  print_string_centered_here(max_a-3, 0, "+");
}

function print_string_in_last_circle(text_string){
      context.font = '20px Helvetica'; 
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText(text_string, atox[max_a-2], btoy[0] + 20/(2.62));}

function initialize_everything(){
initialize_atox_and_btoy();
initalize_j(); // creates array
reset_circles(); // draws circles
number_of_vertices();
print_string_centered_here(1, 0, 0);
print_string_centered_here(max_a-1, 0, "-");
print_string_centered_here(max_a-2, 0, max_vertex);
print_string_centered_here(max_a-3, 0, "+");
}

initialize_everything()