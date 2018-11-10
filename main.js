/* create base variables for the Canvas implementation*/
// Additional credit goes to Emily, for sending me the useful tutorial on YouTube, 
// Vaidehi and Lauren with whom we banged heads together at different times to come up with solutions
// jshint.com for details on issues that needed fixing
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
var pencilDraw = function(e){
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
	pencilDraw(e);
};
var pencilUp = function(){
	drag = false;
//get rid of extra line in pencilDraw.
	context.beginPath();
};
// var cancel = function () {
// 	??? = false;
// 			};

//actions for the mouse, specifically mouse-related
	freshCanvas.addEventListener('mousedown', pencilStart);
	freshCanvas.addEventListener('mousemove', pencilDraw);
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

// bonus touch event section! While I did talk with several people, 
// I wanted to do this on my own and not have similar outcomes.
// resources include the following, which I adapted for my own:
// https://developer.tizen.org/dev-guide/2.4/org.tizen.tutorials/html/web/w3c/device/task_touch_paint_mw.htm


//define new variables for touch
var touches;
//Remember the order of the touch events // 
var drawPath = new Array([]);
//Flag for displaying the touching point //
var isMoved = false;

//define functions as with mouse but for touch events
	function touchStart(e) 
{
   touches = e.touches.item(0);
    console.log.innerHTML ='<strong>pageX:</strong> ' + touches.pageX + 
                  '<br><strong>pageY:</strong> ' + touches.pageY;
    context.fillStyle = "#f00";
    
   /* For accurate coordinates, calculate minus offset(Left) from page(X) */
   context.arc(touches.pageX - this.offsetLeft, 
                    touches.pageY - this.offsetTop, 5, 5);
 
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

function touchDraw(e) 
{
   isMoved = true;
   touches = e.changedTouches;
    
// Call back line width 
	context.lineWidth = radius*2;
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

function touchEnd() 
{
   /* Display the touching point */
   if (!isMoved)
   {
      var startPoint = (Math.PI/180)*0;
      var endPoint = (Math.PI/180)*360;
      context.lineWidth = radius*2;
      context.lineJoin = "round";
      context.beginPath();
      context.arc(touches[0].pageX - this.offsetLeft, touches[0].pageY - this.offsetTop, 
                  radius/2, startPoint, endPoint, true);
      context.closePath();
      context.fill();
   }
   isMoved=false;
   drawPath.length = 0; /* Initialize the stored coordinates */ 
}

// Add touch event actions to canvas element
	freshCanvas.addEventListener("touchstart", touchStart, false);
	freshCanvas.addEventListener("touchmove", touchDraw, false);
	freshCanvas.addEventListener("touchend", touchEnd, false);
	//freshCanvas.addEventListener("touchcancel", cancel, false);
