'use strict';

function IAmakeMove(board, IASymbol) {
    const nodeMoveTree = {};
    Object.defineProperty(nodeMoveTree, 'index', {
        value: 0,
        enumerable: false,
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
            const moveCoordinates = {x: rowPosition, y: colPosition};
            let setMoves = [];
            let totalSetValue = 0;
            const boardCol = getColumn(rowPosition, board);
            setMoves.push(boardRow, boardCol);
            if (moveCoordinates.x != 1) {   
                const boardDiag = getDiagonal(rowPosition, board);
                setMoves.push(boardDiag);
            }
            setMoves.forEach(set => {
                totalSetValue += checkSetMoves(set, moveCoordinates.x, IASymbol);
            });
            nodeMoveTree.addNode({value: totalSetValue, coordinates: moveCoordinates});
        }
    }
    return nodeMoveTree.bestMove();
}
function getRow(y, board){
    const r = board[y];
    return r;
}
function getColumn(x, board){
    const c = [
        board[0][x],
        board[1][x],
        board[2][x],
    ]
    return c;
}
function getDiagonal(x, board){
    const counter = (x) ? -1 : 1; // 0 es falso, 2 es true
    const d = [board[0][x], 
        board[1][counter + x], 
        board[2][(counter * 2) + x]]
    return d;
}
function checkSetMoves(set, x, IASymbol){
    let valueMove = 0;
    if (set.every(value => value === IASymbol)) valueMove += 1; // Revisa si ganamos
    if (!set.includes(IASymbol)) return valueMove; // Si no hay ningún movimiento nuestro, return;
    if (x <= 1 && set[x + 1] === IASymbol) valueMove += 0.2; // Revisa el siguiente
    if (x >= 1 && set[x - 1] === IASymbol) valueMove += 0.2; // Revisa el anterior
    return valueMove;
}

function Game() {
    const _board = [
        [1,0,0],
        [0,2,2],
        [2,0,1]
    ];
    const getBoard = () => {
        return _board;
    };
    const makeMove = ({x, y}, player) => {
        _board[x][y] = player;
    };
    const gameStatus = () => {
        // Revisa si alguien hace 3 en línea luego de makeMove
        // Return true o false
    };
    const restartGame = () => {
        // Limpiamos tablero, llama a actualizar LocalScore
        // Si pierde, el score sería +1, o podríamos también restar -1 de score por perder?
        _board = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];
    };
    return {gameStatus, checkMove, makeMove, restartGame};
}
function Player(name, symbol){
    symbol = (symbol === "X") ? 1 : 2;
    const playerMove = () => {
        // Acá agregaríamos los datos del eventListener (?
    }
    return {name, symbol, playerMove};
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
    return {updateScore, getScores};
}
/* Podríamos incluir la firebase para hacer scores onlines xd y hacer un leaderboard
con login y rachas de wins(? */