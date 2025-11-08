import Game from "./Game.js";

async function initGame() {
  try {
    const game = new Game();
    await game.init();
  } catch (error) {
    console.error("Failed to initialize game:", error);
  }
}

initGame();
