var lettersToDisplay = function(word, goodGuesses){

	this.gameWord = word;
	this.goodLetters = goodGuesses;
	this.displayText = '';

	this.winner = false;

	// Function to display hangman word to user
	this.parseDisplay = function(){

	// Show  the user the hangman word to user
	var shown = '';

	// if a goodguess is not yet accomplished , then do a loop
	if(this.goodLetters == undefined){
		// console.log('testtt');
		for(var i =0; i < this.gameWord.length; i++){
		// console.log('testtt');
			// if not the letter
			shown += ' _ ';
		}
	  }
	  // Check the other letters in the loop
	  else{
	  	// Double for lop .... loop through the word itself 
	  	for(var i =0; i < this.gameWord.length; i++){
	  		var letterWasFound = false;

	  		for(var j = 0; j < this.goodLetters.length; j++){

	  		// if yes, the letter
	  		if(this.gameWord[i] == this.goodLetters[j]){
	  			shown += this.goodLetters[j];
	  			letterWasFound = true;
	  		}
	  	}
	  	// if nothing was found
	  	if(!letterWasFound){
	  		shown += ' _ ';
	  	}
	  }
	}

	// remove first/last space and console log 
	this.displayText = shown.trim();
	console.log(this.displayText);
	// Checl to see if the game was won 
	if(this.displayText == this.gameWord){
		this.winner = true;
	}
 }
};

module.exports = lettersToDisplay;