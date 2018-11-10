/* create base variables for the Canvas implementation*/
// Additional credit goes to Emily, for sending me the useful tutorial on YouTube, 
// Vaidehi and Lauren with whom we banged heads together at different times to come up with solutions
// And of course, Colleen and Kangning who reminded me not to panic.

var freshCanvas = document.getElementById('freshCanvas');
var context = freshCanvas.getContext('2d');
/* set the dimensions of the Canvas, and the line drawn*/
	freshCanvas.width = 800;
	freshCanvas.height = 500;
/* set the radius of the pen/brushstroke/etc*/
var radius = 4;
// in context, set width of brush stroke line. Must go after radius is set as calls radius.  
	context.lineWidth = radius*2;
// when mouse is dragged
var drag = false;

/* create variable for dot brush, set if for the first event, create circle and fill it*/
var pencilDown = function(e){
	if(drag){
	//open path for next movement, and make it a stroke.
		// context.lineTo(e.clientX, e.clientY);
		// context.stroke();
	// make sure to check against the drag, baby, yeah.
		context.beginPath();
		context.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
	// context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
		context.fill();
	// tell it to connect to prior mousepoint and move to current location of cursor
		context.beginPath();
		context.moveTo(e.clientX, e.clientY);
	} 
	// Prevent the whole page from dragging if on mobile
		e.preventDefault();
};
//more variables tied to mousing objects.
var pencilStart = function(e){
	drag = true;
	pencilDown(e);
};
var pencilUp = function(){
	drag = false;
//get rid of extra line in pencilDown.
	context.beginPath();
};
// var cancel = function () {
// 	??? = false;
// 			};

//actions for the mouse, specifically mouse-related
freshCanvas.addEventListener('mousedown', pencilStart);
freshCanvas.addEventListener('mousemove', pencilDown);
freshCanvas.addEventListener('mouseup', pencilUp);


//set variable for each key number (b, g, r, y) that will represent an eventual color choice, etc.
var colorKeys = function(e){
 		console.log(e.keyCode);  
 		if (e.keyCode == 66){context.fillStyle = "blue";}
 		if (e.keyCode == 71){context.fillStyle = "green";}
 		if (e.keyCode == 82){context.fillStyle = "red";}
 		if (e.keyCode == 89){context.fillStyle = "yellow";}
 	};
 //set separate variable to handle key functions (clear, size of cursor, etc.)
var functionKeys = function(e){
		console.log(e.keyCode); 
 		if (e.keyCode == 40){ 
 			if (radius > 2)
 				radius -=2;}
 		if (e.keyCode == 38){radius +=2;}
 		if (e.keyCode == 32){context.clearRect(0, 0, 800, 500);}
 	};

//activate color keys on keydown of keystroke variable.
window.addEventListener('keydown', colorKeys); 

//activate instruction to clear the Canvas or change size of brush)
window.addEventListener('keydown', functionKeys);

// Setup canvas .. 
var canvas = document.getElementById('main-canvas'),
	ctx = canvas.getContext('2d');

// setup lines styles .. 
ctx.strokeStyle = "#DDD";
ctx.lineWidth = 2;

// some variables we'll need .. 
var drawing = false;
var mousePos = {x:0, y:0};
var lastPos = mousePos;
var isMobile = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

// mouse/touch events ..
canvas.addEventListener((isMobile ? 'touchstart' : 'mousedown'), function(e) {
	drawing = true;
	lastPos = getMousePos(canvas, e);
	mousePos = lastPos;
});
canvas.addEventListener((isMobile ? 'touchmove' : 'mousemove'), function(e) {
	mousePos = getMousePos(canvas, e);
});
canvas.addEventListener((isMobile ? 'touchend' : 'mouseup'), function(e) {
	drawing = false;
});

// helper functions .. 
function getMousePos(canvasDom, touchOrMouseEvent) {
	var rect = canvasDom.getBoundingClientRect();
	return {
		x: (isMobile ? touchOrMouseEvent.touches[0].clientX : touchOrMouseEvent.clientX) - rect.left,
		y: (isMobile ? touchOrMouseEvent.touches[0].clientY : touchOrMouseEvent.clientY) - rect.top
	};
};

// drawing .. 
window.requestAnimFrame = (function(callback) {
	return	window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000/60);
			};
})();

function renderCanvas() {
	if (drawing) {
		ctx.moveTo(lastPos.x, lastPos.y);
		ctx.lineTo(mousePos.x, mousePos.y);
		ctx.stroke();
		lastPos = mousePos;
	}
};

(function drawLoop() {
	requestAnimFrame(drawLoop);
	renderCanvas();
})();

// // Set up touch events for mobile, etc
// canvas.addEventListener("touchstart", function (e) {
//         mousePos = getTouchPos(canvas, e);
//   var touch = e.touches[0];
//   var mouseEvent = new MouseEvent("mousedown", {
//     clientX: touch.clientX,
//     clientY: touch.clientY
//   });
//   canvas.dispatchEvent(mouseEvent);
// }, false);
// canvas.addEventListener("touchend", function (e) {
//   var mouseEvent = new MouseEvent("mouseup", {});
//   canvas.dispatchEvent(mouseEvent);
// }, false);
// canvas.addEventListener("touchmove", function (e) {
//   var touch = e.touches[0];
//   var mouseEvent = new MouseEvent("mousemove", {
//     clientX: touch.clientX,
//     clientY: touch.clientY
//   });
//   canvas.dispatchEvent(mouseEvent);
// }, false);

// // Get the position of a touch relative to the canvas
// function getTouchPos(canvasDom, touchEvent) {
//   var rect = canvasDom.getBoundingClientRect();
//   return {
//     x: touchEvent.touches[0].clientX - rect.left,
//     y: touchEvent.touches[0].clientY - rect.top
//   };
// }
// // Prevent scrolling when touching the canvas
// document.body.addEventListener("touchstart", function (e) {
//   if (e.target == freshCanvas) {
//     e.preventDefault();
//   }
// }, false);
// document.body.addEventListener("touchend", function (e) {
//   if (e.target == freshCanvas) {
//     e.preventDefault();
//   }
// }, false);
// document.body.addEventListener("touchmove", function (e) {
//   if (e.target == freshCanvas) {
//     e.preventDefault();
//   }
// }, false);
