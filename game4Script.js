//Variables
let menuElement = document.querySelector('.toggled-menu-container');
const chooseMove = document.querySelector('.one-player-display');
const chcooseMode = document.querySelector('.menu-elements');
const gameParagraph = document.querySelector('.menu-paragraph');
const winningPlayer = document.querySelector('.winning-player');
const crossImage = document.querySelector('.cross-image');
const circleImage = document.querySelector('.circle-image');
const gameBoard = document.querySelector('.game-body');
const twoPlayerWinningScreen = document.querySelector('.two-player-result');
const onePlayerWinningScreen = document.querySelector('.one-player-result');
const resultForOnePlayer = document.querySelector('.result');
const resetButton1 = document.querySelector('.play-again-button-1');
const resetButton2 = document.querySelector('.play-again-button-2');
const clearWins = document.querySelector('.reset-score-btn');
clearWins.innerHTML = 'reset';
let computer;
let userChoice;
let computerChoice;
let winningTimes = JSON.parse(localStorage.getItem('winningTimes')) || 0;

const gameSlots = [
    slotNumber1 = {
        content: document.querySelector('.slot1'),
        value: 'unchecked',
        slotNumber: 1
    },
    slotNumber2 = {
        content: document.querySelector('.slot2'),
        value: 'unchecked',
        slotNumber: 2
    },
    slotNumber3 = {
        content: document.querySelector('.slot3'),
        value: 'unchecked',
        slotNumber: 3
    },
    slotNumber4 = {
        content: document.querySelector('.slot4'),
        value: 'unchecked',
        slotNumber: 4
    },
    slotNumber5 = {
        content: document.querySelector('.slot5'),
        value: 'unchecked',
        slotNumber: 5
    },
    slotNumber6 = {
        content: document.querySelector('.slot6'),
        value: 'unchecked',
        slotNumber: 6
    },
    slotNumber7 = {
        content: document.querySelector('.slot7'),
        value: 'unchecked',
        slotNumber: 7
    },
    slotNumber8 = {
        content: document.querySelector('.slot8'),
        value: 'unchecked',
        slotNumber: 8
    },
    slotNumber9 = {
        content: document.querySelector('.slot9'),
        value: 'unchecked',
        slotNumber: 9
    }
];

const availableSpaces = new Array();
gameSlots.forEach(element => {
    availableSpaces.push(element.slotNumber);
});
let round = 0;
let currentMove = 'circle';

//reset btn
document.querySelector('.reset-score-btn').addEventListener('click', () => {
    clearWins.innerHTML = 'Done!';
    winningTimes = 0;
    localStorage.setItem('winningTimes', JSON.stringify(winningTimes));
});

//Arrays Separation
const firstRow = [gameSlots[0], gameSlots[1], gameSlots[2]];
const secondRow = [gameSlots[3], gameSlots[4], gameSlots[5]];
const thirdRow = [gameSlots[6], gameSlots[7], gameSlots[8]];

const firstColumn = [gameSlots[0], gameSlots[3], gameSlots[6]];
const secondColumn = [gameSlots[1], gameSlots[4], gameSlots[7]];
const thirdColumn = [gameSlots[2], gameSlots[5], gameSlots[8]];

const crossLine1 = [gameSlots[0], gameSlots[4], gameSlots[8]];
const crossLine2 = [gameSlots[2], gameSlots[4], gameSlots[6]];

//Menu toggling
// document.querySelector('.menu').onclick = function () {
//     menuElement.classList.toggle("toggleDown");
// }

//toggle element
let toggleElement = (element) => element.classList.toggle('toggle-down');

//moveTypeSelector
document.querySelector('.circle-button').addEventListener('click', () => {
    currentMove = 'circle';
    userChoice = 'circle';
    computerChoice = 'cross'
    toggleElement(chooseMove);
    toggleElement(gameBoard);
});

document.querySelector('.cross-button').addEventListener('click', () => {
    currentMove = 'cross';
    userChoice = 'cross';
    computerChoice = 'circle';
    toggleElement(chooseMove);
    toggleElement(gameBoard);
});

//To change turns
let flipTurn = () => currentMove == 'circle' ? currentMove = 'cross' : currentMove = 'circle';

//To change a slot value
let changeSlot = (slot) => {
    const changedSlot = gameSlots[slot];
    changedSlot.content.classList.add(`${currentMove}-show`);
    changedSlot.value = `checked as ${currentMove}`;
    winningCondition(currentMove);
    round ++;
    flipTurn();
}

