var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var ball = {
	x: canvas.width/2, y: canvas.height/2, 

	dx: -5, dy: -3,

	radius: 10,
};

var paddle = {
	x: 0, y: canvas.height - 20,

	width: 74, height: 10,

	dx: 10,
};

window.onkeydown = function(e){
	if (e.keyCode === 39)
		paddle.isRightHeld = true;
	else if (e.keyCode === 37)
		paddle.isLeftHeld = true;
};

window.onkeyup = function(e){
	if (e.keyCode === 39)
		paddle.isRightHeld = false;
	else if (e.keyCode === 37)
		paddle.isLeftHeld = false;
};

function animate(){
	context.clearRect(0, 0, canvas.width, canvas.height); //(x,y,n x m)	


	ball.x += ball.dx;
	ball.y += ball.dy;

	if(paddle.isRightHeld && paddle.x < canvas.width - paddle.width){
		paddle.x += paddle.dx;
	}
	if(paddle.isLeftHeld && paddle.x > 0){
		paddle.x -= paddle.dx;
	}

	if(ball.x < ball.radius || ball.x > canvas.width - ball.radius){
		ball.dx = -ball.dx;
	}

	if(ball.y < ball.radius){
		ball.dy = -ball.dy;
	}

	if(ball.y > paddle.y - ball.radius && (ball.x > paddle.x && ball.x < paddle.x + paddle.width)){
		ball.y = paddle.y - ball.radius;
		ball.dy = -ball.dy;
	}


	context.beginPath();
	context.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, true);
	context.closePath();

	context.fill();

	context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

	window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);