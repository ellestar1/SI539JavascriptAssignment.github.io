/* create base variables for the Canvas implementation*/

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

// bonus touch event section!

// Add touch event listeners to canvas element
			freshCanvas.addEventListener("touchstart", pencilStart, false);
			freshCanvas.addEventListener("touchmove", pencilDown, false);
			freshCanvas.addEventListener("touchend", pencilUp, false);
			// freshCanvas.addEventListener("touchcancel", cancel, false);