//Winning Conditions
let winningCondition = (move) => {
    const winningConditions = new Promise((resolve, reject) => {
        const isAllChecked = gameSlots.every(array => array.value !== 'unchecked');
    
        const isAllChecked1 = firstRow.every(array => array.value == 'checked as ' + move);
        const isAllChecked2 = secondRow.every(array => array.value == 'checked as ' + move);
        const isAllChecked3 = thirdRow.every(array => array.value == 'checked as ' + move);
        const isAllChecked4 = firstColumn.every(array => array.value == 'checked as ' + move);
        const isAllChecked5 = secondColumn.every(array => array.value == 'checked as ' + move);
        const isAllChecked6 = thirdColumn.every(array => array.value == 'checked as ' + move);
        const isAllChecked7 = crossLine1.every(array => array.value == 'checked as ' + move);
        const isAllChecked8 = crossLine2.every(array => array.value == 'checked as ' + move);
        
        if (isAllChecked1 || isAllChecked2 || isAllChecked3 || isAllChecked4 || isAllChecked5 || isAllChecked6 || isAllChecked7 || isAllChecked8) {
            resolve(currentMove);
        } else if (isAllChecked) {
            reject();
        }
    });

    winningConditions
    .then(message => {
        winScreenDisplay(message);
    })
    .catch(() => {
        winScreenDisplay('tie');
    });
}

//PlayActions
document.querySelector('.slot1').addEventListener('click', () => {
    if (gameSlots[0].value == 'unchecked' && availableSpaces.length > 0) {
        changeSlot(0);
        if (computer !== undefined) {
            for (let i = 0; i < gameSlots.length; i++) {
                const space = gameSlots[i].value;
                if (space == 'unchecked') {
                    availableSpaces.push(gameSlots[i].slotNumber);
                }
            }
            const randomPlay = Math.floor(Math.random() * availableSpaces.length);
            changeSlot(availableSpaces[randomPlay] - 1);
        }
    } else {
        alert('this place is occupied');
    }
});

document.querySelector('.slot2').addEventListener('click', () => {
    if (gameSlots[1].value == 'unchecked' && availableSpaces.length > 0) {
        changeSlot(1);
        if (computer !== undefined) {
            for (let i = 0; i < gameSlots.length; i++) {
                const space = gameSlots[i].value;
                if (space == 'unchecked') {
                    availableSpaces.push(gameSlots[i].slotNumber);
                }
            }
            const randomPlay = Math.floor(Math.random() * availableSpaces.length);
            changeSlot(availableSpaces[randomPlay] - 1);
            }
    } else {
        alert('this place is occupied');
    }
});

document.querySelector('.slot3').addEventListener('click', () => {
    if (gameSlots[2].value == 'unchecked' && availableSpaces.length > 0) {
        changeSlot(2);
    } else {
        if (computer !== undefined) {
            for (let i = 0; i < gameSlots.length; i++) {
                const space = gameSlots[i].value;
                if (space == 'unchecked') {
                    availableSpaces.push(gameSlots[i].slotNumber);
                }
            }
            const randomPlay = Math.floor(Math.random() * availableSpaces.length);
            changeSlot(availableSpaces[randomPlay] - 1);
        }
        alert('this place is occupied');
    }
});

document.querySelector('.slot4').addEventListener('click', () => {
    if (gameSlots[3].value == 'unchecked' && availableSpaces.length > 0) {
        changeSlot(3);
        if (computer !== undefined) {
            for (let i = 0; i < gameSlots.length; i++) {
                const space = gameSlots[i].value;
                if (space == 'unchecked') {
                    availableSpaces.push(gameSlots[i].slotNumber);
                }
            }
            const randomPlay = Math.floor(Math.random() * availableSpaces.length);
            changeSlot(availableSpaces[randomPlay] - 1);
        }
    } else {
        alert('this place is occupied');
    }
});

document.querySelector('.slot5').addEventListener('click', () => {
    if (gameSlots[4].value == 'unchecked' && availableSpaces.length > 0) {
        changeSlot(4);
        if (computer !== undefined) {
            for (let i = 0; i < gameSlots.length; i++) {
                const space = gameSlots[i].value;
                if (space == 'unchecked') {
                    availableSpaces.push(gameSlots[i].slotNumber);
                }
            }
            const randomPlay = Math.floor(Math.random() * availableSpaces.length);
            changeSlot(availableSpaces[randomPlay] - 1);
        }
    } else {
        alert('this place is occupied');
    }
});

document.querySelector('.slot6').addEventListener('click', () => {
    if (gameSlots[5].value == 'unchecked' && availableSpaces.length > 0) {
        changeSlot(5);
        if (computer !== undefined) {
            for (let i = 0; i < gameSlots.length; i++) {
                const space = gameSlots[i].value;
                if (space == 'unchecked') {
                    availableSpaces.push(gameSlots[i].slotNumber);
                }
            }
            const randomPlay = Math.floor(Math.random() * availableSpaces.length);
            changeSlot(availableSpaces[randomPlay] - 1);
        }
    } else {
        alert('this place is occupied');
    }
});

