<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pong Game</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: black;
            color: white;
        }
        canvas {
            border: 2px solid white;
        }
    </style>
</head>
<body>
    <canvas id="pong" width="800" height="400"></canvas>
    <script>
        const canvas = document.getElementById('pong');
        const context = canvas.getContext('2d');

        const paddleWidth = 10, paddleHeight = 100;
        let playerPaddleY = (canvas.height - paddleHeight) / 2;
        let computerPaddleY = (canvas.height - paddleHeight) / 2;
        const ballSize = 10;
        let ballX = canvas.width / 2, ballY = canvas.height / 2;
        let ballSpeedX = 7, ballSpeedY = 4;
        let playerScore = 0, computerScore = 0;

        function draw() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Draw paddles
            context.fillStyle = 'white';
            context.fillRect(0, playerPaddleY, paddleWidth, paddleHeight);
            context.fillRect(canvas.width - paddleWidth, computerPaddleY, paddleWidth, paddleHeight);
            // Draw ball
            context.beginPath();
            context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
            context.fill();
            // Draw score
            context.font = '20px Arial';
            context.fillText(`Player: ${playerScore}`, 50, 30);
            context.fillText(`Computer: ${computerScore}`, canvas.width - 150, 30);
        }

        function update() {
            ballX += ballSpeedX;
            ballY += ballSpeedY;
            // Ball collision with top and bottom
            if (ballY + ballSize >= canvas.height || ballY - ballSize <= 0) {
                ballSpeedY = -ballSpeedY;
            }
            // Ball collision with paddles
            if (ballX <= paddleWidth && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
                ballSpeedX = -ballSpeedX;
            } else if (ballX >= canvas.width - paddleWidth && ballY > computerPaddleY && ballY < computerPaddleY + paddleHeight) {
                ballSpeedX = -ballSpeedX;
            }
            // Scoring
            if (ballX < 0) {
                computerScore++;
                resetBall();
            } else if (ballX > canvas.width) {
                playerScore++;
                resetBall();
            }
            // Computer AI
            if (ballY > computerPaddleY + paddleHeight / 2) {
                computerPaddleY += 2;
            } else {
                computerPaddleY -= 2;
            }
            computerPaddleY = Math.max(Math.min(computerPaddleY, canvas.height - paddleHeight), 0);
        }

        function resetBall() {
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
        }

        function gameLoop() {
            draw();
            update();
            requestAnimationFrame(gameLoop);
        }

        // Player controls
        document.addEventListener('mousemove', function(event) {
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;
            playerPaddleY = Math.max(Math.min(mouseY - paddleHeight / 2, canvas.height - paddleHeight), 0);
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === "ArrowUp") {
                playerPaddleY = Math.max(playerPaddleY - 10, 0);
            } else if (event.key === "ArrowDown") {
                playerPaddleY = Math.min(playerPaddleY + 10, canvas.height - paddleHeight);
            }
        });

        gameLoop();
    </script>
</body>
</html>