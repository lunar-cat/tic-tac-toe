'use strict';

function IAmakeMove(board, IASymbol) {
    const nodeMoveTree = {};
    Object.defineProperty(nodeMoveTree, 'index', {
        value: 0,
        enumerable: false,
        configurable: true,
        writable: true
    });
    nodeMoveTree.addNode = (node) => {
        nodeMoveTree[nodeMoveTree.index++] = node;
    }
    nodeMoveTree.bestMove = () => {
        const node = Array.from(Object.values(nodeMoveTree)).sort((a, b) => b.value - a.value);
        return node[0];
    }

    for (let colPosition = 0; colPosition < board.length; colPosition++) {
        const boardRow = getRow(colPosition, board);

        for (let rowPosition = 0; rowPosition < boardRow.length; rowPosition++) {
            if (board[colPosition][rowPosition] != 0) continue;
            const boardCol = getColumn(rowPosition, board);
            const moveCoordinates = { x: rowPosition, y: colPosition };
            let totalSetValue = 0;
            let setMoves = [];

            setMoves.push([boardRow, 'row'], [boardCol, 'col']);
            if (moveCoordinates.x != 1 && moveCoordinates.y != 1
                || moveCoordinates.x === 1 && moveCoordinates.y === 1) {
                const boardDiag = getDiagonal(rowPosition, colPosition, board);
                boardDiag.forEach(arr => {
                    setMoves.push([arr, 'diag']);
                });
            }
            setMoves.forEach(set => {
                totalSetValue += checkSetMoves(set, moveCoordinates.x, moveCoordinates.y, IASymbol);
            });
            nodeMoveTree.addNode({ value: totalSetValue.toFixed(2), coordinates: moveCoordinates });
        }
    }
    return nodeMoveTree.bestMove();
}
function getRow(y, board) {
    const r = board[y];
    return r;
}
function getColumn(x, board) {
    const c = [
        board[0][x],
        board[1][x],
        board[2][x],
    ]
    return c;
}
function getDiagonal(x, y, board) {
    if (x != 1) {
        const counterX = (x === 0) ? 1 : -1;
        const counterY = (y === 0) ? 1 : -1;
        const d = [board[y][x], board[y + counterY][counterX + x], board[y + counterY + counterY][counterX + counterX + x]];
        return [d];
    } else {
        const d = [board[0][0], board[1][1], board[2][2]];
        const e = [board[0][2], board[1][1], board[2][0]];
        return [d, e];
    }
}
function checkSetMoves(set, x, y, IASymbol) {
    let valueMove = 0;
    let userSymbol = (IASymbol === 2) ? 1 : 2;
    let position = (set[1] === 'col') ? y : x;

    let testWinOrLose = set[0].slice();
    testWinOrLose[position] = IASymbol;
    if (testWinOrLose.every(value => value === IASymbol)) valueMove += 5; // Revisa si ganamos
    testWinOrLose[position] = userSymbol;
    if (testWinOrLose.every(value => value === userSymbol)) valueMove += 3; // Revisa si perdimos
    if (!set[0].includes(IASymbol) && set[0].includes(userSymbol)) valueMove += 0.4; // Revisa si podemos bloquear a futuro
    if (!set[0].includes(IASymbol)) return valueMove; // Si no hay ningún movimiento nuestro, return;
    if (set[0].includes(userSymbol)) return valueMove; // Si el set en cuestión, tiene un valor enemigo en medio, no nos sirve para ganar ahí po esto quizá deba quitarlo después
    if (position <= 1 && set[0][position + 1] === IASymbol) valueMove += 0.4; // Revisa el siguiente
    if (position >= 1 && set[0][position - 1] === IASymbol) valueMove += 0.4; // Revisa el anterior

    return +valueMove.toFixed(2);
}

function Game() {
    const _board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    const getBoard = () => {
        return _board;
    };
    const makeMove = ({ x, y }, player) => {
        _board[y][x] = player;
        return gameContinue({ x, y }, player);
    };
    const gameContinue = ({ x, y }, player) => {
        let setMoves = [];
        setMoves.push(getRow(y, _board), getColumn(x, _board));
        if (x != 1 && y != 1 || x === 1 && y === 1) {
            const boardDiag = getDiagonal(x, y, _board);
            boardDiag.forEach(arr => setMoves.push(arr));
        }
        if (setMoves.some(set => (set.every(value => value === player)))) return 'Ha ganado!';
        if (_board.some(arr => arr.includes(0))) return 'Se continúa';
        else return 'Empate';
    };
    const restartGame = () => {
        // Limpiamos tablero, llama a actualizar LocalScore
        // Si pierde, el score sería +1, o podríamos también restar -1 de score por perder?
        _board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    };
    const movIsValid = (x, y) => {
        return !_board[y][x];
    }
    return { getBoard, gameContinue, makeMove, restartGame, movIsValid };
}
function Player(name, symbol) {
    symbol = (symbol === "X") ? 1 : 2;
    const playerMove = () => {
        // Acá agregaríamos los datos del eventListener (?
    }
    return { name, symbol, playerMove };
}
function LocalScore() {
    const updateScore = (name, result) => {
        const oldScore = localStorage.getItem(name) ?? 0;
        localStorage.setItem(name, JSON.stringify(+result + +oldScore));
    };
    const getScores = () => {
        const scores = Object.entries(localStorage); // [ ['uwu', "1"], ['awa', "2"] ]
        scores.sort((a, b) => +a - +b);
        return scores;
    };
    return { updateScore, getScores };
}
/* Podríamos incluir la firebase para hacer scores onlines xd y hacer un leaderboard
con login y rachas de wins(? */
let newGame = Game();
let IASymbol = 2;
let setMovesUser = [{ x: 1, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }]; // Empate empezando del medio yo primero [{ x: 1, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }]
let userSymbol = 1;
let counter = 0;

