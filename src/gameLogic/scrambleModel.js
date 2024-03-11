

class ScrambleGame {
    constructor(word = "default") {
        this.word = word;
    }

    getScore(time) { // finish scoring logic later
        console.log(time)
        const score = Math.floor((1000 *  (1 - (time * 0.021))));       
        console.log(score)
        return score;
    }
}

export default ScrambleGame;