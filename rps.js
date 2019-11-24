let pScore = 0;
let cScore = 0;
let lastPlay = ['', ''];

function setPScore(newScore) { pScore = newScore; }
function getPScore() { return pScore; }
function setCScore(newScore) { cScore = newScore; }
function getCScore() { return cScore; }
function resetScore() { setPScore(0); setCScore(0); }

function isWin() {
    if (getPScore() >= 5) {
        return 'Player';
    } else if (getCScore() >= 5) {
        return 'Computer';
    } else {
        return undefined;
    }
}

function computerPlay() {
    let options = ['Rock', 'Paper', 'Scissors'];
    let choice = Math.floor(Math.random() * 3);
    return options[choice];
}

function playRound(playerSelection, computerSelection) {
    let roundOutcome;

    switch (playerSelection) {

        case 'Paper':
            if (computerSelection == 'Rock') roundOutcome = 'win';
            else if (computerSelection == 'Paper') roundOutcome = 'tie';
            else roundOutcome = 'lose';
            break;

        case 'Rock':
            if (computerSelection == 'Scissors') roundOutcome = 'win';
            else if (computerSelection == 'Rock') roundOutcome = 'tie';
            else roundOutcome = 'lose';
            break;

        case 'Scissors':
            if (computerSelection == 'Paper') roundOutcome = 'win';
            else if (computerSelection == 'Scissors') roundOutcome = 'tie';
            else roundOutcome = 'lose';
            break;
    }
    return roundOutcome;
}


function handleClick(e) {
    if (e.target.innerText == "Reset") {
        resetScore();
        updateDisplay('reset');
        return;
    }

    lastPlay[0] = e.target.innerText;
    lastPlay[1] = computerPlay();
    const roundOutcome = playRound(lastPlay[0], lastPlay[1]);

    addPoints(roundOutcome);
    updateDisplay(roundOutcome, isWin());
}

function addPoints(roundOutcome) {
     switch (roundOutcome) {
        case 'win':
            setPScore(getPScore() + 1);
            break;
        case 'lose':
            setCScore(getCScore() + 1);
            break;
     }
}

function updateDisplay(roundOutcome, gameOver=undefined) {
    msgNum = ['win','lose','tie','reset'].indexOf(roundOutcome);
    const pPlay = lastPlay[0];
    const cPlay = lastPlay[1];

    const resultMessages = [
        'You win! ' + lastPlay[0] + ' beats ' + lastPlay[1] + '!',
        'You lose :( - ' + lastPlay[0] + ' loses to ' + lastPlay[1] + '!',
        'Tie! Both ' + lastPlay[0] + '!',
        'Click an option to begin playing - First to 5 wins!'
    ]

    document.querySelector('#display').textContent = resultMessages[msgNum];
    document.querySelector("#computerScore").innerText = getCScore();
    document.querySelector("#playerScore").innerText = getPScore();

    if (gameOver) {
        document.querySelector('#winMessage').textContent = gameOver + ' wins!!';
        document.querySelector('#winMessageContainer').classList.remove('hidden');
    } 

    if (msgNum == 3) {
        document.querySelector('#winMessageContainer').classList.add('hidden');
    }

    return;
}

const btns = document.querySelectorAll(`button`);
for (let i=0; i<btns.length; i++) {
    btns[i].addEventListener('click', handleClick);
}