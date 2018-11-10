
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
