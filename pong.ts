let player1Score = 0;
let player2Score = 0;

function updateScore(player) {
    if (player === 1) {
        player1Score++;
    } else if (player === 2) {
        player2Score++;
    }
    checkForWinner();  
}

function checkForWinner() {
    if (player1Score >= 6) {
        displayWinner("Player 1" );
    } else if (player2Score >= 6) {
        displayWinner("Player 2" );
    }
}

function displayWinner(winner) {
    console.log(winner + " wins the game!");
    // Logic to stop the game can go here
    // Example: clearInterval(gameInterval); // if using setInterval
}