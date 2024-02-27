
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
                    this.saveGame();
                }

                return returnStr;
            } else {
                return wordStatus;
            }
        }
    }

    // checkGuess(letter, wordStatus) {
        
    // }

    saveGame(time) {
        const score = (this.word.length - this.currentGuess) * 100 / time
        console.log("score for this one is: ", score)
        return score;
    }
}

export default HangmanGame;