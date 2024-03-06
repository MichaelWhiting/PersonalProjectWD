const defaultInfo = {
  "fruits": ["apple", "banana", "orange", "strawberry", "blueberry", "blackberry",
    "raspberry", "mango", "pineapple", "watermelon", "kiwi", "grape", "cherry", "peach", "pear", "papaya",
    "dragon fruit", "star fruit", "plum", "fig", "pomegranate", "guava", "lychee", "passion fruit", "apricot",
    "avocado", "coconut", "lemon", "lime", "date", "goji berry", "jackfruit", "kumquat", "mandarin", "nectarine",
    "olive", "persimmon", "plantain", "pummelo", "quince", "red currant", "black currant", "tangerine", "ugli fruit",
    "white currant", "yellow passion fruit", "canteloupe", "honeydew melon", "water apple", "soursop", "carambola",
    "mulberry", "elderberry", "gooseberry", "jambolan", "loquat", "marionberry", "miracle fruit", "monk fruit",
    "morinda", "mosambi", "muskmelon", "nance", "oheloberries", "orange melon", "oregon grape", "pawpaw", "pepino",
    "physalis", "pitaya", "prickly pear", "rambutan", "riberry", "rowan berries", "safou", "salak", "sapodilla",
    "sapote", "sea buckthorn", "sherbet berry", "sloe", "soncoya", "spondias", "surinam cherry", "sweet lime"]
}

class CategoriesGame {
  constructor(gameInfo = defaultInfo, timeLimit = 60) {
    this.gameInfo = gameInfo;
    this.timeLimit = timeLimit;
  }

  checkGuess(input) {
    const formattedInput = input.toLowerCase().split("").join(""); // filter((letter) => letter !== "")d
    return this.gameInfo[Object.keys(this.gameInfo)[0]].includes(formattedInput);
  }
  getScore(guessedWords) {
    const set = new Set(guessedWords);
    let score = 0;
    
    set.forEach((word) => {
      const formattedWord = word.toLowerCase();
      if (this.gameInfo[Object.keys(this.gameInfo)[0]].includes(formattedWord)) {
        score += (word.length * 10) + 100;
      }
    });

    return score;
  }
}

export default CategoriesGame;