var MyStage01 = function(ball, object){
for(var i=0; i<object.length; i++){
	object[i].alive = false;
}
for(var i=1; i<ball.length; i++){
	ball[i].alive = false;
	ball[i].collisionC = 0;
	ball[i].collisionCC = 0;
}
object[0].set(118.0,134.0,783.0,234.0,0.0,0.0,3);
object[1].set(22.0,435.0,793.0,163.0,0.0,0.0,3);
object[2].set(836.0,434.0,137.0,185.0,0.0,0.0,3);
ball[0].set({x:495.0,y:96.0},10.0,{x:0.0,y:0.0},0);
ball[1].set({x:339.0,y:83.0},10.0,{x:0.0,y:0.0},1);
nowStage = 100;
};