document.querySelector('.slot7').addEventListener('click', () => {
    if (gameSlots[6].value == 'unchecked' && availableSpaces.length > 0) {
        changeSlot(6);
        if (computer !== undefined) {
            for (let i = 0; i < gameSlots.length; i++) {
                const space = gameSlots[i].value;
                if (space == 'unchecked') {
                    availableSpaces.push(gameSlots[i].slotNumber);
                }
            }
            const randomPlay = Math.floor(Math.random() * availableSpaces.length);
            changeSlot(availableSpaces[randomPlay] - 1);
        }
    } else {
        alert('this place is occupied');
    }
});

document.querySelector('.slot8').addEventListener('click', () => {
    if (gameSlots[7].value == 'unchecked' && availableSpaces.length > 0) {
        changeSlot(7);
        if (computer !== undefined) {
            for (let i = 0; i < gameSlots.length; i++) {
                const space = gameSlots[i].value;
                if (space == 'unchecked') {
                    availableSpaces.push(gameSlots[i].slotNumber);
                }
            }
            const randomPlay = Math.floor(Math.random() * availableSpaces.length);
            changeSlot(availableSpaces[randomPlay] - 1);
        }
    } else {
        alert('this place is occupied');
    } 
});

document.querySelector('.slot9').addEventListener('click', () => {
    if (gameSlots[8].value == 'unchecked' && availableSpaces.length > 0) {
        changeSlot(8);
        if (computer !== undefined) {
            for (let i = 0; i < gameSlots.length; i++) {
                const space = gameSlots[i].value;
                if (space == 'unchecked') {
                    availableSpaces.push(gameSlots[i].slotNumber);
                }
            }
            const randomPlay = Math.floor(Math.random() * availableSpaces.length);
            changeSlot(availableSpaces[randomPlay] - 1);
        }
    } else {
        alert('this place is occupied');
    }
});

//start game for one player
const onePlayerSelection = document.querySelector('.one-player-button');
onePlayerSelection.addEventListener('click', () => {
    toggleElement(gameParagraph);
    toggleElement(chooseMove);
    toggleElement(chcooseMode);
    computer = 'easy mode';
});

//start game for two players
const twoPlayersSelection = document.querySelector('.two-players-button');
twoPlayersSelection.addEventListener('click', () => {
    toggleElement(gameParagraph);
    toggleElement(gameBoard);
    toggleElement(chcooseMode);
    computer = undefined;
});

//Winning Screen
winScreenDisplay = (winner) => {
    if (computer !== undefined) {
        onePlayerResult(computer, winner);
    } else if (computer === undefined) {
        toggleElement(twoPlayerWinningScreen);
        toggleElement(gameBoard);
        if (winner === 'circle') {
            crossImage.style.display = 'none';
            circleImage.style.display = 'block';
        } else {
            document.querySelector('.winner-number').innerHTML = 'second';
            circleImage.style.display = 'none';
            crossImage.style.display = 'block';
        }
    }
}

//result vs computer
function onePlayerResult(difficulty, winner) {
    toggleElement(gameBoard);
    toggleElement(onePlayerWinningScreen);
    if (difficulty !== undefined) {
        if (winner === userChoice) {
            winningTimes++;
            localStorage.setItem('winningTimes', JSON.stringify(winningTimes));
        } else if (winner === computerChoice) {
            resultForOnePlayer.innerHTML = 'You Have lost.. Try again!';
        } else {
            resultForOnePlayer.innerHTML = 'You have tied, keep It going!';
        }
    }
}

//Reset when clicking on btn
resetButton1.addEventListener('click', () => {
    toggleElement(onePlayerWinningScreen);
    
    for (let i = 0; i < gameSlots.length; i++) {
        const changedSlot = gameSlots[i];
        toggleElement(chcooseMode);
        changedSlot.content.classList.remove(`circle-show`);
        changedSlot.content.classList.remove(`cross-show`);
        changedSlot.value = `unchecked`;
        round = 0;
    }
    toggleElement(gameParagraph);
});

resetButton2.addEventListener('click', () => {
    toggleElement(twoPlayerWinningScreen);
    
    for (let i = 0; i < gameSlots.length; i++) {
        const changedSlot = gameSlots[i];
        toggleElement(chcooseMode);
        changedSlot.content.classList.remove(`circle-show`);
        changedSlot.content.classList.remove(`cross-show`);
        changedSlot.value = `unchecked`;
        round = 0;
    }

    toggleElement(gameParagraph);
});