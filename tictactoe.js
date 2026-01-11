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
        availableCell = board[row][column];
        if (availableCell.getCell() !== 0) {
            console.log("That cell is not available");
            return true;
        }
        return false;
    }

    const full = () => {
        flat = board.flat();
        availableCells = flat.filter(index => index.getCell() === 0);

        if (!availableCells.length) {
            console.log("full");
            return true;
        }
        return false;
    }

    const selectCell = (row, column, player) => {
        //const full = board.map(row => map.filter())

        //find the cell at row and column, then change it to the players token
        return availableCell.markCell(player.token);
    }

    const printBoard = () => {
        const currentBoard = board.map((row) => row.map(cells => cells.getCell()));
        console.log(currentBoard);
    }

    return {full, illegalMove, selectCell, printBoard}
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
    player1 = CreatePlayer("p1", "X");
    player2 = CreatePlayer("p2", "O");

    currentPlayer = player1;

    const switchPlayer = () => {
        console.log(currentPlayer.name + " turn");
        return currentPlayer === player1 ? player2 : player1;
    }

    const board = GameBoard();
    const select = (row, column) => {
        //When a player makes an illegal move, it won't skip their turn
        illegalMove = board.illegalMove(row, column);

        if (!illegalMove) {
            board.selectCell(row, column, currentPlayer);
            currentPlayer = switchPlayer(); 
        }
        board.printBoard();
        board.full();
    }

    return {select, switchPlayer}
}

const game = GameController();
game.select(0, 0);
game.select(0, 1);
game.select(0, 2);

game.select(1, 0);
game.select(1, 1);
game.select(1, 2);

game.select(2, 0);
game.select(2, 1);
game.select(2, 2);