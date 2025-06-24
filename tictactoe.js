const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];
    
    const getBoard = () => [...board];
    const setMark = (index, mark) => {
        if (board[index] === "") board[index] = mark;
    };
    const reset = () => board.fill("");

    return { getBoard, setMark, reset };
})();

const createPlayer = (name, mark) => {
    return { name, mark };
}

const GameController = (function () {
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("player 2", "O");
    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const playRound = (index) => {
        if (gameOver || Gameboard.getBoard()[index] != "") return;
        Gameboard.setMark(index, currentPlayer.mark);
        if (checkWin(currentPlayer.mark)) {
            alert(currentPlayer.name + ' wins!');
            gameOver = true;
            return;
        }
        if (!Gameboard.getBoard().includes("")) {
            alert("It's a tie!");
            gameOver = true;
            return;
        }
        switchPlayer();
        render();
    };

    const checkWin = (mark) => {
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8], 
            [0,3,6], [1,4,7], [2,5,8], 
            [0,4,8], [2,4,6]
        ]
        return winPatterns.some(pattern => pattern.every(index => Gameboard.getBoard()[index] === mark));
    };

    const render = () => {
        const container = document.getElementById("gameboard");
        container.innerHTML = "";
        Gameboard.getBoard().forEach((mark, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = mark;
            cell.addEventListener("click", () => playRound(index));
            container.appendChild(cell);
        });
    };

    const start = () => {
        Gameboard.reset();
        gameOver = false;
        currentPlayer = player1;
        render();
    };

    return { start };
})();

window.addEventListener("DOMContentLoaded", () => {
  GameController.start();
});
