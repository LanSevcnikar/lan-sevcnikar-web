let colour_background;
let colour_lines;
let colour_rays;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight - 60;
const X = window.innerWidth/1600;
const resolution = 200 * X;

let initilized = false;
var level;

function setup() {
	createCanvas(screenWidth,screenHeight);
	colour_background = color(39, 39, 39);
	colour_lines = color(224,224,224);
	colour_rays = color(255, 101, 37);
	noFill();
}

function draw()	{
	//console.log(1000/deltaTime);
	//frameRate(60);
	background(colour_background);
	if(initilized){
		level.show();
	}
	
}