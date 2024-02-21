
class HangmanGame {
    constructor(word, currentGuess = 0, maxGuesses = 5) {
        this.word = word;
        this.currentGuess = currentGuess
        this.maxGuesses = maxGuesses;
        this.checkGuess = (letter) => {
            // console.log(`Is ${letter} in ${this.word}`, this.word.includes(letter.toLowerCase()))

            if (this.word.includes(letter.toLowerCase())) {
                console.log(`${letter} IS in the word`);
            } else {
                console.log(`${letter} is NOT in the word`);
            }

            this.currentGuess += 1;
        }
        // this.timer = timer;
    }

    // checkGuess(letter) {
    //     if (this.word.includes(letter)) {
    //         console.log(`${letter} is not in the word`);
    //     } else {
    //         console.log(`${letter} is not in the word`);
    //     }

    //     this.currentGuess += 1;
    // }

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