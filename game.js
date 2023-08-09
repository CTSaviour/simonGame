
let sequence = [];
let humanSequence = [];
let level = 0 ;

//computer side
const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');

//player side
const heading = document.querySelector('.js-heading'); 
const tileContainer = document.querySelector('.js-container');


//computer side funtioning
function activeTile (color) {

    const tile = document.querySelector(`[data-tile = '${color}' ]`);
    const sound = document.querySelector(`[data-sound = '${color}']`);

    tile.classList.add('activated');
    sound.play();

    setTimeout ( () => { // setting timeout
        tile.classList.remove('activated'); // disappearing the activated button 
    }, 300);

}

function playRound(nextSequence) {

    nextSequence.forEach( (color, index) => {

        setTimeout(() => {
           activeTile(color); 
        }, (index+1) * 600);
    
    });

}
 
function nextStep () {

    const tiles = ['red', 'green', 'blue', 'yellow'];
    const randomNumber = tiles[Math.floor(Math.random() * tiles.length)];
    return randomNumber;

}

function nextLevel () {

    level += 1;

    tileContainer.classList.add('unclickable');
    info.textContent = 'Wait for the computer'
    heading.textContent = `Level ${level} of 20`;

    const nextSequence = [...sequence]; // copying all the elements from the array 'sequence' to the nextSequence 
    nextSequence.push(nextStep()); // inserting the genrated random numbers into the sequence

    playRound(nextSequence);

    sequence = [...nextSequence];

    setTimeout(() => {
        humanTurn(level);
    }, level * 600 + 1000);

}

function handleClick(tile) {
    
    const index = humanSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound = '${tile}']`);
    sound.play();

    const remainingTaps = sequence.length - humanSequence.length ;

    if (humanSequence[index] !== sequence[index]) {

        resetGame('Oops!GAME OVER, you pressed the wrong tile');


        setTimeout(() => {
            startGame();
        }, 1000);

        return;

    }

    if ( humanSequence.length === sequence.length) {

        if ( humanSequence.length === 20 ) {

            resetGame ("Congrats! you completed all the levels");
            return;

        }

        humanSequence = [];
        
        info.textContent = "Success! Keep going!";

        setTimeout(() => {
            nextLevel();
        }, 1000);

        return;

    }

    info.textContent = `Your turn : ${remainingTaps} Tap${remainingTaps > 1 ? 's' : ''}`;

}

function startGame () {

    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    info.textContent = 'Wait for the Computer';

    nextLevel();

}

tileContainer.addEventListener('click', event => {
    
    const {tile} = event.target.dataset;

    if (tile) handleClick(tile);

})

startButton.addEventListener('click', startGame);



//player side functioning
function resetGame (text) {

    alert(text);
    sequence = [];
    humanSequence = [];
    level = 0;
    startButton.classList.add('hidden');
    heading.textContent = 'Simon Game';
    info.classList.add('hidden');
    tileContainer.classList.add('unclickable');

}

function humanTurn () {

    tileContainer.classList.remove('unclickable');
    info.textContent = `Your turn : ${level} Tap${level > 1 ? 's' : ''}`

}