
class HangmanGame {
    constructor(word, currentGuess = 0, maxGuesses = 5, setWordStatus) {
        this.word = word;
        this.currentGuess = currentGuess
        this.maxGuesses = maxGuesses;
        this.setWordStatus = setWordStatus;
        this.checkGuess = (letter, wordStatus) => {
            this.currentGuess += 1;
            if (this.word.includes(letter.toLowerCase())) {
                const letters = word.split("");
                const status = wordStatus.split("");

                for (let i = 0; i < letters.length; i++) {
                    if (letters[i] === letter) {
                        status[i] = letter;
                    }
                }
                
                const returnStr = status.join("");
                if(!returnStr.includes("_")) {
                    console.log("Player has won!")
                }
                return returnStr;
            } else {
               return wordStatus;
            }
        }
    }

    checkGameStatus() {
        if (this.currentGuess >= this.maxGuesses) {
            this.endGame();
        } else {
            console.log("Player still has more guesses, continuing")
        }
    }

    endGame() {
        console.log("Game over!")
    }
}
export default HangmanGame;