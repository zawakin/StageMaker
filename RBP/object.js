//壁を定義する関数---------------------------------------------------------------------------------------------------------------
var Object = function(){
	//諸々の設定
	this.alive = false;
	this.color = 0;
	this.rad   = 0;

	this.vechx = 0;
	this.vechy = 0;
	this.vecvx = 0;
	this.vecvy = 0;
};

Object.prototype.set = function(tlx, tly, wid, hei, rad1, rad2, c){
	//水平方向の幅ベクトル(vech)の値と、垂直方向の幅ベクトル(vecv)の値の計算
	if(!rad2) rad2 = rad1 - Math.PI/2;
	this.vechx = wid * Math.cos(rad1);
	this.vechy = wid * Math.sin(rad1);
	this.vecvx = hei * Math.cos(rad2);
	this.vecvy = hei * Math.sin(rad2);

	//四隅の座標の取得
	this.tlx = tlx;
	this.tly = tly;
	this.trx = tlx + this.vechx;
	this.try = tly + this.vechy;
	this.blx = tlx - this.vecvx;
	this.bly = tly - this.vecvy;
	this.brx = tlx + this.vechx - this.vecvx;
	this.bry = tly + this.vechy - this.vecvy;

	this.wid = wid;
	this.hei = hei;
	this.rad1 = rad1;
	this.rad2 = rad2;
	this.color = c;
	this.alive = true;
};

//壁の描写
Object.prototype.draw = function(){
	ctx.beginPath();
	ctx.moveTo(this.tlx, this.tly);
	ctx.lineTo(this.trx, this.try);
	ctx.lineTo(this.brx, this.bry);
	ctx.lineTo(this.blx, this.bly);
	ctx.closePath();
	ctx.fill();
};

//壁と正円の衝突判定
Object.prototype.collision01 = function(b, j){
	//円がどの辺あるいはどの角と衝突するかの判定
	if(Math.cos(this.rad1)* (b.position.y-this.tly) - Math.sin(this.rad1)* (b.position.x-this.tlx) < 0){
		if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
			b.touchArea[j].x = this.tlx;
			b.touchArea[j].y = this.tly;
			b.touchArea[j].num = 1;
		}
		else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
			b.touchArea[j].x = this.trx;
			b.touchArea[j].y = this.try;
			b.touchArea[j].num = 1;
		}
		else{
			b.touchArea[j].x = this.tlx;
			b.touchArea[j].y = this.tly;
			b.touchArea[j].rad = this.rad1;
			b.touchArea[j].num = 2;
		}
	}
	else if(Math.cos(this.rad1+Math.PI)* (b.position.y-this.bry) - Math.sin(this.rad1+Math.PI)* (b.position.x-this.brx) < 0){
		if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
			b.touchArea[j].x = this.blx;
			b.touchArea[j].y = this.bly;
			b.touchArea[j].num = 1;
		}
		else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
			b.touchArea[j].x = this.brx;
			b.touchArea[j].y = this.bry;
			b.touchArea[j].num = 1;
		}
		else{
			b.touchArea[j].x = this.brx;
			b.touchArea[j].y = this.bry;
			b.touchArea[j].rad = this.rad1 + Math.PI;
			b.touchArea[j].num = 2;
		}
	}
	else{
		if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
			b.touchArea[j].x = this.blx;
			b.touchArea[j].y = this.bly;
			b.touchArea[j].rad = this.rad2;
			b.touchArea[j].num = 2;
		}
		else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
			b.touchArea[j].x = this.trx;
			b.touchArea[j].y = this.try;
			b.touchArea[j].rad = this.rad2 + Math.PI
			b.touchArea[j].num = 2;
		}
		else{
			b.touchArea[j].num = 3;
		}
	}
	//得られた判別から当り判定を取っていく
	if(b.touchArea[j].num < 2){
		//この場合は角に当たる
		b.touchArea[j].len = b.position.distance(b.touchArea[j]).length();
		if(b.touchArea[j].len <= b.size){
			//角に対して垂直、平行方向に速度ベクトルを分解
			rad = Math.atan2(b.position.y - b.touchArea[j].y + b.velocity.y, -b.position.x + b.touchArea[j].x - b.velocity.x);
			var velhx = 　(b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad)) * Math.sin(rad);
			var velhy = -(b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad)) * Math.cos(rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;

			//反発後の計算
			var excess = b.size - b.touchArea[j].len;   
			b.position.x += excess * -Math.cos(rad);
			b.position.y += excess * Math.sin(rad);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;
			
			b.contact[b.collisionC].x = b.touchArea[j].x;
			b.contact[b.collisionC].y = b.touchArea[j].y;
			b.contact[b.collisionC].tangent = "NaN";
			b.collisionC++;
		}
		else if(b.touchArea[j].len <= b.size*1.5) return;
	}
	else if(b.touchArea[j].num < 3){
		//この場合は辺に当たる
		var drop = -Math.cos(b.touchArea[j].rad)* (b.position.y - b.touchArea[j].y) + (b.position.x - b.touchArea[j].x)* Math.sin(b.touchArea[j].rad)
		if( drop <= b.size){
			//壁に対して垂直、平行方向に速度ベクトルを分解
			var velhx = (b.velocity.x * Math.cos(b.touchArea[j].rad) + b.velocity.y * Math.sin(-b.touchArea[j].rad)) * Math.cos(b.touchArea[j].rad);
			var velhy = (b.velocity.x * Math.cos(b.touchArea[j].rad) + b.velocity.y * Math.sin(-b.touchArea[j].rad)) * Math.sin(-b.touchArea[j].rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;
			//反発後の計算
			b.contact[b.collisionC].x = b.position.x - drop*Math.sin(b.touchArea[j].rad);
			b.contact[b.collisionC].y = b.position.y + drop*Math.cos(b.touchArea[j].rad);
			b.contact[b.collisionC].tangent = b.touchArea[j].rad + Math.PI; 
			b.collisionC++;
			
			var excess = b.size - drop;
			b.velocity.x += Math.sqrt(2 * 0.3 * e * excess);
			b.velocity.y += Math.sqrt(2 * 0.3 * e * excess);
			b.position.x += excess *  Math.sin(b.touchArea[j].rad);
			b.position.y += excess * -Math.cos(b.touchArea[j].rad);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;
		}
		else if(drop <= b.size*1.5) return;
	}
	else{
		console.log("正円が内部に入っている")
	}
	b.touchArea[j].num = 0;
}

