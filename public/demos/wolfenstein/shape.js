class Vector{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	normalize(){
		let mag = sqrt(this.x*this.x + this.y*this.y);
		if(isAprox(mag,0,0.01) == false){
			this.x = 100* this.x / mag;
			this.y = 100 * this.y / mag;
		}
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
	rotate(a){
		a = -a;
		let x = 0;
		let y = 0;
		x += cos(a)*this.x;
		y += sin(a)*this.x;
		x += cos(a-PI/2)*this.y;
		y += sin(a-PI/2)*this.y;
		this.x = x;
		this.y = y;
	}
};

function isAprox(a,b,c){
	let pt1 = min(a,b)+c;
	let pt2 = max(a,b)-c;
	if(pt1>pt2){
		//console.log(a,b,"isAprox");
		return true;
	}else{
		//console.log(a,b,"notAprox");
		return false;
	}
}
