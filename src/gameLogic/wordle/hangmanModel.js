class Hangman {
    constructor(word, currentGuess = 0, maxGuesses = 5) {
        this.word = word;
        this.currentGuess = currentGuess
        this.maxGuesses = maxGuesses;
        // this.timer = timer;
    }

    checkGuess(letter) {
        if (this.word.includes(letter)) {
            console.log(`${letter} is not in the word`);
        } else {
            console.log(`${letter} is not in the word`);
        }

        this.currentGuess += 1;
    }
}