//壁と歪円の衝突判定
Object.prototype.collision02 = function(b, j){
	//点とぶつかるかの判定
	if(b.touchArea[j].num < 2){
		var rad = Math.atan2(b.touchArea[j].y - b.position.y, b.touchArea[j].x - b.position.x);
		//接点がどのdotの間にあるのか調べる。iがdot_numberになる
		var i;
		for(i=0; i<b.dot.length; i++){
			if( (rad+ 2*Math.PI)%(2*Math.PI) < (b.dot[i].rad+ 2*Math.PI- b.dot[0].rad)%(2*Math.PI)) break;
		}
		if(i >= b.dot.length) i = 0;
		var t = (rad- b.dot[(i+b.dot.length-1)%b.dot.length].rad)/ (b.dot[i].rad- b.dot[(i+b.dot.length-1)%b.dot.length].rad);
		var tangent1 = Math.atan2(b.dot[i].y- b.dot[(i+b.dot.length-2)%b.dot.length].y, b.dot[i].x- b.dot[(i+b.dot.length-2)%b.dot.length].x); 
		var tangent2 = Math.atan2(b.dot[(i+1)%b.dot.length].y- b.dot[(i+b.dot.length-1)%b.dot.length].y, b.dot[(i+1)%b.dot.length].x- b.dot[(i+b.dot.length-1)%b.dot.length].x); 
		var excess = (b.dot[(i+b.dot.length-1)%b.dot.length].x- b.dot[i].x)* (b.touchArea[j].y- b.dot[i].y)- (b.touchArea[j].x- b.dot[i].x)* (b.dot[(i+b.dot.length-1)%b.dot.length].y- b.dot[i].y);
		if(excess < 0){
			//接点の計算
			b.contact[b.collisionC+ b.collisionCC].x = b.touchArea[j].x;
			b.contact[b.collisionC+ b.collisionCC].y = b.touchArea[j].y;
			b.contact[b.collisionC+ b.collisionCC].rad = rad;
			b.contact[b.collisionC+ b.collisionCC].tangent = (1-t)*tangent1 + t*tangent2; 
			b.contact[b.collisionC+ b.collisionCC].excess = -excess;
			b.collisionCC++;
		}
		return;
	}
	//線とぶつかるかの判定
	else if(b.touchArea[j].num < 3){
		var rad = b.touchArea[j].rad
		var dot_number = (Math.round((rad + Math.PI/2)*b.dot.length/Math.PI/2) + b.dot.length) % b.dot.length;
		//壁に垂直な向きへの長さが一番大きい点を調べる
		if((b.dot[(dot_number+1)%b.dot.length].x- b.position.x)* Math.cos(rad+ Math.PI/2)+ (b.dot[(dot_number+1)%b.dot.length].y- b.position.y)* Math.sin(rad+ Math.PI/2)> (b.dot[(dot_number+b.dot.length-1)%b.dot.length].x- b.position.x)* Math.cos(rad+ Math.PI/2)+ (b.dot[(dot_number+b.dot.length-1)%b.dot.length].y- b.position.y) *Math.sin(rad+ Math.PI/2)){
			while((b.dot[(dot_number+1)%b.dot.length].x- b.position.x)* Math.cos(rad+ Math.PI/2)+ (b.dot[(dot_number+1)%b.dot.length].y- b.position.y)* Math.sin(rad+ Math.PI/2)> (b.dot[dot_number].x- b.position.x)* Math.cos(rad+ Math.PI/2)+ (b.dot[dot_number].y- b.position.y)* Math.sin(rad+ Math.PI/2)){
				dot_number++;
				if(dot_number >= b.dot.length) dot_number = 0;
			}
		}
		else{
			while((b.dot[(dot_number+b.dot.length-1)%b.dot.length].x- b.position.x)* Math.cos(rad+ Math.PI/2)+ (b.dot[(dot_number+b.dot.length-1)%b.dot.length].y- b.position.y)* Math.sin(rad+ Math.PI/2)> (b.dot[dot_number].x- b.position.x)* Math.cos(rad+ Math.PI/2)+ (b.dot[dot_number].y- b.position.y)* Math.sin(rad+ Math.PI/2)){
				dot_number--;
				if(dot_number <= -1) dot_number = b.dot.length-1;
			}
		}
		if(Math.cos(rad)* (b.dot[dot_number].y- b.touchArea[j].y)> Math.sin(rad)* (b.dot[dot_number].x- b.touchArea[j].x)){
			//接点の計算
			var div = Math.sin(rad)* (b.dot[dot_number].x- b.position.x)- Math.cos(rad)* (b.dot[dot_number].y- b.position.y)
			b.contact[b.collisionC+ b.collisionCC].x = ((b.position.y* b.dot[dot_number].x- b.position.x* b.dot[dot_number].y)* Math.cos(rad)- (b.touchArea[j].y* (b.touchArea[j].x+ Math.cos(rad))- b.touchArea[j].x* (b.touchArea[j].y+ Math.sin(rad)))* (b.dot[dot_number].x- b.position.x))/ div;
			b.contact[b.collisionC+ b.collisionCC].y = ((b.position.y* b.dot[dot_number].x- b.position.x* b.dot[dot_number].y)* Math.sin(rad)- (b.touchArea[j].y* (b.touchArea[j].x+ Math.cos(rad))- b.touchArea[j].x* (b.touchArea[j].y+ Math.sin(rad)))* (b.dot[dot_number].y- b.position.y))/ div;
			b.contact[b.collisionC+ b.collisionCC].rad = rad + Math.PI/2; 
			b.contact[b.collisionC+ b.collisionCC].tangent = rad + Math.PI;
			b.contact[b.collisionC+ b.collisionCC].excess = Math.cos(rad)* (b.dot[dot_number].y- b.contact[b.collisionC+ b.collisionCC].y)- Math.sin(rad)* (b.dot[dot_number].x- b.contact[b.collisionC+ b.collisionCC].x);
			console.log(dot_number, b.dot[dot_number], b.contact[b.collisionC], b.contact[b.collisionC+ b.collisionCC].excess)
			b.collisionCC++;
		}
		return;
	}
	else{
		console.log("歪円が内部に入っている")
	}
}
/*Object.prototype.collision01 = function(b, j){
	var len01 = (b.position.x - this.tlx)* (b.position.x - this.tlx) + (b.position.y - this.tly)* (b.position.y - this.tly);
	var len02 = (b.position.x - this.trx)* (b.position.x - this.trx) + (b.position.y - this.try)* (b.position.y - this.try);
	var len03 = (b.position.x - this.brx)* (b.position.x - this.brx) + (b.position.y - this.bry)* (b.position.y - this.bry);
	var len04 = (b.position.x - this.blx)* (b.position.x - this.blx) + (b.position.y - this.bly)* (b.position.y - this.bly);
	var corner = new Point();
	var number = 0;

	//どの角が一番正円の中心に近いかを計算
	if(len01<=len02 && len01<=len04){
		corner.x = this.tlx;
		corner.y = this.tly;
		side01 = this.wid;
		side02 = this.hei;
		rad01 = -this.rad1;
		rad02 = -this.rad2 - Math.PI;
	}
	
	else if(len01>len02 && len01<= len04){
		number = 1;
		len01 = len02;
		corner.x = this.trx;
		corner.y = this.try;
		side01 = this.hei;
		side02 = this.wid;
		rad01 = -this.rad2;
		rad02 = -this.rad1;
	}
	
	else if(len01>len02){
		number = 2;
		len01 = len03;
		corner.x = this.brx;
		corner.y = this.bry;
		side01 = this.wid;
		side02 = this.hei;
		rad01 = -this.rad1 + Math.PI;
		rad02 = -this.rad2;
	}
	
	else{
		number = 3;
		len01 = len04;
		corner.x = this.blx;
		corner.y = this.bly;
		side01 = this.hei;
		side02 = this.wid;
		rad01 = -this.rad2 - Math.PI;
		rad02 = -this.rad1 + Math.PI;
	}

	//ぶつかるとしたら角(点)にぶつかるのかそれとも辺(線分)にぶつかるかの計算をif文で分ける
	//角にぶつかるかの判定
	if((Math.cos(rad01-Math.PI/2)* (b.position.y- corner.y)< Math.sin(rad01-Math.PI/2)* (b.position.x- corner.x))&&(Math.cos(rad02+Math.PI/2)* (b.position.y- corner.y)< Math.sin(rad02+Math.PI/2)* (b.position.x- corner.x))){
	len01 = Math.sqrt(len01);
		if(len01 <= b.size){
			//角に対して垂直、平行方向に速度ベクトルを分解
			rad = Math.atan2(b.position.y - corner.y + b.velocity.y, -b.position.x + corner.x - b.velocity.x);
			var velhx = 　(b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad)) * Math.sin(rad);
			var velhy = -(b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad)) * Math.cos(rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;

			//反発後の計算
			var excess = b.size - len01;   
			b.position.x += excess * -Math.cos(rad);
			b.position.y += excess * Math.sin(rad);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;
			
			b.contact[b.collisionC].x = corner.x;
			b.contact[b.collisionC].y = corner.y;
			b.contact[b.collisionC].tangent = "NaN";
			b.collisionC++;
		}
		else if(len01 <= b.size*1.5) b.nextTouch[j] = 10*number;
		return;
	}
	
	//ボールが辺１にぶつかるかの判定
	else if((Math.cos(rad01)* (b.position.y- corner.y)< Math.sin(rad01)* (b.position.x- corner.x))&&(Math.cos(rad01-Math.PI/2)* (b.position.y- corner.y)>= Math.sin(rad01-Math.PI/2)* (b.position.x- corner.x))){
		//ボールから降ろした垂線が半径より小さいかの判定
		var drop = -(side01* Math.cos(rad01)* (b.position.y - corner.y) - (b.position.x - corner.x)* side01* Math.sin(rad01))/ side01
		if( drop <= b.size){
			//壁に対して垂直、平行方向に速度ベクトルを分解
			var velhx = (b.velocity.x * Math.cos(rad01) + b.velocity.y * Math.sin(-rad01)) * Math.cos(rad01);
			var velhy = (b.velocity.x * Math.cos(rad01) + b.velocity.y * Math.sin(-rad01)) * Math.sin(-rad01);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;
			//反発後の計算
			b.contact[b.collisionC].x = b.position.x - drop*Math.sin(rad01);
			b.contact[b.collisionC].y = b.position.y + drop*Math.cos(rad01);
			b.contact[b.collisionC].tangent = rad01 + Math.PI; 
			b.collisionC++;
			
			var excess = b.size - drop;
			b.velocity.x += Math.sqrt(2 * 0.3 * e * excess);
			b.velocity.y += Math.sqrt(2 * 0.3 * e * excess);
			b.position.x += excess * Math.sin(rad01);
			b.position.y += excess * -Math.cos(rad01);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;
		}
		else if(drop <= b.size*1.5) b.nextTouch[j] = 10* number + 1;
		return;
	}
	
	//ボールが辺２にぶつかるかの判定
	else if((Math.cos(rad02)* (b.position.y- corner.y)< Math.sin(rad02)* (b.position.x- corner.x))&&(Math.cos(rad02+Math.PI/2)* (b.position.y- corner.y)>= Math.sin(rad02+Math.PI/2)* (b.position.x- corner.x))){
		//ボールから降ろした垂線が半径より小さいかの判定
		var drop = -(side02* Math.cos(rad02)* (b.position.y - corner.y) - (b.position.x - corner.x)* side02* Math.sin(rad02))/ side02
		if( drop <= b.size){
			//壁に対して垂直、平行方向に速度ベクトルを分解
			var velhx = (b.velocity.x * Math.cos(rad02) + b.velocity.y * Math.sin(-rad02)) * Math.cos(rad02);
			var velhy = (b.velocity.x * Math.cos(rad02) + b.velocity.y * Math.sin(-rad02)) * Math.sin(-rad02);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;
			//反発後の計算
			b.contact[b.collisionC].x = b.position.x - drop*Math.sin(rad02);
			b.contact[b.collisionC].y = b.position.y + drop*Math.cos(rad02);
			b.contact[b.collisionC].tangent = rad02 + Math.PI; 
			b.collisionC++;
			
			var excess = b.size - drop;
			b.velocity.x += Math.sqrt(2 * 0.3 * e * excess);
			b.velocity.y += Math.sqrt(2 * 0.3 * e * excess);
			b.position.x += excess * Math.sin(rad02);
			b.position.y += excess * -Math.cos(rad02);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;
		}
		else if(drop <= b.size*1.5) b.nextTouch[j] = 10* number + 2;
		return;
	}
		
		
	//それ以外はボールが内側に入っていることになる、ありえない挙動なのでエラーを返すようにする
	else console.log("error 正円が内部に入り込んでいる");
}*/



