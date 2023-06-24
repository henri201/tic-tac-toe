//game logic

function resetGameStatus() {
    activePlayer = 0;
    currentRound = 0;
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>';
    gameOverElement.style.display = 'none';
    
    let gameBoardIndex = 0;
    for (let i=0; i < 3; i++){
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            const gameBoard
            GameBoardElement.children[gameBoardIndex].textContent = '';
            gameBoardIndex++;
        }
    }

}

function startNewGame () {     // dont show the board if there arent valid names
    if (players[0].name === '' || players[1].name === '') {
        alert("please set the player names for both players!");
        return;
    }

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {

    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col -1;  //rows/col on board start from '1'
    const selectedRow = selectedField.dataset.row -1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert('please select and empty field!')
        return;
    }
    event.target.textContent = players[activePlayer].symbol;  //where the click occured, player[0]
    event.target.classList.add('disabled');


    gameData[selectedRow][selectedColumn] = activePlayer + 1; // players are 1 and 2 , 0 is for none  
    const winnerId = checkForGameOver();
    if (winnerId !== 0) {
        endGame(winnerId);
    }

    currentRound ++;
    switchPlayer();
}

function checkForGameOver() {
    for (let i=0; i < 3; i++) {
        //chekcing the rows for equality
        if ( 
            gameData[i][0] > 0 && 
            gameData[i][0] === gameData[i][1] && 
            gameData[i][1] === gameData[i][2]
        ) {
            return gameData[i][0];
        }
    }

    for (let i=0; i < 3; i++) {
        //chekcing the columns for equality
        if ( 
            gameData[0][i] > 0 && 
            gameData[0][i] === gameData[1][i] && 
            gameData[0][i] === gameData[2][i]
        ) {
            return gameData[0][i];
        }
    }
    //diagonal : top left to bottom right
    if (
        gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0];
    }

        // bottom left to top right
    if (
        gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[1][1] === gameData[0][2]
    ) {
        return gameData[2][0];
    }

    if (currentRound === 9) {
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    gameOverElement.style.display = 'block';
    //when draw happens
    if (winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOverElement.firstElementChild.textContent = `it's a draw !`
    }
}