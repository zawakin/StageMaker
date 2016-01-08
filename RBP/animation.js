var animation = function(){
	//壁の描画
	for(i = 0;i <= OBJECT_MAX_COUNT; i++){
		if(object[i].alive){
			switch (object[i].color){
			case 0:
				object[i].draw();
				ctx.fillStyle = PLAYER_COLOR;
				ctx.fill();
				break;
			case 1:
				object[i].draw();
				ctx.fillStyle = BALL_COLOR_01;
				ctx.fill();
				break;
			case 2:
				object[i].draw();
				ctx.fillStyle = BALL_COLOR_02;
				ctx.fill();
				break;
			default:
				object[i].draw();
				ctx.fillStyle = WALL_COLOR;
				ctx.fill();
				break;
			}
		}
	};

	//動体の描画-------------------------------------------------

	//自機の描画
	ctx.beginPath();
	ctx.arc(ball[0].position.x, ball[0].position.y, ball[0].size, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fillStyle = PLAYER_COLOR;
	ctx.fill();

	//他機の描画

	//青丸の描画
	ctx.beginPath();
	for(i = 1; i < BALL_MAX_COUNT; i++){
			if(ball[i].alive && ball[i].color ===1){
				ctx.arc(ball[i].position.x, ball[i].position.y, ball[i].size, 0, Math.PI * 2, true);
				ctx.closePath();
			}
		}
	ctx.fillStyle = BALL_COLOR_01;
	ctx.fill();

	//赤丸の描画
	ctx.beginPath();
	for(i = 1; i < BALL_MAX_COUNT; i++){
			if(ball[i].alive && ball[i].color === 2){
				ctx.arc(ball[i].position.x, ball[i].position.y, ball[i].size, 0, Math.PI * 2, true);
				ctx.closePath();
			}
		}
	ctx.fillStyle = BALL_COLOR_02;
	ctx.fill();

	//マウスの現在地の描画
	var mx = ball[0].position.x + vector.x;
	var my = ball[0].position.y - vector.y;

	ctx.beginPath();
	ctx.moveTo(mx, my - 15);
	ctx.lineTo(mx + 15, my);
	ctx.lineTo(mx, my + 15);
	ctx.lineTo(mx - 15, my);
	ctx.closePath();
	ctx.arc(mx, my, 10, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.arc(mx, my, 4, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fillStyle = PLAYER_COLOR;
	ctx.fill();
 
	//点線の描画
	if(lineLF && (ball[0].size + 19 < length)){
 		DOTTED_LINE_COLOR = BALL_COLOR_01;
			ball[0].strokeDottedLine();
		}

	if(lineRF && (ball[0].size + 19 < length)){
 		DOTTED_LINE_COLOR = BALL_COLOR_02;
			ball[0].strokeDottedLine();
		}

	if(pauseF){
			ctx.beginPath();
			ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2, true);
			ctx.fillStyle = "rgba(  0,   0, 000, 0.5)";
			ctx.fill();
			}

	if(pauseF){
			ctx.fillStyle = TEXT_COLOR_RED;
			ctx.font = "60px 'MSゴシック'"
			ctx.fillText("PAUSE", screenCanvas.width / 2 - 94, screenCanvas.height / 3);
		}

}