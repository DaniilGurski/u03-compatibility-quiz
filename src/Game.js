import CategoryManager from "./modules/CategoryManager.js";
import ScreenManager from "./modules/ScreenManager.js";
import PlayerInputManager from "./modules/PlayerInputManager.js";
import InterfaceManager from "./modules/InterfaceManager.js";

export default class Game {
  constructor() {
    this.screenManager = new ScreenManager();
    this.categoryManager = new CategoryManager();
    this.playerInputManager = new PlayerInputManager();
    this.interfaceManager = new InterfaceManager();
    this.questions;

    this.gameState = {
      playerOne: {
        name: "",
        answers: [],
      },
      playerTwo: {
        name: "",
        answers: [],
      },
      selectedCategory: "movies",
      currentPlayer: 1,
      currentQuestionIndex: 0,
    };

    this.selectedOption = "";
  }

  async init() {
    try {
      await this.categoryManager.loadCategories();

      this.screenManager.changeScreen("welcome");
      this.screenManager.setupNavigationButtons();

      this.setupEventListeners();
    } catch (error) {
      console.error(error.message);
    }
  }

  setupEventListeners() {
    // Update selected category when user selects new category
    this.categoryManager.onSelect((e) => {
      this.gameState.selectedCategory = e.target.value;
    });

    // Update player data when player form input is submitted and start the game
    this.playerInputManager.onSubmit((playerOne, playerTwo) => {
      this.gameState.playerOne = {
        name: playerOne,
        answers: [],
      };
      this.gameState.playerTwo = {
        name: playerTwo,
        answers: [],
      };

      this.startGame();
    });

    // Switch player turn, save player answer and move to handover / blackout screen
    this.interfaceManager.onQuizContinue((e) => {
      e.preventDefault();

      if (!this.selectedOption) {
        return alert("Choose an option");
      }

      const currentPlayer =
        this.gameState.currentPlayer === 1
          ? this.gameState.playerOne
          : this.gameState.playerTwo;

      currentPlayer.answers.push(this.selectedOption);
      this.screenManager.changeScreen("blackout");
    });

    this.interfaceManager.onAnswerChange((selectedOption) => {
      this.selectedOption = selectedOption;
    });
  }

  startGame() {
    this.screenManager.changeScreen("ready");

    // Load questions by selected category
    this.questions = this.categoryManager.categories.find(
      (category) => category.id === this.gameState.selectedCategory
    ).questions;

    // Set display of total questions
    this.interfaceManager.displayQuizLength(this.questions.length);

    // Decide who is the current player
    const currentPlayer =
      this.gameState.currentPlayer === 1
        ? this.gameState.playerOne
        : this.gameState.playerTwo;

    const currentQuestion = this.questions[this.gameState.currentQuestionIndex];
    const currentQuestionIndex = this.gameState.currentQuestionIndex;

    // Populate screens
    this.interfaceManager.populateReadyScreen(currentPlayer.name);
    this.interfaceManager.populateQuestionScreen(
      currentPlayer.name,
      currentQuestionIndex,
      currentQuestion
    );
  }
}
