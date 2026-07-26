class Ray{
	constructor(x,y,a,ra){
		this.x = x;
		this.y = y;
		this.a = a;
		this.ra = ra;
	}

	simulate(){
		let w = level.w;
		let pos = new Vector(this.x,this.y);
		let delta = new Vector(1,0);
		delta.rotate(this.a);
		delta.setmag(0.00006);
		while(level.grid[floor(pos.y)][floor(pos.x)] == '0') pos.add(delta);
		//console.log(pos);
		pos.subtract(new Vector(this.x,this.y));
		return cos(this.ra)*pos.magnitude();
	}

	show(){
		let w = level.w;
		let pos = new Vector(this.x,this.y);
		let delta = new Vector(1,0);
		delta.rotate(this.a);
		delta.setmag(0.001);
		while(level.grid[floor(pos.y)][floor(pos.x)] == '0') pos.add(delta);
		//console.log(pos);
		pos.subtract(new Vector(this.x,this.y));
		fill(colour_rays);
		stroke(colour_rays);
		//console.log(colour_rays)
		line(screenWidth/4,screenHeight/2,screenWidth/4+pos.x*w,screenHeight/2+pos.y*w);
		ellipse(screenWidth/4+pos.x*w,screenHeight/2+pos.y*w,6);
	}

	show_special(){
	// 	let w = level.w;
	// 	translate(-screenWidth/4,-screenHeight/2);
	// 	translate (100,100);
	// 	noFill();
	// 	rect(0,0,w,w)
	// 	let dx = this.x - floor(this.x);
	// 	let dy = this.y - floor(this.y);
	// 	fill(colour_lines)
	// 	ellipse(dx*w, dy*w, 5);

	// //TOP LEFT CORNER
	// 	fill(colour_rays);
	// 	//TOP
	// 	ellipse(tan(PI/2-this.a)*dy*w+dx*w,0, 5);
	// 	//BOTTOM
	// 	ellipse(dx*w-tan(PI/2-this.a)*(1-dy)*w,w, 5);
	// 	//RIGHT
	// 	ellipse(w,dy*w-tan(this.a)*(1-dx)*w, 5);
	// 	//LEFT
	// 	ellipse(0,dy*w+tan(this.a)*dx*w, 5);
	// 	//console.log(this.a);
	// 	translate(-100,-100);
		
	// 	translate(screenWidth/4,screenHeight/2);
	}
};