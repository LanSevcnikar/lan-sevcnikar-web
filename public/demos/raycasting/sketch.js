const colour_background = (39,39,39);
const colour_lines = (224,224,224);
const colour_rays = (232,72,85);

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const resize = window.innerWidth/1100;

class Point{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	
};



class Vector{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	fromPoint(p){
		this.x = p.x;
		this.y = p.y;
	}
	normalize(){
		let mag = sqrt(this.x*this.x + this.y*this.y);
		this.x = 100* this.x / mag;
		this.y = 100 * this.y / mag;
	}
	magnitude(){
		return sqrt(this.x*this.x + this.y*this.y);
	}
	add(p){
		this.x += p.x;
		this.y += p.y;
	}
	subtract(p){
		this.x -= p.x;
		this.y -= p.y;
	}
	setmag(mag){
		this.normalize();
		this.x *= mag;
		this.y *= mag;
	}
}

class Shape{
	constructor(a){
		this.points = [];
		a.forEach(element => {
			if(this.points.length == 0)this.points.push(element); 
			else if(!isSamePoint(element,this.points[this.points.length-1])) {
				this.points.push(element);
			}
		});
	}
	draw(){
		stroke(colour_lines);
		strokeWeight(3);
		let pp = this.points[0];
		this.points.forEach(point => {
			line(pp.x,pp.y,point.x,point.y);
			pp = point;
		});
	}
};

class Ray{
	constructor(x, y, a){
		this.x = x;
		this.y = y;
		this.a = a;
		this.d = new Vector(sin(a),cos(a));
	}

	simulate(x,y,l){
		stroke(colour_lines);
		strokeWeight(1);
		ellipse(x,y,2 * dist_pas(new Point(x,y)));
		let curr = new Point(x,y);
		let dist = dist_pas(curr)
		if(l > 100) return l;
		if(dist > 10000) return 101
		if(dist < 3) {
			stroke(colour_rays);
			ellipse(x,y,10);
			return l;
		}
		let pointer = this.d;
		pointer.setmag(dist);
		//console.log(x,y);
		//console.log(sin(this.a));
		line(x,y,x+sin(this.a)*dist,y+cos(this.a)*dist);
		return this.simulate(x+sin(this.a)*dist,y+cos(this.a)*dist,l+1);
		//return 1;
	}
}

function getLine_pp(p1,p2){
	let a = p1.y-p2.y;
	let b = p2.x-p1.x;
	let c = - p2.x*p1.y + p2.y*p1.x;
	return [a,b,c];
}

function isSamePoint(a, b){
	let EPS = 10e-7;
	if(abs(a.x-b.x) < EPS && abs(a.y-b.y) < EPS) return true;
	return false;
}

function dist_pp(a, b){
	let dx = a.x-b.x;
	let dy = a.y-b.y;
	return sqrt(dx*dx+dy*dy);
}

function dist_pl(p1,p2,p){
	let temp = getLine_pp(p1,p2);
	let a = temp[0];
	let b = temp[1];
	let c = temp[2];
	let pt1 = abs(a*p.x + b*p.y + c);
	let pt2 = sqrt(a*a+b*b);
	return pt1/pt2;
}

function getPoint_pl(p1,p2,p){
	let temp = getLine_pp(p1,p2);
	let a = temp[0];
	let b = temp[1];
	let c = temp[2];
	let x = (b*(b*p.x-a*p.y)-a*c)/(a*a+b*b);
	let y = (a*(-b*p.x+a*p.y)-b*c)/(a*a+b*b);
	return new Point(x,y);
}

function dist_ps(s,p){
	minDist = 9999999;
	s.points.forEach(point => {
		minDist = min(minDist,dist_pp(point,p));
	});
	for (let i = 0; i < s.points.length-1; i++) {
		let pol = getPoint_pl(s.points[i],s.points[i+1],p);
		if(min(s.points[i].x,s.points[i+1].x)-1 < pol.x){
			if(max(s.points[i].x,s.points[i+1].x)+1 > pol.x){
				if(min(s.points[i].y,s.points[i+1].y)-1 < pol.y){
					if(max(s.points[i].y,s.points[i+1].y)+1 > pol.y){
						minDist = min(minDist,dist_pl(s.points[i],s.points[i+1],p));
					}
				}		
			}
		}		
	}
	return minDist;
}

function dist_pas(p){
	let minDist = 9999999;
	shapes.forEach(shape => {
		minDist = min(minDist,dist_ps(shape,p));
	});
	return minDist;
}

let shapes = [];
let pivot = new Point(100*resize,500*resize);

function setup() {
	angleMode(RADIANS)
	createCanvas(screenWidth,screenHeight);
	
	let p1 = new Point(200*resize,200*resize);
	let p2 = new Point(200*resize,300*resize);
	let p3 = new Point(300*resize,300*resize);
	let p4 = new Point(300*resize,200*resize);
	let o = new Shape([p1,p2,p3,p4,p1]);
	shapes.push(o);
	p1 = new Point(600*resize,600*resize);
	p2 = new Point(600*resize,750*resize);
	p3 = new Point(750*resize,750*resize);
	p4 = new Point(750*resize,600*resize);
	o = new Shape([p1,p2,p3,p4,p1]);
	shapes.push(o);
	p1 = new Point(700*resize,100*resize);
	p2 = new Point(700*resize,200*resize);
	p3 = new Point(900*resize,200*resize);
	p4 = new Point(900*resize,100*resize);
	o = new Shape([p1,p2,p3,p4,p1]);
	shapes.push(o);
	p1 = new Point(1000*resize,500*resize);
	p2 = new Point(1000*resize,800*resize);
	p3 = new Point(1050*resize,800*resize);
	p4 = new Point(1050*resize,500*resize);
	o = new Shape([p1,p2,p3,p4,p1]);
	shapes.push(o);
	//noStroke();
}

function get_angle(){
	let mousePoint = new Point(mouseX, mouseY);
	let dirVec = new Vector(0,0);
	dirVec.fromPoint(mousePoint);
	dirVec.subtract(pivot);
	a = atan2(dirVec.x,dirVec.y);
	return a;
}

function draw()	{
	background(colour_background);
	shapes.forEach(shape => {
		shape.draw();
	});
	noFill();
	ray = new Ray(pivot.x,pivot.y,get_angle());
	//ray.simulate(ray.x,ray.y,0);
	//ellipse(pivot.x,pivot.y,2 * dist_pas(pivot));
	ray.simulate(ray.x,ray.y,0);
}