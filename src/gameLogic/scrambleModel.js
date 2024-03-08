

class ScrambleGame {
    constructor(word, currentOrder) {
        this.word = word;
        this.currentOrder = currentOrder;
    }

    checkOrder() {
        if (this.word === this.currentOrder) {
            console.log("Word is in correct order!");
            return true;
        }
    }

    endGame() {

    }
}

export default ScrambleGame;