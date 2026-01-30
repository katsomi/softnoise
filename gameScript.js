const infoElement = document.querySelector('.introContainer');
const menuElement = document.querySelector('.toggled-menu-container');
const gameElement = document.querySelector('.gameBody');
const recordElementContainer = document.querySelector('.gameRecord')
const paragraphText = document.querySelector('.storyTelling');

const toggleElement = (elementName) => elementName.classList.toggle("toggleDown");
const hideElement = (elementName) => elementName.classList.add("displayNone");
const showElement = (elementName) => elementName.classList.remove("displayNone");


hideElement(gameElement);
hideElement(recordElementContainer);
let isClickTrue;
let winsCount = JSON.parse(localStorage.getItem("winsCount")) || 0;
let gameName;
let gameResult;
let timePlayed;
let playingAmount = JSON.parse(localStorage.getItem("previousGamesNumber")) || 0;

/* Record */
let recordElementContent = document.querySelector('.records');
recordElementContent.innerHTML === undefined ? recordElementContent.innerHTML = "" : recordElementContent.innerHTML = JSON.parse(localStorage.getItem("record"));

// Max lines 10
let removeOldestLine = () => {
    let lines = recordElementContent.innerHTML.split('<li>');
    lines.splice(0,1);
    recordElementContent.innerHTML = lines.join('<li>');
}

/* This checks if it's empty or not to either hide it when empty or puts its content on the btns */
let choicesRefresh = () => {
    choice1Element === "" ? document.querySelector('.selectionNumber1').style.display = "none" : document.querySelector('.selectionNumber1').innerHTML = choice1Element;
    choice2Element === "" ? document.querySelector('.selectionNumber2').style.display = "none" : document.querySelector('.selectionNumber2').innerHTML = choice2Element;
    choice3Element === "" ? document.querySelector('.selectionNumber3').style.display = "none" : document.querySelector('.selectionNumber3').innerHTML = choice3Element;
    paragraphText.innerHTML = typedText;
}

//this makes a delay
const delay = async (ms = 1000) =>
new Promise(resolve => setTimeout(resolve, ms));

//word by word typing animation
async function charachtersCountDisplayer(str, i) {
    str = str.substring(0, i);
    document.querySelector('.typedOut').innerHTML = str;
}

async function charachtersCountDisplayerContainer() {
    for (let i = 0; i <= typedText.length; i++) {
        charachtersCountDisplayer(typedText, i);
        await delay(70);

        //This skips the animation of writing
        if (isClickTrue === true) {
            document.querySelector('.typedOut').innerHTML = typedText;
            break;
        }
    }
}

//This shows the menu pop-up on small screens
// document.querySelector('.menu').addEventListener("click", () => toggleElement(menuElement));

//A date dectator
let getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + "/" + month + "/" + day;
}

//This adds a phase
let phaseNumber = phase => document.querySelector('.phaseNumber').innerHTML = phase;

//A function for starting the game
document.querySelector('.btn__play').addEventListener("click", async function () {
    playingAmount++;
    timePlayed = getDate();
    recordElementContent.innerHTML += "<li> The Enchanted Forest!" + " - " + timePlayed + "." + "</li>";
    phaseNumber("first");
    typedText = "You find yourself standing at the edge of a mystical forest, its trees towering high into the sky. Your heart races with excitement as you hear whispers of magical creatures and hidden treasures within. Now, it's time for you to make your first choice!";
    choice1Element = "Venture into the forest and explore its depths.";
    choice2Element = "Turn back and leave the forest behind.";
    choice3Element = "return";
    toggleElement(gameElement);
    showElement(gameElement);
    hideElement(infoElement);
    charachtersCountDisplayerContainer();
    await delay(70);
    document.querySelector('.storyTelling').addEventListener("click", () => isClickTrue = true);
    choicesRefresh();
    seletionReset();
});

