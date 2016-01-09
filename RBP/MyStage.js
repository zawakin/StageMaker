var MyStage01 = function(ball, object){
for(var i=0; i<object.length; i++){
	object[i].alive = false;
}
for(var i=1; i<ball.length; i++){
	ball[i].alive = false;
	ball[i].collisionC = 0;
	ball[i].collisionCC = 0;
}
object[0].set(0.0,697.0,1000.0,316.0,0.0,0.0,3);
object[1].set(-297.0,-300.0,300.0,1000.0,0.0,0.0,3);
object[2].set(997.0,-300.0,300.0,1000.0,0.0,0.0,3);
object[3].set(256.0,170.0,160.0,132.0,0.0,0.0,3);
nowStage = 100;
};
