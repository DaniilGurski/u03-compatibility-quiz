// Get playerState from local storage OR, if none exists, assign an empty object.
let playerState = JSON.parse(localStorage.getItem("quiz-player-state")) ?? {
  selectedCategory: "movies",
};

export function getPlayerState() {
  return playerState;
}

export function setPlayerState(newState) {
  playerState = { ...playerState, ...newState };
  localStorage.setItem("quiz-player-state", JSON.stringify(playerState));

  return playerState;
}
