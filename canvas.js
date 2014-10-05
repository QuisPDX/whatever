//Canvas setup.
var game_canvas = document.getElementById("game_canvas");
game_canvas.width = "800";
game_canvas.height = "600";
game_canvas.style.border = "1px solid black";

var game_canvas_ctx = game_canvas.getContext("2d");
game_canvas_ctx.fillStyle = "blue";
game_canvas_ctx.fillRect(10, 10, 20, 20);

var player = {
	width: 20,
	height: 20,
	x_pos: 0,
	y_pos: 0,
	moveTo: function(x, y) { 
		this.x_pos = x;
		this.y_pos = y;
	},
	draw: function() {
		
	}
}

var input = {
	w_key: false,
	a_key: false,
	s_key: false,
	d_key: false,
	get_input: function() {

	}
}

var fps = 30;
var count = 0;
var quit = false;
//Main game loop.
setInterval(function() {
	//input.get_input();
	count += 1;
	//listen for input.
	//adjust position.
	//draw player.
	game_canvas_ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);
	game_canvas_ctx.fillText(count, 10, 10);
}, 1000/fps);