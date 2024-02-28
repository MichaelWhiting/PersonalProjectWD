
class HangmanGame {
    constructor(word, setWordStatus, currentGuess = 1, maxGuesses = 5, score = 0) {
        this.word = word;
        this.setWordStatus = setWordStatus;
        this.currentGuess = currentGuess
        this.maxGuesses = maxGuesses;
        this.score = score;
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
                    this.getScore();
                }

                return returnStr;
            } else {
                return wordStatus;
            }
        }
    }

    getScore(time = 1) {
        const gameScore = Math.floor((10 - (this.currentGuess / 100)) / time);
        this.score = gameScore;
        return gameScore;
    }
}

export default HangmanGame;