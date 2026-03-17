if (ballX > canvas.width) {
    if (ballY < paddleY) {
        player2Score++;
    } else {
        player1Score++;
    }
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}
