let currentPlayer = "X";
let gameActive = true;
let gameMode = "human"; // "human" or "ai"
const cells = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9"];

const winningCombinations = [
    ["b1", "b2", "b3"],
    ["b4", "b5", "b6"],
    ["b7", "b8", "b9"],
    ["b1", "b4", "b7"],
    ["b2", "b5", "b8"],
    ["b3", "b6", "b9"],
    ["b1", "b5", "b9"],
    ["b3", "b5", "b7"]
];

function startGame(mode) {
    gameMode = mode;
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("result").innerText = "";
    cells.forEach(cell => document.getElementById(cell).value = "");
}

function playerMove(cellId) {
    if (!gameActive || document.getElementById(cellId).value) {
        return;
    }

    document.getElementById(cellId).value = currentPlayer;
    if (checkWin()) {
        document.getElementById("result").innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (isBoardFull()) {
        document.getElementById("result").innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (gameMode === "ai" && currentPlayer === "O") {
        aiMove();
    }
}

function aiMove() {
    let availableCells = cells.filter(cell => !document.getElementById(cell).value);
    if (availableCells.length === 0) {
        return;
    }
    let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    playerMove(randomCell);
}

function checkWin() {
    return winningCombinations.some(combination => 
        combination.every(cell => document.getElementById(cell).value === currentPlayer)
    );
}

function isBoardFull() {
    return cells.every(cell => document.getElementById(cell).value);
}
