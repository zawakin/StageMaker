//stage
var p = new Point();
var v = new Point();

var stage00 = function(ball, object){
	for(var i=0; i<object.length; i++){
		object[i].alive = false;
	}
	for(var i=1; i<ball.length; i++){
		ball[i].alive = false;
		ball[i].collisionC = 0;
		ball[i].collisionCC = 0;
	}

	object[00].set(   0, 497, 800, 316, 0, 0, 3);
	nowStage = 0;
};

var stage01 = function(ball, object){
	for(var i=0; i<object.length; i++){
		object[i].alive = false;
	}
	for(var i=1; i<ball.length; i++){
		ball[i].alive = false;
		ball[i].collisionC = 0;
		ball[i].collisionCC = 0;
	}
	object[0].set(229.0,146.0,97.0,78.0,0.0,0,3);
object[1].set(464.0,202.0,70.0,110.0,0.0,0,3);
object[2].set(593.0,320.0,56.0,70.0,0.0,0,3);
	// object[00].set(   0, 497, 800, 316, 0, 0, 3);
	// object[01].set(-300,-300, 300, 812, 0, 0, 3);
	// object[02].set( 800,-300, 300, 812, 0, 0, 3);
	// object[03].set( 400,   0,  50, 450, 0, 0, 3);
	// object[01].set(-300,   0, 320, 497, 0, 0, 3);
	// object[02].set( 780,   0, 300, 437, 0, 0, 3);
	// object[04].set( 780, 437,  20,  60, 0, 0, 3);
	// //object[04].set( 715, 432,  65,  65, 0, 0, 2);
	// //object[05].set( 450, 230,  65,  65, 0, 0, 3);
	// object[06].set( 600, 160, 150,  40, 0, 0, 3);
	// object[07].set( 600,   0,  25, 160, 0, 0, 1);
	// object[08].set( 720, 200,  30,  50, 0, 0, 3);
	// object[09].set( 720, 250,  60,  30, 0, 0, 3);
	// //object[10].set( 750, 160,  30,  15, 0, 0, 1);
	// object[11].set( 755, 240,  20,  10, 0, 0, 2);
	//object[12].set( 755, 240,  20,  10, 0, 0, 2);
	//object[13].set( 755, 240,  20,  10, 0, 0, 2);
	/*object[3].set(  40, 463, 100,  10, -Math.PI / 15, 0, 1);
	object[4].set( 100, 228,  80,  80, Math.PI / 8,  0, 2);
	object[5].set( 280, 330, 450,  75, 0,     0, 2);
	object[7].set(  30, 330, 220,  75, 0,     0, 2);*/
	//object[8].set( 470, 330,  60,  100,  0., 0, 1);
	//aobject[6].set( 360,  40,  30, 250, 0.1,          0, 3);
	/*object[3].set(   0, 130,  74,  75, 0,  0,  2);
	object[5].set( 272, 130, 170,  75, 0.0,            0, 3);
	object[4].set(  74, 130, 170,  75, 0.0,            0, 3);
	object[6].set( 442, 130,  30,  367,  0,  0,  3);*/
	//object[8].set( 470, 449,  50,  50, -0.75, 0, 1);
	nowStage = 1;
};

var stage02 = function(ball, object){
	for(var i=0; i<object.length; i++){
		object[i].alive = false;
	}
	for(var i=1; i<ball.length; i++){
		ball[i].alive = false;
		ball[i].collisionC = 0;
		ball[i].collisionCC = 0;
	}
	//チュートリアル用ステージ
	p.x = 100, p.y = 50;
	//test
	//p.x = 700, p.y = 400;
	ball[0].set(p, ball[0].size, v, 0);
	p.x = 285, p.y = 120;
	ball[1].set(p, 43, v, 1);
	p.x = 650, p.y = 135;
	ball[2].set(p, 15, v, 2);
	p.x = 700, p.y = 135;
	ball[3].set(p, 15, v, 1);
	p.x = 750, p.y = 135;
	ball[4].set(p, 15, v, 2);
	p.x = 240, p.y = 480;
	ball[5].set(p, 22, v, 1);
	p.x = 220, p.y = 420;
	ball[6].set(p, 22, v, 2);

	object[00].set(   0, 497, 800, 316, 0, 0, 3);
	object[01].set(-300,-300, 300, 812, 0, 0, 3);
	object[02].set( 800,-300, 300, 812, 0, 0, 3);
	object[03].set(   0, 140, 220,  10, 0, 0, 3);
	object[04].set(   0, 150, 760,  30, 0, 0, 3);
	object[05].set( 200,   0, 150,  80, 0, 0, 3);
	object[06].set( 350,   0,  40, 100, 0, 0, 3);
	object[07].set( 600,   0, 200, 110, 0, 0, 3);
	object[08].set( 280, 467, 200,  30, 0, 0, 3);
	object[09].set( 280, 400, 200,  67, 0, 0, 2);
	object[10].set( 280, 310, 200,  90, 0, 0, 3);
	object[11].set( 180, 350,  20, 147, 0, 0, 3);
	object[12].set( 680, 447, 120,  50, 0, 0, 3);
	object[13].set( 720, 397,  80,  50, 0, 0, 3);
	object[14].set( 760, 347,  40,  50, 0, 0, 3);
	object[15].set( 280, 280, 420,  30, 0, 0, 3);
	object[16].set( 180, 180,  20, 120, 0, 0, 3);
	object[17].set( 200, 280,  80,  20, 0, 0, 0);
	f1 = false;
	nowStage = 2;
};

var stage03 = function(ball, object){
	for(var i=0; i<object.length; i++){
		object[i].alive = false;
	}
	for(var i=1; i<ball.length; i++){
		ball[i].alive = false;
		ball[i].collisionC = 0;
		ball[i].collisionCC = 0;
	}


	object[00].set(   0, 497, 800, 316, 0, 0, 3);
	object[01].set(-300,-300, 300, 812, 0, 0, 3);
	object[02].set( 800,-300, 300, 812, 0, 0, 3);
	object[03].set( 200, 350, 200, 30, 0,0, 3);
	object[04].set( 400, 350, 200, 30, 0,0, 2);
	object[05].set( 600, 350, 200, 30, 0,0, 1);
	nowStage = 3;
};

var stage04 = function(ball, object){
	for(var i=0; i<object.length; i++){
		object[i].alive = false;
	}
	for(var i=1; i<ball.length; i++){
		ball[i].alive = false;
		ball[i].collisionC = 0;
		ball[i].collisionCC = 0;
	}

	object[00].set(   0, 497, 800, 316, 0, 0, 3);
	object[01].set(-300,-300, 300, 812, 0, 0, 3);
	object[02].set( 800,-300, 300, 812, 0, 0, 3);
	object[03].set( 200, 350, 600,  30, 0, 0, 3);
	object[04].set( 400, 485, 100,  30, 0, 0, 3);
	nowStage = 4;
};
