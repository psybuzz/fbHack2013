console.log("I'm the best mayne, I did it");
//initialize screen size
// $('canvas').attr()
// vas id="compare" width="320" height="240" style="display:none"></canvas>
// 	<video id="vid" autoplay loop width="320" height="240"></video>
// 	<canvas id="overlay" width="320" height="240"></canvas>
// 	<canvas id="debug" width="320" height="240"></canvas>

// set up video and canvas elements needed

var videoInput = document.getElementById('vid');
var canvasInput = document.getElementById('compare');
var canvasOverlay = document.getElementById('overlay')
var debugOverlay = document.getElementById('debug');
// debugOverlay.width = canvasOverlay.width = canvasInput.width = videoInput.width = window.innerWidth * 0.9*1.5;
// debugOverlay.height = canvasOverlay.height = canvasInput.height = videoInput.height = window.innerHeight * 0.9;

var overlayContext = canvasOverlay.getContext('2d');
canvasOverlay.style.position = "absolute";
canvasOverlay.style.top = '0px';
canvasOverlay.style.zIndex = '100001';
canvasOverlay.style.display = 'block';
debugOverlay.style.position = "absolute";
debugOverlay.style.top = '0px';
debugOverlay.style.zIndex = '100002';
debugOverlay.style.display = 'none';

// add some custom messaging

statusMessages = {
	"whitebalance" : "checking for stability of camera whitebalance",
	"detecting" : "Detecting face",
	"hints" : "Hmm. Detecting the face is taking a long time",
	"redetecting" : "Lost track of face, redetecting",
	"lost" : "Lost track of face",
	"found" : "Tracking face"
};

supportMessages = {
	"no getUserMedia" : "Unfortunately, <a href='http://dev.w3.org/2011/webrtc/editor/getusermedia.html'>getUserMedia</a> is not supported in your browser. Try <a href='http://www.opera.com/browser/'>downloading Opera 12</a> or <a href='http://caniuse.com/stream'>another browser that supports getUserMedia</a>. Now using fallback video for facedetection.",
	"no camera" : "No camera found. Using fallback video for facedetection."
};

document.addEventListener("headtrackrStatus", function(event) {
	if (event.status in supportMessages) {
		var messagep = document.getElementById('gUMMessage');
		messagep.innerHTML = supportMessages[event.status];
	} else if (event.status in statusMessages) {
		var messagep = document.getElementById('headtrackerMessage');
		messagep.innerHTML = statusMessages[event.status];
	}
}, true);

// the face tracking setup

var htracker = new headtrackr.Tracker({altVideo : {}, calcAngles : true, ui : false, headPosition : false, debug : debugOverlay});
htracker.init(videoInput, canvasInput);
htracker.start();

var shapeFinder = new picture();
var testFinder = new picture();
shapeFinder.initialize(50,50,50,50)
var realX;
var realY;
testFinder.initialize(canvasOverlay.width, canvasOverlay.height);


document.addEventListener("facetrackingEvent", function( event ) {
	// clear canvas if we've colored most of the window
	// if (percentCovered() > tolerance){
	// 	overlayContext.clearRect(0,0,320,240);
	// }
	
	// once we have stable tracking, draw rectangle
	if (event.detection == "CS") {
		realX = canvasOverlay.width - (event.x + event.width);
		realY = event.y - 75;
		collisionDetection(event, shapeFinder)
		console.log("x: " + (realX) + ", y: " + (event.y) );
		testFinder.update();
		if (testFinder.checkDone()){
			alert("FUH YEAHHH");
			overlayContext.clearRect(0,0,320,240);
		}
		// console.log("x: " + (event.x) + ", y: " + (event.y) );


		overlayContext.translate(event.x, event.y)
		overlayContext.rotate(event.angle-(Math.PI/2));
		overlayContext.strokeStyle = "#00CC00";
		overlayContext.fillStyle = "#00CC00";
		overlayContext.fillRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
		overlayContext.rotate((Math.PI/2)-event.angle);
		overlayContext.translate(-event.x, -event.y);
	}
});

// turn off or on the canvas showing probability
function showProbabilityCanvas() {
	var debugCanvas = document.getElementById('debug');
	if (debugCanvas.style.display == 'none') {
		debugCanvas.style.display = 'block';
	} else {
		debugCanvas.style.display = 'none';
	}
}

function collisionDetection(event, shapeFinder){
	if (realX + event.width >= shapeFinder.x && 
		realY + event.height >= shapeFinder.y && 
		realX <= shapeFinder.x + shapeFinder.width && 
		realY <= shapeFinder.y + shapeFinder.height){
		console.log("awogjaoefjaweoigjaeoifjaweife");
	}
}