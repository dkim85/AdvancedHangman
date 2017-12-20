// link to inquirer package
var inquirer = require('inquirer');
// link lisy of random words
var guessWordlist = require('./game.js');
// link word tester
var checkForLetter = require('./word.js');
// link to display letters
var lettersToDisplay =require('./letter.js');


// Global variables
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];
var displayHangman;

// game object

var game = {
	wordBank : guessWordlist, // import list of words
	remainingGuesses : 6,
	currentWrd: null, 

	startGame : function() {
		// get a random word for the array
		var j = Math.floor(Math.random() * this.wordBank.length);
		this.currentWrd = this.wordBank[j];

		// make sure the user has 6 guesses
		this.remainingGuesses = 6;

		// inform the user the game has begun
		console.log('Welcome to Advance Hangman, the Game. Developed by Danilo "el PapiChulo"');
		console.log('This game consist of guessing the name of a city worldwide!, you only have 6 chances cause this is veryyyy easy');
		console.log('The game has begun and good luck!');

		// show empty letters and guesses, etc.
		displayHangman = new lettersToDisplay(this.currentWrd);
		displayHangman.parseDisplay();
		console.log('left guesses' + game.remainingGuesses);

		// prompt for a letter
		keepPromptingUser();
	}
};

// user prompt function

function keepPromptingUser(){
	console.log('');
	// prompt for a new letter if enough guesses are left
	if(game.remainingGuesses > 0){
		inquirer.prompt([
		{
			type: "value",
			name: "letter",
			message: "Guess a Letter: "
		}
		]).then(function(userInput){
			// Collect Letter Input
			var inputLetter = userInput.letter.toLowerCase();
			// Valid input
			if (alphabet.indexOf(inputLetter) == -1){
				// tell user they did not guess a letter
				console.log('geeeeze man! "' + inputLetter + '" is not a letter. Try again dummy');
				console.log('Remaining Guesses' + game.remainingGuesses);
				console.log('Letters already guessed: ' + lettersAlreadyGuessed);
				keepPromptingUser();
			}
			else if(alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) !=-1){
				// tell user he got a letter
				console.log('great! you guessed a letter"' + inputLetter + '". Try again master');
				console.log('Remaining Guesses' + game.remainingGuesses);
				console.log('Letters already guessed: ' + lettersAlreadyGuessed);
				keepPromptingUser();
			}
			else{
				// Remove  the entry from the list of possible inputs
				lettersAlreadyGuessed.push(inputLetter);
				// check letter in the word
				var letterInWord = checkForLetter(inputLetter, game.currentWrd);
				// if the letter is in the word, update the letetr object 
				if(letterInWord){
				// Add to correct letter list
				lettersCorrectlyGuessed.push(inputLetter);
				// show the empty letters ( _ _ _ _ ) and guesses, etc.
				displayHangman = new lettersToDisplay(game.currentWrd, lettersCorrectlyGuessed);
				displayHangman.parseDisplay();
				// test is the user won
				if(displayHangman.winner){
					console.log('you win! my compa');
					return;
				}
				// not a win yet, so ask for another input and decrement guesses
				else{
					console.log('Guesses Left: ' + game.remainingGuesses);
					keepPromptingUser();
				}

			}
			// Otherwise , decrement guesses and re-prompt the old hangman object
			else{
				game.remainingGuesses--;

				displayHangman.parseDisplay();
				console.log('Guesses Left: ' + game.remainingGuesses);
				console.log('Letter already guesses: ' + lettersAlreadyGuessed);
				keepPromptingUser();
			}
			
		}
	});

  } 
  // if not enough guesses left m then user losses
  else{
  	console.log('ayayayayaiii!!!, you are a disgrace for humanity.');
  	console.log('try again you bum.');
  	console.log('Danilo, an immigrant with little knowledge in English can solve this.');
  }

}

 //  create a new game object using the constructor and start playing
 game.startGame();
