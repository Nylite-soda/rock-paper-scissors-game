
let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
    };
updateScore();

let autoPlay = false;
let autoPlayID;

document.querySelector('.rock').addEventListener('click', () => {
    play("rock")
})
document.querySelector('.paper').addEventListener('click', () => {
    play("paper")
})
document.querySelector('.scissors').addEventListener('click', () => {
    play("scissors")
})
document.querySelector('.reset-button').addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score')
    toggleResults('hide');
    updateScore();
})
document.querySelector('.autoplay-button').addEventListener('click', () => {
    document.querySelector('.autoToggle').innerHTML = "Auto Playing..."
    if(!autoPlay){
        autoPlayID = setInterval(() => {
            play(pickComputerMove())
            autoPlay = true;
            }, 2000
        )
        autoPlay = true;
    } else {
        document.querySelector('.autoToggle').innerHTML = ""
        clearInterval(autoPlayID)
        autoPlay = false;
    }
})

function pickComputerMove(){
    randomNum = Math.random();

    if (randomNum < 1/3 ){
        computerMove = "rock";
    } else if (1/3 <= randomNum && randomNum < 2/3 ){
        computerMove = "paper";
    } else {
        computerMove = "scissors";
    }
    return computerMove;
}

function play(playerMove){
    pickComputerMove();
    if (playerMove === 'rock'){
        switch(computerMove){
            case 'rock':
                outcome = 'Tie!';
                break;
            case 'paper':
                outcome = 'You Lose!';
                break;
            case 'scissors':
                outcome = 'You Win!';
                break;
        }
    } else if (playerMove === 'paper'){
        switch(computerMove){
            case 'rock':
                outcome = 'You Win!';
                break;
            case 'paper':
                outcome = 'Tie!';
                break;
            case 'scissors':
                outcome = 'You Lose!';
                break;
        }
    } else {
        switch(computerMove){
            case 'rock':
                outcome = 'You Lose!';
                break;
            case 'paper':
                outcome = 'You Win!';
                break;
            case 'scissors':
                outcome = 'Tie!';
                break;
        }

    }

    switch(outcome){
        case 'You Win!':
            score.wins = score.wins + 1;
            break;
        case 'You Lose!':
            score.losses = score.losses + 1;
            break;
        case 'Tie!':
            score.ties = score.ties + 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    console.log(outcome);

    document.querySelector('.js-moves').innerHTML = `
    <span>
        <p class='player you'>You</p>
        <img src="images/${playerMove}.svg" class="move-icon2">
        <figcaption>${playerMove}</figcaption>
    </span>
    <span>
    <p class='player'>Computer</p>
        <img src="images/${computerMove}.svg" class="move-icon2">
        <figcaption>${computerMove}</figcaption>
    `;
    document.querySelector('.js-results').innerHTML = outcome;

    toggleResults('show');

    updateScore();
}

function updateScore(outcome){
    const scoredisplay = document.querySelector('.js-score');
    scoredisplay.innerHTML = `
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
    `
}

function toggleResults(display){
    if (display === 'show'){
        document.querySelectorAll('.hide').forEach((value) => {
                value.classList.remove('hide');
                value.classList.add('show');
            }
        );
    } else{
        document.querySelectorAll('.show').forEach((value) => {
            value.classList.remove('show');
            value.classList.add('hide');
            }
        );
    }
}