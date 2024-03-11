
class HangmanGame {
    constructor(word, setWordStatus, currentGuess = 1, maxGuesses = 5, score = 0) {
        this.word = word;
        this.setWordStatus = setWordStatus;
        this.currentGuess = currentGuess
        this.maxGuesses = maxGuesses;
        this.score = score;
        this.checkGuess = (letter, wordStatus) => {
            this.currentGuess += 1; // adds 
            if (this.word.includes(letter.toLowerCase())) { // checks if the word does include that letter
                const letters = word.split(""); // gets all of the letters that the word has
                const status = wordStatus.split(""); // gets all the chars/letters of the wordStatus

                for (let i = 0; i < letters.length; i++) { // iterates through each of the letters of the word
                    if (letters[i] === letter) { // finds the index of the correctly guessed letter
                        status[i] = letter; // updates wordStatus to show the correctly guessed letter
                    }
                }
                
                const returnStr = status.join(""); // joins all the "_" and letters back together
                if(!returnStr.includes("_")) { // checks to see if the game is over and the player has guessed the whole word
                    this.getScore(); // if so, gets the score
                }

                return returnStr; // returns the newly updated version of the wordStatus
            } else { // means the letter was not inside the word, therefore an incorrect guess
                return wordStatus;
            }
        }
    }

    getScore(time = 1) {
        const gameScore = Math.floor((1000 *  (1 - (time * 0.021))));  // Scores based on how long user took to solve
        this.score = gameScore;
        return gameScore;
    }
}

export default HangmanGame;