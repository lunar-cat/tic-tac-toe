'use strict';
let newGame = Game();
let userScore = LocalScore();
loadScores();
// UI

+function darkMode() {
    const root = document.documentElement;
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const endGameDialogBtnYes = document.getElementById('no-newGame-btn');
    const endGameDialogBtnNo = document.getElementById('yes-newGame-btn');

    const changeNameDialogBtnYes = document.getElementById('change-name-btn');
    const changeNameDialogBtnNo = document.getElementById('change-name-btn-no');

    const startGamePadIcon = document.getElementById('start-icon');
    const darkModeIcon = document.getElementById('dark-mode-img');

    const documentThemeColor = document.querySelector('meta[name="theme-color"]');
    const lightModeSet = {
        backMain: 'rgb(70, 142, 145)',
        backSecond: 'white',
        mainColor: 'white',
        secondColor: 'rgb(70, 142, 145)',
        secondContrastColor: '#376e70',
    };
    const darkModeSet = {
        backMain: 'black',
        backSecond: 'rgb(70, 142, 145)',
        mainColor: 'white',
        secondColor: 'white',
        secondContrastColor: 'white',
    }
    darkModeBtn.addEventListener('click', function () {
        if (darkModeBtn.dataset.color === "0") {
            root.style.setProperty('--background-main-color', darkModeSet.backMain);
            root.style.setProperty('--background-secondary-color', darkModeSet.backSecond);
            root.style.setProperty('--main-color', darkModeSet.mainColor);
            root.style.setProperty('--secondary-color', darkModeSet.secondColor);
            root.style.setProperty('--secondary-contrast-color', darkModeSet.secondContrastColor);

            endGameDialogBtnYes.src = 'style/icons/web-icon/close-white.svg';
            endGameDialogBtnNo.src = 'style/icons/web-icon/check-white.svg';
            startGamePadIcon.src = 'style/icons/web-icon/gamepad-white.svg';
            darkModeIcon.src = 'style/icons/web-icon/dark-mode-white.svg';
            changeNameDialogBtnYes.src = 'style/icons/web-icon/check-white.svg';
            changeNameDialogBtnNo.src = 'style/icons/web-icon/close-white.svg';

            documentThemeColor.setAttribute('content', darkModeSet.backMain);
            darkModeBtn.dataset.color = "1";
        } else {
            root.style.setProperty('--background-main-color', lightModeSet.backMain);
            root.style.setProperty('--background-secondary-color', lightModeSet.backSecond);
            root.style.setProperty('--main-color', lightModeSet.mainColor);
            root.style.setProperty('--secondary-color', lightModeSet.secondColor);
            root.style.setProperty('--secondary-contrast-color', lightModeSet.secondContrastColor);

            endGameDialogBtnYes.src = 'style/icons/web-icon/close-black.svg';
            endGameDialogBtnNo.src = 'style/icons/web-icon/check-black.svg';
            startGamePadIcon.src = 'style/icons/web-icon/gamepad-black.svg';
            darkModeIcon.src = 'style/icons/web-icon/dark-mode.svg';
            changeNameDialogBtnYes.src = 'style/icons/web-icon/check-black.svg';
            changeNameDialogBtnNo.src = 'style/icons/web-icon/close-black.svg';

            documentThemeColor.setAttribute('content', lightModeSet.backMain);
            darkModeBtn.dataset.color = "0";
        }

    });
}();
+function hamburguerMenu() {
    const menuBtn = document.getElementById('menu-mobile');
    const leaderBoard = document.getElementById('leaderboard');
    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('open');
        leaderBoard.classList.toggle('hidden-opa');
        leaderBoard.classList.toggle('leader-active');
        leaderBoard.classList.toggle('leader-inactive');

    });
}();
+function changeOponent() {
    const oponentImg = document.getElementById('oponent-img');
    const changeBtn = document.getElementById('oponent-img-btn');
    const oponentName = document.getElementById('oponent-name');

    changeBtn.addEventListener('click', function () {
        switch (+oponentImg.dataset.op) {
            case 0:
                oponentImg.dataset.op = "1";
                oponentName.textContent = "IA HARD";
                break;
            case 1:
                oponentImg.src = "style/icons/web-icon/face-black.svg";
                oponentImg.dataset.op = "2";
                oponentName.textContent = "JUGADOR 2";
                break;
            case 2:
                oponentImg.src = "style/icons/web-icon/android-black.svg";
                oponentImg.dataset.op = "0";
                oponentName.textContent = "IA EASY";
                break;
        }
    });
}();
+function changeName() {
    const saveChangeName = document.getElementById('change-name-btn');
    const nameInput = document.getElementById('change-name-input');
    const closeDialog = document.getElementsByClassName('icon-dialog-name');
    const playerName = document.getElementById('player-name');
    const changeBtn = document.getElementById('user-img-btn');
    const dialogNameHTML = document.getElementById('change-name-dialog');
    changeBtn.addEventListener('click', function () {
        dialogNameHTML.classList.remove('hidden');
        nameInput.value = '';
        dialogNameHTML.showModal();
    });
    dialogNameHTML.addEventListener('keypress', function (event) {
        if (event.key === "Enter") saveChangeName.click();
    });
    saveChangeName.addEventListener('click', function () {
        let cleanInput = nameInput.value.slice(0, 10).replace(/\W/g, '');
        let newName = (cleanInput.length) ? cleanInput : 'JUGADOR 1';
        playerName.textContent = newName;
        playerName.dataset.nameUser = newName;
    });

    Array.from(closeDialog).forEach(btn => btn.addEventListener('click', function () {
        dialogNameHTML.classList.add('hidden');
        dialogNameHTML.close()
    }));
}();
+function continueGameDialog() {
    const dialogContinueHTML = document.getElementById('end-game-dialog');
    const closeDialog = document.getElementsByClassName('icon-dialog-continue');
    const noNewGameBtn = document.getElementById('no-newGame-btn');
    const yesNewGameBtn = document.getElementById('yes-newGame-btn');
    Array.from(closeDialog).forEach(btn => btn.addEventListener('click', function () {
        dialogContinueHTML.classList.add('hidden');
        dialogContinueHTML.close()
    }));
    noNewGameBtn.addEventListener('click', function () { location.href = '' });
    yesNewGameBtn.addEventListener('click', function () {
        cleanGrid();
        handleGame();
    });
}();
+function startGame() {
    const startBtn = document.getElementById('start-btn');
    const gameBodyContainer = document.getElementById('game-body-container');
    const gameStartContainer = document.getElementById('game-start-container');
    const previousPlayerName = document.getElementById('player-name');
    const previousOponentName = document.getElementById('oponent-name');
    const gridUserName = document.getElementById('grid-user-name');
    const gridOponentName = document.getElementById('grid-oponent-name');
    startBtn.addEventListener('click', function () {
        gridUserName.textContent = previousPlayerName.dataset.nameUser;
        gridOponentName.textContent = previousOponentName.textContent;
        gameBodyContainer.classList.add('hidden');
        gameStartContainer.classList.remove('hidden');
        cleanGrid();
        handleGame();
    });
}();
function loadScores() {
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const scores = userScore.getScores();
    if (!scores.length) return;
    scores.forEach(userScore => {
        const scoreName = document.createElement('span');
        const scoreWin = document.createElement('span');
        const scoreLose = document.createElement('span');
        const scoreDraw = document.createElement('span');
        const scoreDate = document.createElement('span');
        const listScores = [scoreName, scoreWin, scoreLose, scoreDraw, scoreDate];
        const listClasses = ['user-name', 'user-win', 'user-lose', 'user-draw', 'user-date'];
        const listNewValues = [userScore[0], userScore[1].w, userScore[1].l, userScore[1].d, userScore[1].date];
        let index = 0;
        listScores.forEach(value => {
            value.textContent = listNewValues[index];
            value.classList.add(listClasses[index]);
            ++index;
        });
        leaderboardContainer.append(scoreName, scoreWin, scoreLose, scoreDraw, scoreDate);
    });
}
+function clearScores() {
    if (!localStorage.length) return;
    const clearBtn = document.getElementById('clear-leader-btn');
    clearBtn.addEventListener('click', userScore.clearScores);
}();

