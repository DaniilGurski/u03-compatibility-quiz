import { changeScreen, playerState } from "../../index.js";

// Elements
const playersForm = document.getElementById("players-form");
const playerOneInput = playersForm.querySelector("#player-one");
const playerTwoInput = playersForm.querySelector("#player-two");

playersForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const trimmedPlayerOneValue = playerOneInput.value.trim(" ");
  const trimmedPlayerTwoValue = playerTwoInput.value.trim(" ");

  /* TODO: Use .player-input__error to display errors ? */
  if (trimmedPlayerOneValue === "" || trimmedPlayerTwoValue === "") {
    return alert("All inputs must be filled !");
  }

  // If validation is successful, save the players names in the playerState object, store it in local storage, and proceed to the next screen.
  playerState.playerOne = trimmedPlayerOneValue;
  playerState.playerTwo = trimmedPlayerTwoValue;

  localStorage.setItem("quiz-player-state", JSON.stringify(playerState));

  changeScreen("ready");
});
