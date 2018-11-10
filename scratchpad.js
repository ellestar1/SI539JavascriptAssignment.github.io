var strokeWidth = 5;




window.onload = function() 
{
   canvas = document.querySelector(".canvas");
   var context = canvas.getContext("2d");

   /* Canvas size setting */
   canvas.width = document.width;
   canvas.height = document.height - 130;
    
   /* Touch event listeners */
   canvas.addEventListener("touchstart", touchStartHandler, false);
   canvas.addEventListener("touchmove", touchMoveHandler, false);
   canvas.addEventListener("touchend", touchEndHandler, false);

function touchMoveHandler(e) 
{
   touches = e.touches.item(0);
    
   log.innerHTML ='<strong>pageX:</strong> ' + touches.pageX + 
                  '<br><strong>pageY:</strong> ' + touches.pageY;
    
   context.fillStyle = "#f00";
    
   /* For accurate coordinates, calculate minus offset(Left) from page(X) */
   context.fillRect(touches.pageX - this.offsetLeft, 
                    touches.pageY - this.offsetTop, 5, 5);
}

var touches;
/* Remember the order of the touch events */ 
var drawPath = new Array();
/* Flag for displaying the touching point */
var isMoved = false;
    
function touchStartHandler(e) 
{
   /* Store the current touch information (coordinates) */
   touches = e.changedTouches;
   drawPath.push(touches[0]);  
}

function touchMoveHandler(e) 
{
   isMoved = true;
   touches = e.changedTouches;
    
   /* Assign the line style to be drawn */ 
   context.lineWidth = strokeWidth;
   context.strokeStyle = strokeColor;
   context.lineJoin = "round";

   for (var i = 0; i < touches.length; i++) 
   {
      var idx = drawPathSetting(touches[i].identifier);
    
      /* Draw a line from the stored coordinates to the current coordinates */
      context.beginPath();
      context.moveTo(drawPath[idx].pageX - this.offsetLeft, 
                     drawPath[idx].pageY - this.offsetTop);
      context.lineTo(touches[i].pageX - this.offsetLeft, 
                     touches[i].pageY - this.offsetTop);

      context.closePath();
      context.stroke();

      /* Delete the stored coordinates and store the current ones */    
      drawPath.splice(idx, 1, touches[i]); 
   }
   e.preventDefault();
}

function touchEndHandler() 
{
   /* Display the touching point */
   if (!isMoved)
   {
      var startPoint = (Math.PI/180)*0;
      var endPoint = (Math.PI/180)*360;
      context.fillStyle = strokeColor;
      context.beginPath();
      context.arc(touches[0].pageX - this.offsetLeft, touches[0].pageY - this.offsetTop, 
                  strokeWidth/2, startPoint, endPoint, true);
      context.closePath();
      context.fill();
   }
   isMoved=false;
   drawPath.length = 0; /* Initialize the stored coordinates */ 
}

function drawPathSetting(idx) 
{
   for (var i = 0; i < drawPath.length; i++) 
   {
      var _idx = drawPath[i].identifier;
      if (_idx === idx) 
      {
         return i;
      }
   }

   return -1;
} 



// // Setup canvas .. 
// var canvas = document.getElementById('main-canvas'),
// 	ctx = canvas.getContext('2d');

// // setup lines styles .. 
// ctx.strokeStyle = "#DDD";
// ctx.lineWidth = 2;

// // some variables we'll need .. 
// var drawing = false;
// var mousePos = {x:0, y:0};
// var lastPos = mousePos;
// var isMobile = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

// // mouse/touch events ..
// canvas.addEventListener((isMobile ? 'touchstart' : 'mousedown'), function(e) {
// 	drawing = true;
// 	lastPos = getMousePos(canvas, e);
// 	mousePos = lastPos;
// });
// canvas.addEventListener((isMobile ? 'touchmove' : 'mousemove'), function(e) {
// 	mousePos = getMousePos(canvas, e);
// });
// canvas.addEventListener((isMobile ? 'touchend' : 'mouseup'), function(e) {
// 	drawing = false;
// });

// // helper functions .. 
// function getMousePos(canvasDom, touchOrMouseEvent) {
// 	var rect = canvasDom.getBoundingClientRect();
// 	return {
// 		x: (isMobile ? touchOrMouseEvent.touches[0].clientX : touchOrMouseEvent.clientX) - rect.left,
// 		y: (isMobile ? touchOrMouseEvent.touches[0].clientY : touchOrMouseEvent.clientY) - rect.top
// 	};
// };

// // drawing .. 
// window.requestAnimFrame = (function(callback) {
// 	return	window.requestAnimationFrame ||
// 			window.webkitRequestAnimationFrame ||
// 			window.mozRequestAnimationFrame ||
// 			window.oRequestAnimationFrame ||
// 			window.msRequestAnimationFrame ||
// 			function(callback) {
// 				window.setTimeout(callback, 1000/60);
// 			};
// })();

// function renderCanvas() {
// 	if (drawing) {
// 		ctx.moveTo(lastPos.x, lastPos.y);
// 		ctx.lineTo(mousePos.x, mousePos.y);
// 		ctx.stroke();
// 		lastPos = mousePos;
// 	}
// };

// (function drawLoop() {
// 	requestAnimFrame(drawLoop);
// 	renderCanvas();
// })();

// // // Set up touch events for mobile, etc
// // canvas.addEventListener("touchstart", function (e) {
// //         mousePos = getTouchPos(canvas, e);
// //   var touch = e.touches[0];
// //   var mouseEvent = new MouseEvent("mousedown", {
// //     clientX: touch.clientX,
// //     clientY: touch.clientY
// //   });
// //   canvas.dispatchEvent(mouseEvent);
// // }, false);
// // canvas.addEventListener("touchend", function (e) {
// //   var mouseEvent = new MouseEvent("mouseup", {});
// //   canvas.dispatchEvent(mouseEvent);
// // }, false);
// // canvas.addEventListener("touchmove", function (e) {
// //   var touch = e.touches[0];
// //   var mouseEvent = new MouseEvent("mousemove", {
// //     clientX: touch.clientX,
// //     clientY: touch.clientY
// //   });
// //   canvas.dispatchEvent(mouseEvent);
// // }, false);

// // // Get the position of a touch relative to the canvas
// // function getTouchPos(canvasDom, touchEvent) {
// //   var rect = canvasDom.getBoundingClientRect();
// //   return {
// //     x: touchEvent.touches[0].clientX - rect.left,
// //     y: touchEvent.touches[0].clientY - rect.top
// //   };
// // }
// // // Prevent scrolling when touching the canvas
// // document.body.addEventListener("touchstart", function (e) {
// //   if (e.target == freshCanvas) {
// //     e.preventDefault();
// //   }
// // }, false);
// // document.body.addEventListener("touchend", function (e) {
// //   if (e.target == freshCanvas) {
// //     e.preventDefault();
// //   }
// // }, false);
// // document.body.addEventListener("touchmove", function (e) {
// //   if (e.target == freshCanvas) {
// //     e.preventDefault();
// //   }
// // }, false);
