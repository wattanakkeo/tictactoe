function GameBoard() {
    let board = [];
    const ROW = 3;
    const COLUMN = 3;

    for (let i = 0; i < ROW; i++) {
        board[i] = [];
        for (let j = 0; j < COLUMN; j++) {
            board[i].push(Cell());
        } 
    }

    const illegalMove = (row, column) => {
        //Prevents a player from selecting an aready selected cell
        const availableCell = board[row][column];
        if (availableCell.getCell() !== 0) {
            console.log("That cell is not available");
            return true;
        }
        return false;
    }

    const full = () => {
        const flat = board.flat();
        const availableCells = flat.filter(index => index.getCell() === 0);

        if (!availableCells.length) {
            console.log("full");
            return true;
        }
        return false;
    }

    const selectCell = (row, column, player) => {
        //find the cell at row and column, then change it to the players token
        return board[row][column].markCell(player.token);
    }

    const getBoard = () => {
        const currentBoard = board.map((row) => row.map(cells => cells.getCell()));
        return currentBoard;
    }

    const printBoard = () => {
        const currentBoard = board.map((row) => row.map(cells => cells.getCell()));
        console.log(currentBoard);
    }

    return {full, illegalMove, selectCell, getBoard, printBoard}
}

//Used to mark each cell in TicTacToe with the respective players token
function Cell() {
    let identifier = 0;

    const markCell = (token) => {
        identifier = token;
    }

    const getCell = () => identifier;

    return {markCell, getCell}
}

function CreatePlayer(name, token) {
    let score = 0;
    const getScore = () => score;
    const updateScore = () => score++;

   return {name, token, getScore, updateScore}
}

function GameController() {
    const player1 = CreatePlayer("p1", "X");
    const player2 = CreatePlayer("p2", "O");

    let currentPlayer = player1;

    const switchPlayer = () => {
        console.log(currentPlayer.name + " turn");
        return currentPlayer === player1 ? player2 : player1;
    }

    const board = GameBoard();

    //A snapshot of the live board, so that the UI can be implemented
    const currentBoard = () => board.getBoard();

    //Returns the players token after they make a movem so it can be displayed onto DOM
    const select = (row, column) => {
        //When a player makes an illegal move, it won't skip their turn
        const illegalMove = board.illegalMove(row, column);

        if (!illegalMove) {
            board.selectCell(row, column, currentPlayer);
            previousPlayer = currentPlayer;
            currentPlayer = switchPlayer(); 
        }
        board.printBoard();
        board.full();
        return previousPlayer.token;
    }

    return {currentBoard, select}
}

function UserInterface() {
    const board = document.querySelector(".board");

    const initializeBoard = () => {
        const ROW = 3;
        const COLUMN = 3;
        let idNum = 0;

        for (let i = 0; i < ROW; i++) {
            for (let j = 0; j < COLUMN; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.id = idNum++;
                board.appendChild(cell);
            }
        }
    }

    const clickCell = () => {
        board.addEventListener("click", (event) => {
            const cell = event.target;
            if (!cell.classList.contains("cell")) return;

            const id = Number(cell.id);
            const row = Math.floor(id / 3);
            const col = id % 3;

            const token = game.select(row, col); // should return "X" or "O" (or null/false if invalid)
            if (!token) return;

            cell.textContent = token; // updates screen immediately
            });
    }

    return {initializeBoard, clickCell}
}

const UI = UserInterface();
UI.initializeBoard();
UI.clickCell();

const game = GameController();

const first = game.select(0, 0);
const ui = UserInterface();
console.log("here");
