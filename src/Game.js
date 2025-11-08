import CategoryManager from "./modules/CategoryManager.js";
import ScreenManager from "./modules/ScreenManager.js";
import PlayerInputManager from "./modules/PlayerInputManager.js";

export default class Game {
  constructor() {
    this.screenManager = new ScreenManager();
    this.categoryManager = new CategoryManager();
    this.playerInputManager = new PlayerInputManager();

    this.gameState = {
      playerOne: {
        name: "",
      },
      playerTwo: {
        name: "",
      },
      selectedCategory: "",
    };
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
    this.categoryManager.onSelect((categoryId) => {
      this.gameState.selectedCategory = categoryId;
    });

    this.playerInputManager.onSubmit((playerOne, playerTwo) => {
      this.gameState.playerOne = {
        name: playerOne,
      };
      this.gameState.playerTwo = {
        name: playerTwo,
      };
      this.startGame();
    });
  }
}