// Game
function cleanGrid() {
    const gridSpans = document.getElementsByClassName('grid-cell');
    Array.from(gridSpans).forEach(span => {
        span.classList.remove('clicked-cell-user', 'clicked-cell-oponent');
    });
}
function getRandomStartNumber() {
    const num = Math.round((Math.random() * 10) / 10);
    return num;
};
function handleGame() {
    const whoIsOponent = document.getElementById('oponent-img');
    let handleOponent;
    switch (+whoIsOponent.dataset.op) {
        case 0:
            handleOponent = gameAgainstIAEasy;
            break;
        case 1:
            handleOponent = gameAgainstIAHard;
            break;
        case 2:
            handleOponent = gameAgainstHuman;
            break;
        default:
            handleOponent = gameAgainstIAHard;
            break;
    }
    const firstPlayer = (getRandomStartNumber())
        ? 'user'
        : 'oponent';
    handleOponent(firstPlayer);
}
function gameAgainstIAEasy(firstPlayer) {
    gameAgainstIA(firstPlayer, IAeasyMove);
};
function gameAgainstIAHard(firstPlayer) {
    gameAgainstIA(firstPlayer, IAhardMove);
}
function gameAgainstIA(firstPlayer, functIA) {
    const gameGrid = document.getElementById('game-grid');
    handleIAandUserMoves(functIA);
    if (firstPlayer === 'user') newGame.changeCurrentTurn('user');
    else IAdelayedMovement(functIA, gameGrid);
}
function gameAgainstHuman(firstPlayer) {s
    console.log(firstPlayer);
}
function changeGameTitle() {
    const gameTitle = document.getElementById('game-start-title');
    const userName = document.getElementById('grid-user-name');
    const oponentName = document.getElementById('grid-oponent-name');
    const arrayData = [[userName, oponentName], [oponentName, userName], [userName.textContent, oponentName.textContent]]
    const index = (newGame.getCurrentTurn() === 'user') ? 0 : 1;

    gameTitle.textContent = `Turno de ${arrayData[2][index]}`;
    arrayData[0][index].classList.add('active');
    arrayData[1][index].classList.remove('active');
}
function handleIAandUserMoves(functIA) {
    const gridSpans = document.getElementsByClassName('grid-cell');
    const gameGrid = document.getElementById('game-grid');

    Array.from(gridSpans).forEach(span => {
        span.addEventListener('click', function (event) {
            if (newGame.getCurrentTurn() === 'user' & event.isTrusted) {
                const [x, y] = [+span.dataset.gridX, +span.dataset.gridY];
                if (newGame.movIsValid(x, y)) userMoveOnListener(span, x, y);
                else return;
                if (gameIsOver()) endGame();
                else IAdelayedMovement(functIA, gameGrid);
            } else if (newGame.getCurrentTurn() === 'oponent' & !event.isTrusted) {
                IAvisualMovement(span, gameGrid);
            };
        }, { once: true });
    });
};
function userMoveOnListener(span, x, y) {
    newGame.makeMove({ x, y }, 1);
    span.classList.add('clicked-cell-user');
}
function IAdelayedMovement(functIA, gameGrid) {
    gameGrid.style.pointerEvents = 'none';
    newGame.changeCurrentTurn('oponent');
    setTimeout(functIA, 600);
}
function IAvisualMovement(span, gameGrid) {
    span.classList.add('clicked-cell-oponent');
    newGame.changeCurrentTurn('user');
    gameGrid.style.pointerEvents = 'all';
    if (gameIsOver()) endGame();
}
function gameIsOver() {
    return (newGame.getStatus()[0] != 'continue') ? true : false;
}
function endGame() {
    const dialogEnd = document.getElementById('end-game-dialog');
    const dialogTitle = document.getElementById('end-game-title');
    const userName = document.getElementById('grid-user-name');
    const oponentName = document.getElementById('grid-oponent-name');
    const winnerPlayer = newGame.getStatus()[1];
    const playerList = { 1: userName.textContent, 2: oponentName.textContent };

    dialogTitle.textContent = (newGame.getStatus()[0] === 'draw')
        ? `Empate!`
        : `Ha ganado ${playerList[winnerPlayer]}`;
    uploadScore(winnerPlayer, userName.textContent);
    newGame.restartGame();
    dialogEnd.classList.remove('hidden');
    dialogEnd.showModal();
}
function uploadScore(player, userName) {
    const finalScore = (newGame.getStatus()[0] === 'draw')
        ? 'd'
        : (player === 1)
            ? 'w'
            : 'l';
    const date = new Date;
    userScore.updateScore(userName, {
        score: finalScore,
        date: `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear().toString().slice(2)}`
    });
}
// Game & IA
function IAgetRandomMove() {
    const availableMoves = newGame.availableMoves();
    const randomMove = Math.round(Math.random() * (availableMoves.length - 1));
    return availableMoves[randomMove];
}
function IAeasyMove() {
    let [xIA, yIA] = IAgetRandomMove();
    newGame.makeMove({ x: xIA, y: yIA }, 2);
    let moveSpan = document.querySelector(`span[data-grid-y="${yIA}"][data-grid-x="${xIA}"]`);
    moveSpan.click();
}
function IAhardMove() {
    const board = newGame.getBoard();
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
                totalSetValue += checkSetMoves(set, moveCoordinates.x, moveCoordinates.y, 2);
            });
            nodeMoveTree.addNode({ value: totalSetValue.toFixed(2), coordinates: moveCoordinates });
        }
    }
    const bestMoveCoord = nodeMoveTree.bestMove().coordinates;
    newGame.makeMove(bestMoveCoord, 2);
    let moveSpan = document.querySelector(`span[data-grid-y="${bestMoveCoord.y}"][data-grid-x="${bestMoveCoord.x}"]`);
    moveSpan.click();
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
function checkSetMoves(set, x, y, IASymbol) { // Revisar valores, agregar que si hay sets limpios enteros, eso también da valor, debería permitir que la IA empieza en el medio 
    let valueMove = 0;
    let userSymbol = 1;
    let position = (set[1] === 'row')
        ? x
        : (set[1] === 'col')
            ? y
            : (y === 1)
                ? 1
                : 0;

    let testWinOrLose = set[0].slice();
    testWinOrLose[position] = IASymbol;
    if (testWinOrLose.every(value => value === IASymbol)) valueMove += 99; // Revisa si ganamos
    testWinOrLose[position] = userSymbol;
    if (testWinOrLose.every(value => value === userSymbol)) valueMove += 50; // Revisa si perdimos
    if (!set[0].includes(IASymbol) && set[0].includes(userSymbol)) valueMove += 0.5; // Revisa si podemos bloquear a futuro
    if (!set[0].includes(IASymbol)) return valueMove; // Si no hay ningún movimiento nuestro, return;
    if (set[0].includes(userSymbol)) return valueMove; // Si el set en cuestión, tiene un valor enemigo en medio, no nos sirve para ganar ahí po esto quizá deba quitarlo después
    if (position <= 1 && set[0][position + 1] === IASymbol) valueMove += 0.4; // Revisa el siguiente
    if (position >= 1 && set[0][position - 1] === IASymbol) valueMove += 0.4; // Revisa el anterior

    return +valueMove.toFixed(2);
}
function Game() {
    let _board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    _board.currentTurn;
    _board.gameStatus = ['continue', 0];
    const getCurrentTurn = () => {
        return _board.currentTurn;
    }
    const changeCurrentTurn = (currentTurn) => {
        _board.currentTurn = currentTurn;
        changeGameTitle();
    };
    const getStatus = () => {
        return _board.gameStatus;
    };
    const getBoard = () => {
        return _board;
    };
    const makeMove = ({ x, y }, symbol) => {
        _board[y][x] = symbol;
        _board.gameStatus = gameContinue({ x, y }, symbol);
    };
    const gameContinue = ({ x, y }, symbol) => {
        let setMoves = [];
        setMoves.push(getRow(y, _board), getColumn(x, _board));
        if (x != 1 && y != 1 || x === 1 && y === 1) {
            const boardDiag = getDiagonal(x, y, _board);
            boardDiag.forEach(arr => setMoves.push(arr));
        };
        if (setMoves.some(set => (set.every(value => value === symbol)))) return ['win', symbol];
        if (_board.some(arr => arr.includes(0))) return ['continue', 0];
        else return ['draw', 0];
    };
    const restartGame = () => {
        _board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        _board.gameStatus = 'continue';
    };
    const movIsValid = (x, y) => {
        return !_board[y][x];
    };
    const availableMoves = () => {
        const moves = [];
        for (let Y = 0; Y < getBoard().length; Y++) {
            for (let X = 0; X < getBoard()[Y].length; X++) {
                if (!getBoard()[Y][X]) moves.push([X, Y]);
            };
        };
        return moves;
    };
    return { getCurrentTurn, changeCurrentTurn, getBoard, getStatus, gameContinue, makeMove, restartGame, movIsValid, availableMoves };
}
function LocalScore() {
    const updateScore = (name, result) => {
        const oldItem = localStorage.getItem(name) ?? JSON.stringify({ w: 0, l: 0, d: 0, date: 0 });
        const newItem = JSON.parse(oldItem);
        newItem[result.score] += 1;
        newItem.date = result.date;
        localStorage.setItem(name, JSON.stringify(newItem));
    };
    const getScores = () => {
        if (!localStorage.length) return false;
        const scores = Object.entries(localStorage);
        const parsedScores = scores.map(obj => [obj[0], JSON.parse(obj[1])]);
        parsedScores.sort((a, b) => +a[1] - +b[1]);
        return parsedScores;
    };
    const clearScores = () => {
        localStorage.clear();
    }
    return { updateScore, getScores, clearScores };
}


/* tengo que ver cómo agregar scores al terminar, porque si llamamos loadScores
se recarga todo denuevo, y se duplican los existentes
por ello necesitaríamos otra función para cargar al momento
si existe el usuario, que se sume a lo que ya está
y si no, que se agrege? */
