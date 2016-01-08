var MyStage01 = function(ball, object){
for(var i=0; i<object.length; i++){
	object[i].alive = false;
}
for(var i=1; i<ball.length; i++){
	ball[i].alive = false;
	ball[i].collisionC = 0;
	ball[i].collisionCC = 0;
}
object[0].set(78.0,253.0,198.0,85.0,0.0,0.0,3);
object[1].set(390.0,377.0,284.0,143.0,0.0,0.0,3);
object[2].set(20.0,607.0,957.0,55.0,0.0,0.0,3);
object[3].set(188.0,439.0,137.0,162.0,0.0,0.0,3);
nowStage = 100;
};
