var Point = function(){
	this.x = 0;
	this.y = 0;
};

Point.prototype.distance = function(p){
	var q = new Point();
	q.x = p.x - this.x;
	q.y = p.y - this.y;
	return q;
};

Point.prototype.length = function(){
	return Math.sqrt(this.x * this.x +this.y * this.y);
};

Point.prototype.normalize = function(){
	var i = this.length();
	if(i > 0){
		var j = 1 / i;
		this.x *= j;
		this.y *= j;
	}
	else console.log("Point.normalize ERROR")
};

