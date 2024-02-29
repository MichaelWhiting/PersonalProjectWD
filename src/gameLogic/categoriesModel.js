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

    if (fruits.includes(formattedInput)) {
      console.log(formattedInput, "is in fruits!");
    } else {
      console.log(formattedInput, "is NOT in fruits!");
    }
  }
}

export default CategoriesGame;