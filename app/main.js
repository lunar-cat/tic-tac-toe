'use strict';

function IAmakeMove() {
    let bestMove, bestPosition;
    // Mejor movimiento, posición;
    // for posición en =>
        // Valor actual del movimiento en = 0;
        // Posición actual;
        //Filas/Columnas/Diagonal;
            // Si hay 1 jugada adyacente ya hecha, sumar 0.2 al mov;
            // Si hay 2 significa que gana
                // suma 1
                // return posición jugada{x: x, y: y}
            // Si hay 2 adyacentes enemigos, debe bloquear
                // suma 0.8
                // return posición jugada{x: x, y: y}
        // Si el valor de movimiento > mejor movimiento
            // mejor movimiento = valor actual
            // posición mejor mov = posición actual
    // return {mejor movimiento, posición}
}
function Game() {
    const _board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    const checkMove = ({x, y}) => {
        return !_board[x][y];
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