//壁と歪円の衝突判定
/*Object.prototype.collision02 = function(b, nt){
	/*var len01 = (b.position.x - this.tlx)* (b.position.x - this.tlx) + (b.position.y - this.tly)* (b.position.y - this.tly);
	var len02 = (b.position.x - this.trx)* (b.position.x - this.trx) + (b.position.y - this.try)* (b.position.y - this.try);
	var len03 = (b.position.x - this.brx)* (b.position.x - this.brx) + (b.position.y - this.bry)* (b.position.y - this.bry);
	var len04 = (b.position.x - this.blx)* (b.position.x - this.blx) + (b.position.y - this.bly)* (b.position.y - this.bly);*//*
	var len
	var corner = new Point();
	
	//どの角が一番歪円の中心に近いかを計算
	if(nt< 3){
		len = (b.position.x - this.tlx)* (b.position.x - this.tlx) + (b.position.y - this.tly)* (b.position.y - this.tly);
		corner.x = this.tlx;
		corner.y = this.tly;
		side01 = this.wid;
		side02 = this.hei;
		rad01 = -this.rad1;
		rad02 = -this.rad2 - Math.PI;
	}
	
	else if(nt< 13){
		len = (b.position.x - this.trx)* (b.position.x - this.trx) + (b.position.y - this.try)* (b.position.y - this.try);
		corner.x = this.trx;
		corner.y = this.try;
		side01 = this.hei;
		side02 = this.wid;
		rad01 = -this.rad2;
		rad02 = -this.rad1;
	}
	
	else if(nt< 23){
		len = (b.position.x - this.brx)* (b.position.x - this.brx) + (b.position.y - this.bry)* (b.position.y - this.bry);
		corner.x = this.brx;
		corner.y = this.bry;
		side01 = this.wid;
		side02 = this.hei;
		rad01 = -this.rad1 + Math.PI;
		rad02 = -this.rad2;
	}
	
	else{
		len = (b.position.x - this.blx)* (b.position.x - this.blx) + (b.position.y - this.bly)* (b.position.y - this.bly);
		corner.x = this.blx;
		corner.y = this.bly;
		side01 = this.hei;
		side02 = this.wid;
		rad01 = -this.rad2 - Math.PI;
		rad02 = -this.rad1 + Math.PI;
	}
	
	//ぶつかるとしたら角(点)にぶつかるのかそれとも辺(線分)にぶつかるかの計算をif文で分ける
	//角にぶつかるかの判定
	if(nt%10 == 0){
		var dot_number = (Math.floor(Math.atan2(corner.y - b.position.y, corner.x - b.position.x)*12/Math.PI) + b.dot.length) % b.dot.length
		if( (b.dot[(dot_number+1)%b.dot.length].x- b.dot[dot_number].x)* (corner.y- b.dot[dot_number].y)> (corner.x- b.dot[dot_number].x)* (b.dot[(dot_number+1)%b.dot.length].y- b.dot[dot_number].y) ){
			//接点の計算
			rad = Math.atan2(b.position.y - corner.y + b.velocity.y, -b.position.x + corner.x - b.velocity.x);
			b.contact[b.collisionC+ b.collisionCC].x = corner.x;
			b.contact[b.collisionC+ b.collisionCC].y = corner.y;
			b.contact[b.collisionC+ b.collisionCC].rad = -rad;
			b.contact[b.collisionC+ b.collisionCC].tangent = -rad+ Math.PI/2;
			b.contact[b.collisionC+ b.collisionCC].excess = b.size - Math.sqrt(len);
			b.collisionCC++;
		}
		return;
	}
		
	//ボールが辺１にぶつかるかの判定
	else if(nt%10 == 1){
		var dot_number = (Math.round((rad01 + Math.PI/2)*12/Math.PI) + b.dot.length) % b.dot.length;
		//壁に垂直な向きへの長さが一番大きい点を調べる
		if((b.dot[(dot_number+1)%b.dot.length].x- b.position.x)* Math.cos(rad01+ Math.PI/2)+ (b.dot[(dot_number+1)%b.dot.length].y- b.position.y)* Math.sin(rad01+ Math.PI/2)> (b.dot[(dot_number+23)%b.dot.length].x- b.position.x)* Math.cos(rad01+ Math.PI/2)+ (b.dot[(dot_number+23)%b.dot.length].y- b.position.y) *Math.sin(rad01+ Math.PI/2)){
			while((b.dot[(dot_number+1)%b.dot.length].x- b.position.x)* Math.cos(rad01+ Math.PI/2)+ (b.dot[(dot_number+1)%b.dot.length].y- b.position.y)* Math.sin(rad01+ Math.PI/2)> (b.dot[dot_number].x- b.position.x)* Math.cos(rad01+ Math.PI/2)+ (b.dot[dot_number].y- b.position.y)* Math.sin(rad01+ Math.PI/2)){
				dot_number++;
				if(dot_number >= b.dot.length) dot_number = 0;
			}
		}
		else{
			while((b.dot[(dot_number+23)%b.dot.length].x- b.position.x)* Math.cos(rad01+ Math.PI/2)+ (b.dot[(dot_number+23)%b.dot.length].y- b.position.y)* Math.sin(rad01+ Math.PI/2)> (b.dot[dot_number].x- b.position.x)* Math.cos(rad01+ Math.PI/2)+ (b.dot[dot_number].y- b.position.y)* Math.sin(rad01+ Math.PI/2)){
				dot_number--;
				if(dot_number <= -1) dot_number = 23
			}
		}
		if(Math.cos(rad01)* (b.dot[dot_number].y- corner.y)> Math.sin(rad01)* (b.dot[dot_number].x- corner.x)){
			//接点の計算
			var div = Math.sin(rad01)* (b.dot[dot_number].x- b.position.x)- Math.cos(rad01)* (b.dot[dot_number].y- b.position.y)
			b.contact[b.collisionC+ b.collisionCC].x = ((b.position.y* b.dot[dot_number].x- b.position.x* b.dot[dot_number].y)* Math.cos(rad01)- (corner.y* (corner.x+ Math.cos(rad01))- corner.x* (corner.y+ Math.sin(rad01)))* (b.dot[dot_number].x- b.position.x))/ div;
			b.contact[b.collisionC+ b.collisionCC].y = ((b.position.y* b.dot[dot_number].x- b.position.x* b.dot[dot_number].y)* Math.sin(rad01)- (corner.y* (corner.x+ Math.cos(rad01))- corner.x* (corner.y+ Math.sin(rad01)))* (b.dot[dot_number].y- b.position.y))/ div;
			b.contact[b.collisionC+ b.collisionCC].rad = rad01 + Math.PI/2; 
			b.contact[b.collisionC+ b.collisionCC].tangent = rad01 + Math.PI; 
			b.contact[b.collisionC+ b.collisionCC].excess = Math.cos(rad01)* (b.dot[dot_number].y- b.contact[b.collisionC].y)- Math.sin(rad01)* (b.dot[dot_number].x- b.contact[b.collisionC].x);
			b.collisionCC++;
		}
		return;
	}
		
	//ボールが辺２にぶつかるかの判定
	else if(nt%10 == 2){
		var dot_number = (Math.round((rad02 + Math.PI/2)*12/Math.PI) + b.dot.length) % b.dot.length;
		//壁に垂直な向きへの長さが一番大きい点を調べる
		if((b.dot[(dot_number+1)%b.dot.length].x- b.position.x)* Math.cos(rad02+ Math.PI/2)+ (b.dot[(dot_number+1)%b.dot.length].y- b.position.y)* Math.sin(rad02+ Math.PI/2)> (b.dot[(dot_number+23)%b.dot.length].x- b.position.x)* Math.cos(rad02+ Math.PI/2)+ (b.dot[(dot_number+23)%b.dot.length].y- b.position.y) *Math.sin(rad02+ Math.PI/2)){
			while((b.dot[(dot_number+1)%b.dot.length].x- b.position.x)* Math.cos(rad02+ Math.PI/2)+ (b.dot[(dot_number+1)%b.dot.length].y- b.position.y)* Math.sin(rad02+ Math.PI/2)> (b.dot[dot_number].x- b.position.x)* Math.cos(rad02+ Math.PI/2)+ (b.dot[dot_number].y- b.position.y)* Math.sin(rad02+ Math.PI/2)){
				dot_number++;
				if(dot_number >= b.dot.length) dot_number = 0;
			}
		}
		else{
			while((b.dot[(dot_number+23)%b.dot.length].x- b.position.x)* Math.cos(rad02+ Math.PI/2)+ (b.dot[(dot_number+23)%b.dot.length].y- b.position.y)* Math.sin(rad02+ Math.PI/2)> (b.dot[dot_number].x- b.position.x)* Math.cos(rad02+ Math.PI/2)+ (b.dot[dot_number].y- b.position.y)* Math.sin(rad02+ Math.PI/2)){
				dot_number--;
				if(dot_number <= -1) dot_number = 23
			}
		}
		if(Math.cos(rad02)* (b.dot[dot_number].y- corner.y)> Math.sin(rad02)* (b.dot[(dot_number+b.dot.length)%b.dot.length].x- corner.x)){
			//接点の計算
			var div = Math.sin(rad02)* (b.dot[dot_number].x- b.position.x)- Math.cos(rad02)* (b.dot[(dot_number+b.dot.length)%b.dot.length].y- b.position.y)
			b.contact[b.collisionC+ b.collisionCC].x = ((b.position.y* b.dot[dot_number].x- b.position.x* b.dot[dot_number].y)* Math.cos(rad02)- (corner.y* (corner.x+ Math.cos(rad02))- corner.x* (corner.y+ Math.sin(rad02)))* (b.dot[dot_number].x- b.position.x))/ div;
			b.contact[b.collisionC+ b.collisionCC].y = ((b.position.y* b.dot[dot_number].x- b.position.x* b.dot[dot_number].y)* Math.sin(rad02)- (corner.y* (corner.x+ Math.cos(rad02))- corner.x* (corner.y+ Math.sin(rad02)))* (b.dot[dot_number].y- b.position.y))/ div;
			b.contact[b.collisionC+ b.collisionCC].rad = rad02 + Math.PI/2;
			b.contact[b.collisionC+ b.collisionCC].tangent = rad02 + Math.PI; 
			b.contact[b.collisionC+ b.collisionCC].excess = Math.cos(rad02)* (b.dot[dot_number].y- b.contact[b.collisionC].y)- Math.sin(rad02)* (b.dot[dot_number].x- b.contact[b.collisionC].x);
			b.collisionCC++;
		}
		return;
	}
	
	//それ以外はボールが内側に入っていることになる、ありえない挙動なのでエラーを返すようにする
	else console.log("error 正円が内部に入り込んでいる");
	//if(this.tlx == 512) console.log(b.dot[dot_number].x)
};*/	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	