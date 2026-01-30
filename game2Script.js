let menuElement = document.querySelector('.toggled-menu-container');
let choicesText = document.querySelector('.Options__text');

// document.querySelector('.menu').onclick = function () {
//     menuElement.classList.toggle("toggleDown");
// }

//on hover website rotate img
document.querySelector('body').addEventListener('mouseover', () => {
    document.querySelector('.rock-paper-scissors-image').classList.add('rotate360deg');
});  
//RockPaperScissors
let resultElement = document.querySelector('.result__text');
let scoreBoard = JSON.parse(localStorage.getItem('score')) || {
    scoreWins: 0,
    scoreLosses: 0,
    scoreTies: 0
};

let scoreBoardReset = () => {
    document.querySelector('.values__ties').innerHTML = scoreBoard.scoreTies;
    document.querySelector('.values__wins').innerHTML = scoreBoard.scoreWins;
    document.querySelector('.values__losses').innerHTML = scoreBoard.scoreLosses;
}

scoreBoardReset();
let resultReveal = (resultText) => {
    if (resultElement.classList.contains("revealUp") && resultText !== "") {
        blurAnimation(resultElement);
        setTimeout(() => {
            resultElement.innerHTML = resultText;
        }, 200);
    } else {
        resultElement.classList.toggle("revealUp");
        resultElement.innerHTML = resultText;
    }
}

let blurAnimation = (ElementName) => {
    ElementName.classList.toggle("blurTextTransition");
    setTimeout(() => {
        ElementName.classList.toggle("blurTextTransition");
    }, 300);
}

function playAction(userChoice) {
    if (computerChoice > 0 && computerChoice <= 1/3) {
        computerChoice = 'Rock';
    } else if (computerChoice >= 1/3 && computerChoice <= 2/3) {
        computerChoice = 'Paper';
    } else {
        computerChoice = 'Scissors';
    }

    blurAnimation(choicesText);
    setTimeout(() => {
        choicesText.innerHTML = ("You have choosen: " + userChoice + "<br>" + "The computer choosed: " + computerChoice);
    }, 200);


    if (userChoice === computerChoice) {
        resultReveal("A Tie!");
        scoreBoard.scoreTies++;
    } else if (userChoice === "Rock" && computerChoice === "Scissors" || userChoice === "Paper" && computerChoice === "Rock" || userChoice === "Scissors" && computerChoice === "Paper") {
        resultReveal("You Have Won!!");
        scoreBoard.scoreWins++;
    } else {
        resultReveal("You sadly have lost..");
        scoreBoard.scoreLosses++;
    }
    localStorage.setItem('score', JSON.stringify(scoreBoard));
    scoreBoardReset();
    localStorage.setItem('winsCountGame2', JSON.stringify(scoreBoard.scoreWins));
}

document.querySelector(".btns__rock").onclick = function () {
    computerChoice = Math.random();
    playAction('Rock');
}

document.querySelector(".btns__paper").onclick = function () {
    computerChoice = Math.random();
    playAction('Paper');
}

document.querySelector(".btns__scissors").onclick = function () {
    computerChoice = Math.random();
    playAction('Scissors');
}

document.querySelector(".btns__reset").onclick = function () {
    blurAnimation(choicesText);
    setTimeout(() => {
        choicesText.innerHTML = "Please choose";
    }, 200);
    scoreBoard.scoreWins = 0;
    scoreBoard.scoreLosses = 0;
    scoreBoard.scoreTies = 0;
    resultElement.classList.remove("revealUp");
    document.querySelector('.values__wins').innerHTML = scoreBoard.scoreWins;
    document.querySelector('.values__losses').innerHTML = scoreBoard.scoreLosses;
    document.querySelector('.values__ties').innerHTML = scoreBoard.scoreTies;
}