//A function for choosing between the options
let seletionReset = () => {
    document.querySelector('.selectionNumber1').addEventListener("click", () => {
            charachtersCountDisplayerContainer();
            choice1();
        document.querySelector('.selectionNumber1').addEventListener("click", () => {
            charachtersCountDisplayerContainer();
            choice1A();
            document.querySelector('.selectionNumber1').addEventListener("click", () => {
                charachtersCountDisplayerContainer();
                choice1Aa();
            });
                
            document.querySelector('.selectionNumber2').addEventListener("click", () => {
                charachtersCountDisplayerContainer();
                choice1Ab();
            });
            
            document.querySelector('.selectionNumber3').addEventListener("click", () => {
                charachtersCountDisplayerContainer();
                showElement(infoElement);
                hideElement(gameElement);
            });
        });
        
        document.querySelector('.selectionNumber2').addEventListener("click", () => {
            charachtersCountDisplayerContainer();
            choice1B();
            document.querySelector('.selectionNumber1').addEventListener("click", () => {
                charachtersCountDisplayerContainer();
                choice1Ba();
            });
            
            document.querySelector('.selectionNumber2').addEventListener("click", () => {
                charachtersCountDisplayerContainer();
                choice1Bb();
            });
        });
        
        document.querySelector('.selectionNumber3').addEventListener("click", () => {
            showElement(infoElement);
            hideElement(gameElement);
            return;
        });
    });

    document.querySelector('.selectionNumber2').addEventListener("click", () => {
        choice2();
        charachtersCountDisplayerContainer();
        document.querySelector('.selectionNumber1').addEventListener("click", () => {
            charachtersCountDisplayerContainer();
            choice2A();
            document.querySelector('.selectionNumber1').addEventListener("click", () => {
                charachtersCountDisplayerContainer();
                choice2Aa();
            });
            
            document.querySelector('.selectionNumber2').addEventListener("click", () => {
                charachtersCountDisplayerContainer();
                choice2Ab();
            });
        });
        
        document.querySelector('.selectionNumber2').addEventListener("click", () => {
            charachtersCountDisplayerContainer();
            choice2B();
            document.querySelector('.selectionNumber1').addEventListener("click", () => {
                charachtersCountDisplayerContainer();
                choice2Ba();
            });
            
            document.querySelector('.selectionNumber2').addEventListener("click", () => {
                charachtersCountDisplayerContainer();
                choice2Bb();
            });
        });
    });

    document.querySelector('.selectionNumber3').addEventListener("click", () => {
        showElement(infoElement);
        hideElement(gameElement);
        return;
    });
}

//This Resets the choice's value
let selectChoice = (paragraphText = "", choiceNum1 = "", choiceNum2 = "", choiceNum3 = "") => {
    choice1Element = choiceNum1;
    choice2Element = choiceNum2;
    choice3Element = choiceNum3;
    typedText = paragraphText;
    choicesRefresh();
}

//This shows the result
let endingScreen = (result, endingText) => {
    if (result === "win") {
        selectChoice(endingText, "Another Game!", "Exit to main menu");
        localStorage.setItem("winsCount", JSON.stringify(winsCount + 1));
        gameResult = "win";
        phaseNumber = "";
        document.querySelector('.selectionNumber1').addEventListener("click", () => {
            window.location.href="game1.html";
        });

        document.querySelector('.selectionNumber2').addEventListener("click", () => {
            window.location.href="index.html";
        });

        document.querySelector('.phaseNumberTitle').innerHTML = "You have Won!!";
    } else {
        gameResult = "lose";
        selectChoice(endingText, "Another Game!", "Exit to main menu");

        document.querySelector('.selectionNumber1').addEventListener("click", () => {
            window.location.href="game1.html";
        });

        document.querySelector('.selectionNumber2').addEventListener("click", () => {
            window.location.href="index.html";
        });

        document.querySelector('.phaseNumberTitle').innerHTML = "You have lost..";
    }
}

//These are simply functions that shows the new text on the choices
let choice1 = () => {
    selectChoice("", "Follow the path towards the sound of a gentle waterfall.", "Take the narrow, dimly lit path leading deeper into the forest.");
    phaseNumber("second");
}

let choice2 = () => {
    selectChoice("", "Approach the old man sitting on a rock nearby and ask for his advice about the forest.", "Ignore the old man and explore other places.");
    phaseNumber("second");
}

let choice1A = () => {
    selectChoice("", "Take a sip from the magical spring and feel rejuvenated.", "Fill your water bottle with the spring's water to carry some with you.");
    phaseNumber("Third");
}

let choice1B = () => {
    selectChoice("", "Pluck the glowing flower and keep it with you.", "Step back and leave the flower undisturbed.");
    phaseNumber("Third");
}

let choice2A = () => {
    selectChoice("", "Graciously accept the old man's magical map and thank him.", "Politely decline the offer and rely on your instincts instead.");
    phaseNumber("Third");
}

