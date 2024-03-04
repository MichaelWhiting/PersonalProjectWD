const fruits = [
  "apple", "banana", "cherry", "date", "elderberry",
  "fig", "grape", "honeydew", "italian plum", "jackfruit",
  "kiwi", "lemon", "mango", "nectarine", "orange",
  "papaya", "quince", "raspberry", "strawberry", "tangerine",
  "ugli fruit", "victoria plum", "watermelon", "xigua",
  "yellow passion fruit", "zucchini", "blueberry", "cantaloupe",
  "dragon fruit", "elderberry"
];

class CategoriesGame {
  constructor(timeLimit = 60, category = "fruits") {
    this.timeLimit = timeLimit;
    this.category = category;
  }

  checkGuess(input) {
    const formattedInput = input.toLowerCase().split("").filter((letter) => letter !== " ").join("");
    return fruits.includes(formattedInput);
  }

  getScore(guessedWords) {
    const set = new Set(guessedWords);
    let score = 0;

    set.forEach((word) => {
      const formattedWord = word.toLowerCase();

      if (fruits.includes(formattedWord)) {
        score += (word.length * 10) + 100;
      }
    });

    return score;
  }
}

export default CategoriesGame;