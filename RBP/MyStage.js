var MyStage01 = function(ball, object){
for(var i=0; i<object.length; i++){
	object[i].alive = false;
}
for(var i=1; i<ball.length; i++){
	ball[i].alive = false;
	ball[i].collisionC = 0;
	ball[i].collisionCC = 0;
}
object[0].set(0.0,497.0,800.0,316.0,0.0,0.0,3);
object[1].set(-300.0,-300.0,300.0,812.0,0.0,0.0,3);
object[2].set(800.0,-300.0,300.0,812.0,0.0,0.0,3);
object[3].set(226.0,156.0,150.0,78.0,0.1,0.0,3);
object[4].set(431.0,254.0,60.0,84.0,0.1,0.0,3);
nowStage = 100;
};
