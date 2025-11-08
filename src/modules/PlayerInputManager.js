export default class PlayerInputManager {
  constructor() {
    this.playersForm = document.getElementById("players-form");
    this.playerOneInput = this.playersForm.querySelector("#player-one");
    this.playerTwoInput = this.playersForm.querySelector("#player-two");
    this.listeners = [];

    this.setupEventListener();
  }

  validate(playerOne, playerTwo) {
    if (playerOne === "" || playerTwo === "") {
      alert("All inputs must be filled !");
      return false;
    }

    return true;
  }

  setupEventListener() {
    this.playersForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const playerOne = this.playerOneInput.value.trim();
      const playerTwo = this.playerTwoInput.value.trim();

      if (this.validate(playerOne, playerTwo) === false) {
        return;
      }

      this.notifyEventListeners(playerOne, playerTwo);
    });
  }

  onSubmit(callback) {
    this.listeners.push(callback);
  }

  notifyEventListeners(playerOne, playerTwo) {
    this.listeners.forEach((callback) => callback(playerOne, playerTwo));
  }
}
