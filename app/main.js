'use strict';

function IAmakeMove() {
    let bestMoveValue, bestMovePosition;
    // Acá llamaríamos a getBoard() para tener el estado del tablero
    // Haríamos un nuevo tablero, pero con los valores en posición
    // Calcularíamos el posible enemigo, y el futuro nuestro
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
function valueRow(x, y, player){
    // const array = getBoard[x];
    // return array;

}
function valueColumn(x, y, player){
    // const array = [ getBoard[0][y], getBoard[1][y], getBoard[2][y] ]
    // return array;
}
function valueDiagonal(x, y, player){
    // contador = (y) ? -1 : 1; 0 es falso, 2 es true
    // const array = [ getBoard[0][y], 
    //              getBoard[1][contador + y], 
    //              getBoard[2][(contador * 2) + y] ]
    // return array;
}
function checkArray(array, x, y, player){
    // valueMove = 0;
    // revisar si ganamos getBoard[x].every(value => value === player);
        // si es true, valueRow + 1; return;
    // revisar si no hay ningún valor, getBoard[x].includes(player);
        // si no encuentra ninguna jugada nuestra, devuelve false
        // return valueRow = 0;
    // Si no ganamos, revisar manualmente
    // si la posición [y] es 0 o 1, checkNext(y + 1)
        // Si el checkNext es del valor ${player}, valueRow + 0.2
    // si la posición [y] es 2 o 1, checkPrevious(y - 1)
        // Si el checkPrevious es del valor ${player}, valueRow + 0.2
    // return valueRow;
}
/* Según veo, repetimos el mismo código en cada array
mejor hacemos 3 funciones que devuelvan un array de la row, column
y si corresponde, del diagonal
Y luego a esa array, se le aplica el mismo código, de ver  si ganamos
Si no hay ningún valor, si el enemigo tiene, etc */


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