while (true) {
    let continueUser = newGame.makeMove(setMovesUser[counter++], userSymbol);
    console.log(newGame.getBoard(), continueUser);
    if (continueUser != 'Se continúa') break;
    let IAmovement = IAmakeMove(newGame.getBoard(), IASymbol);
    let continueIA = newGame.makeMove(IAmovement.coordinates, IASymbol);
    console.log(newGame.getBoard(), continueIA);
    if (continueIA != 'Se continúa') break;
}

// UI

+function hamburguerMenu() {
    const menuBtn = document.getElementById('menu-mobile');
    const leaderBoard = document.getElementById('leaderboard');
    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('open');
        leaderBoard.classList.toggle('hidden');
    });
}();
+function changeOponent() {
    const oponentImg = document.getElementById('oponent-img');
    const changeBtn = document.getElementById('oponent-img-btn');
    const oponentName = document.getElementById('oponent-name');

    changeBtn.addEventListener('click', function () {
        if (+oponentImg.dataset.op) {
            oponentImg.src = "/style/icons/web-icon/android-black.svg";
            oponentImg.dataset.op = "0";
            oponentName.textContent = "IA";
        } else {
            oponentImg.src = "/style/icons/web-icon/face-black.svg";
            oponentImg.dataset.op = "1";
            oponentName.textContent = "JUGADOR 2";
        }
    });
}();
+function changeName() {
    const saveChangeName = document.getElementById('change-name-btn');
    const nameInput = document.getElementById('change-name-input');
    const closeDialog = document.getElementsByClassName('icon-dialog');
    const playerName = document.getElementById('player-name');
    const changeBtn = document.getElementById('user-img-btn');
    const dialogHTML = document.getElementById('change-name-dialog');
    dialogHTML.addEventListener('keypress', function (event) {
        if (event.key === "Enter") saveChangeName.click();
    });
    saveChangeName.addEventListener('click', function () {
        const newName = nameInput.value.slice(0, 20);
        playerName.textContent = newName;
        playerName.dataset.nameUser = newName;
    });
    changeBtn.addEventListener('click', function () {
        dialogHTML.classList.remove('hidden');
        nameInput.value = '';
        dialogHTML.showModal();
    });
    Array.from(closeDialog).forEach(btn => btn.addEventListener('click', function () {
        dialogHTML.classList.add('hidden');
        dialogHTML.close()
    }));
}();
+function startGame() {
    const startBtn = document.getElementById('start-btn');
    const gameBodyContainer = document.getElementById('game-body-container');
    const gameStartContainer = document.getElementById('game-start-container');
    const previousPlayerName = document.getElementById('player-name');
    const gridUserName = document.getElementById('grid-user-name');

    startBtn.addEventListener('click', function () {
        gameBodyContainer.classList.add('hidden');
        gameStartContainer.classList.remove('hidden');
        gridUserName.textContent = previousPlayerName.dataset.nameUser;
    });
    
}();
+function gridGameClickVisual() { /* Al sacar el evento dentro del eventListener en sí mismo, luego debemos sacar este IIFE y ponerla dentro de otra, que se llame en cada new game */
    const gridSpans = document.getElementsByClassName('grid-cell');
    const gridCellClasses = {
        "-1": "clicked-cell-oponent",
        "1": "clicked-cell-user",
        "_index": -1,
        getClass(){
            const currentClass = this._index *= -1;
            return this[currentClass];
        }
    }
    Array.from(gridSpans).forEach(span => {
        span.addEventListener('click', function handleClick(event) {
            const gridCellPosition = event.target.dataset.grid; // esta es la posición, el dato del data-grid en los span
            const currentClass = gridCellClasses.getClass();
            span.classList.add(currentClass);
            span.removeEventListener('click', handleClick);
        });
    });
}();


