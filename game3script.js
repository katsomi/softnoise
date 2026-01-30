let menuElement = document.querySelector('.toggled-menu-container');
let choicesText = document.querySelector('.Options__text');
const choiceBody = document.querySelector('.game-container');
const bettingPrice = document.querySelector('.coinGame__price');
const bettingBtn = document.querySelector('.betting__btn');
const errorSvgElement = document.querySelector('.error-svg');
const warningMessageElement = document.querySelector('.warning-message');
const coinGameSelector = document.querySelector('.coinGame__selector');
const resultContainer = document.querySelector('.result-container');
const resultText = document.querySelector('.game-result');

// document.querySelector('.menu').onclick = function () {
//     menuElement.classList.toggle("toggleDown");
// }

let winsAmount = JSON.parse(localStorage.getItem('game3Wins')) || 0;
let winningRatio = 2;

errorSvgElement.style.display ='none';
warningMessageElement.style.display ='none';
resultContainer.classList.toggle('element-displayer');

let checkIfNum = value => typeof value === 'number' && !isNaN(value) || (!isNaN(parseFloat(value)) && isFinite(value));

let isNumber = () => {
    if (checkIfNum(bettingPrice.value) === false) {
        errorSvgElement.style.display = 'block';
        warningMessageElement.style.display = 'block';
    } else {
        errorSvgElement.style.display = 'none';
        warningMessageElement.style.display = 'none';
    }
}

bettingPrice.addEventListener('input', isNumber);

document.querySelector('.betting__btn').addEventListener('click', () => {
    if (checkIfNum(bettingPrice.value)) {
        const userChoice = coinGameSelector.value;
        let winningChoice = Math.ceil(Math.random() * 2);
        if (winningChoice === 1) {
            winningChoice = 'Head';
        } else {
            winningChoice = 'Tails';
        }
    
        //hide gameBody
        choiceBody.classList.toggle('toggled-element');
        
        //show result + reset btn
        resultContainer.classList.toggle('element-displayer');
        
        let checkWinner = new Promise((resolve, reject) => {
            if (userChoice === winningChoice) {
                resolve('You Have Won!');
            } else {
                reject('You Have lost, try again..');         
            }
        })
    
        checkWinner
            .then((message) => {
                const reward = bettingPrice.value * winningRatio;
                resultText.innerHTML = 'congrats ' + message + ', your reward is ' + reward;
                winsAmount += 1;
                localStorage.setItem('winsCountGame2', JSON.stringify(winsAmount));
            }).catch((message) => {
                resultText.innerHTML = message;
            });
    } else {
        alert('The input must only contain numbers!')
    }
});


document.querySelector('.reset-button').addEventListener('click', () => {
    //hide gameBody
    choiceBody.classList.toggle('toggled-element');
    
    //show result + reset btn
    resultContainer.classList.toggle('element-displayer');

    //reset input value
    bettingPrice.value = "";
});