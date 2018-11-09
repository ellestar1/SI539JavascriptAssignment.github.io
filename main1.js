var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
	
//  Vaidehi and ELizabeth helped me with the full screen code.

context.fillStyle = "red"


var radius = 10;
	context.lineWidth = radius*2;
var drag = false;

var pointDown = function(e){
	console.log("draw")
	console.log(e.clientX)
	console.log(e.clientY)
	console.log(e.pageX)
	context.beginPath();
	context.arc(e.pageX, e.pageY, radius, 0, Math.PI*2);
	context.fill();
}


var changeColor = function(e){
 		console.log(e.keyCode);  
 		if (e.keyCode == 66){context.fillStyle = "blue";}
 		if (e.keyCode == 71){context.fillStyle = "green";}
 		if (e.keyCode == 82){context.fillStyle = "red";}
 		if (e.keyCode == 89){context.fillStyle = "yellow";}	
 		if (e.keyCode == 40){ 
 			if (radius > 2)
 				radius -=2;
 		}
 		if (e.keyCode == 38){ radius +=2;}
 		if (e.keyCode == 32){context.clearRect(0,0,800,500)}	
}

var pointStart = function(e){
	drag = true;
	pointDown(e);
};
var pointUp = function(){
	drag = false;
	context.beginPath();
}

// I copied parts of code from this website: https://zipso.net/a-simple-touchscreen-sketchpad-using-javascript-and-html5/
// And then I made it work with my code :)


function drawDot(context,x,y,size) {
	r=0; g=0; b=0; a=255;
	context.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
	context.beginPath();
	context.arc(x, y, size, 0, Math.PI*2, true); 
	context.closePath();
	context.fill();
} 


function sketchpad_touchStart() {
	getTouchPos();
	drawDot(context,touchX,touchY,12);
	event.preventDefault();
}

function sketchpad_touchMove(e) { 
	getTouchPos(e);
	drawDot(context,touchX,touchY,12); 
	event.preventDefault();
}

function getTouchPos(e) {
	if (!e)
		var e = event;

	if(e.touches) {
		if (e.touches.length == 1) { // Only deals with one finger
			var touch = e.touches[0]; // Gets the information for that finger
			touchX=touch.pageX-touch.target.offsetLeft;
			touchY=touch.pageY-touch.target.offsetTop;
		}
	}
}



   canvas.addEventListener('mousemove',pointDown)
   window.addEventListener('keydown',changeColor)
   canvas.addEventListener('touchstart', sketchpad_touchStart, false);
   canvas.addEventListener('touchmove', sketchpad_touchMove, false);