let choice2B = () => {
    selectChoice("", "Head towards the bustling city.", "Take the path leading to a quiet village.");
    phaseNumber("Third");
}

let choice1Aa = () => {
    endingScreen("lose", "You feel invigorated but unknowingly consume too much of the enchanted water, turning into a forest spirit yourself and becoming one with the Enchanted Forest.");
    localStorage.setItem('record', JSON.stringify(recordElementContent.innerHTML));
    localStorage.setItem("previousGamesNumber", JSON.stringify(playingAmount));
}

let choice1Ab = () => {
    endingScreen("win", "The magical water grants you temporary powers, helping you overcome obstacles and discover hidden treasures. Your reputation as an adventurer grows, and you become known as the Forest Seeker.");;
    localStorage.setItem('record', JSON.stringify(recordElementContent.innerHTML));
    localStorage.setItem("previousGamesNumber", JSON.stringify(playingAmount));
}

let choice1Ba = () => {
    endingScreen("win", "The flower's magical essence enhances your senses, allowing you to detect dangers and secrets in the forest. You become a renowned herbalist, using the flower's powers to heal others.");
    localStorage.setItem('record', JSON.stringify(recordElementContent.innerHTML));
    localStorage.setItem("previousGamesNumber", JSON.stringify(playingAmount));
}

let choice1Bb = () => {
    endingScreen("win", "Although you don't take the flower, your kindness and respect for nature impress a group of forest creatures. They become your loyal companions, aiding you in your adventures.");
    localStorage.setItem('record', JSON.stringify(recordElementContent.innerHTML));
    localStorage.setItem("previousGamesNumber", JSON.stringify(playingAmount));
}


let choice2Aa = () => {
    endingScreen("win", "The magical map guides you safely through the forest, leading you to an ancient library hidden within. There, you discover lost knowledge that makes you a scholar and protector of the Enchanted Forest.");
    localStorage.setItem('record', JSON.stringify(recordElementContent.innerHTML));    localStorage.setItem("previousGamesNumber", JSON.stringify(playingAmount));
    localStorage.setItem("previousGamesNumber", JSON.stringify(playingAmount));
}

let choice2Ab = () => {
    endingScreen("win", "Without the old man's map, you navigate the forest solely by instinct. Though you face numerous challenges, your journey hones your survival skills, and you become known as the Wanderer of the Wilds.");
    localStorage.setItem('record', JSON.stringify(recordElementContent.innerHTML));
    localStorage.setItem("previousGamesNumber", JSON.stringify(playingAmount));
}

let choice2Ba = () => {
    endingScreen("win", "You find a successful career and settle in the city, but you always wonder about the mysteries you left behind in the Enchanted Forest.");
    localStorage.setItem('record', JSON.stringify(recordElementContent.innerHTML));
    localStorage.setItem("previousGamesNumber", JSON.stringify(playingAmount));
}

let choice2Bb = () => {
    endingScreen("win", "The village embraces you warmly, and you find love and peace in its simplicity. However, your adventurous spirit occasionally yearns for the excitement of the Enchanted Forest.");
    localStorage.setItem('record', JSON.stringify(recordElementContent.innerHTML));
    localStorage.setItem("previousGamesNumber", JSON.stringify(playingAmount));
}

//the record on click
document.querySelector('.btn__record').addEventListener("click", () => {
    const list = document.querySelector('li');
    toggleElement(infoElement);
    showElement(recordElementContainer);
    toggleElement(recordElementContainer);
    recordElementContent.innerHTML = JSON.parse(localStorage.getItem('record')) || "";
    recordElementContent.innerHTML === "" ? recordElementContent.innerHTML = "<li> You have no records yet.. go in a game!</li> " : recordElementContent.innerHTML = recordElementContent.innerHTML.replace("<li> You have no records yet.. go in a game!</li> ", "");
    while (playingAmount >= 10) {
        removeOldestLine();
        playingAmount--;
    }
});

//the reset on click
document.querySelector('.btn__reset').addEventListener("click", () => {
    recordElementContent.innerHTML = "";
    playingAmount = 0;
    winsCount = 0;
    localStorage.setItem('record', JSON.stringify(recordElementContent.innerHTML));
    localStorage.setItem("previousGamesNumber", JSON.stringify(playingAmount));
    localStorage.setItem("winsCount", JSON.stringify(winsCount));
});

//the return on click
document.querySelector('.backBtn').addEventListener("click", () => {
    toggleElement(infoElement);
    hideElement(recordElementContainer);
});