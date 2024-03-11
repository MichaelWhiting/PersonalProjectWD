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
    const formattedInput = input.toLowerCase(); // formats the word to lowercase and 
    return this.gameInfo[Object.keys(this.gameInfo)[0]].includes(formattedInput); // returns true if the guess is correct
  }

  getScore(guessedWords) {
    const set = new Set(guessedWords); // gets all of the unique guessedWords
    let score = 0;
    
    set.forEach((word) => { // loops through each unique word
      const formattedWord = word.toLowerCase(); // formats the word to be all lowercase
      if (this.gameInfo[Object.keys(this.gameInfo)[0]].includes(formattedWord)) { // checks if the guess is correct
        score += (word.length * 10) + 100; // each correct guess is +100 plus 10 for each letter of the word
      }
    });

    return score;
  }
}

export default CategoriesGame;