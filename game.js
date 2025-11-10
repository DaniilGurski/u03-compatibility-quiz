// ============================================================================
// PLAYER STATE MANAGEMENT
// ============================================================================

// Get playerState from local storage OR, if none exists, assign an empty object.
let playerState = JSON.parse(localStorage.getItem("quiz-player-state")) ?? {
  selectedCategory: "movies",
};

function getPlayerState() {
  return playerState;
}

function setPlayerState(newState) {
  playerState = { ...playerState, ...newState };
  localStorage.setItem("quiz-player-state", JSON.stringify(playerState));

  return playerState;
}

// ============================================================================
// SCREEN NAVIGATION
// ============================================================================

const screenNames = [
  "welcome",
  "rules",
  "category",
  "input",
  "ready",
  "question",
  "handoff",
  "result",
];
const screenElements = document.querySelectorAll("section");
const navigationButtons = document.querySelectorAll(
  "button[data-type='navigation']"
);

function changeScreen(screenName) {
  if (!screenNames.includes(screenName)) {
    throw new Error(
      "screenName must be one of the following values: welcome | rules | category | input | ready | question | handoff | result"
    );
  }

  // Hide all screens (sections) except the one with the passed screen name
  screenElements.forEach((screenElement) => {
    screenElement.classList.toggle(
      "hidden",
      screenElement.dataset.screen !== screenName
    );

    /* Removes screen class from hidden screens to avoid conflicts */
    screenElement.classList.toggle(
      "screen",
      screenElement.dataset.screen === screenName
    );
  });
}

const handleNavigationButtonClick = (e) => {
  try {
    const button = e.target;
    const screenName = button.dataset.to;

    changeScreen(screenName);
  } catch (error) {
    console.error(error.message);
  }
};

navigationButtons.forEach((button) => {
  button.addEventListener("click", handleNavigationButtonClick);
});

// Initialize to welcome screen
changeScreen("welcome");

// ============================================================================
// CATEGORY SELECTION
// ============================================================================

const categorySelect = document.getElementById("category-select");

// For each category in the categories array, create an option element and add it to the categorySelect element.
function createOptions(categories) {
  categories.forEach(({ id, title, questions }) => {
    const option = document.createElement("option");
    const questionCount = questions.length;

    option.textContent = `${title} (${questionCount} questions)`;
    option.value = id;
    categorySelect.appendChild(option);
  });
}

async function getQuestionCategories() {
  try {
    const res = await fetch("/src/data/questions.json");

    if (!res.ok) {
      throw new Error("Network error");
    }

    const json = await res.json();
    createOptions(json.categories);

    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// When user selects new category, save it in the playerState object and in local storage.
categorySelect.addEventListener("change", (e) => {
  setPlayerState({ selectedCategory: e.target.value });
});

getQuestionCategories();

// ============================================================================
// PLAYER INPUT
// ============================================================================

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
  setPlayerState({
    playerOne: trimmedPlayerOneValue,
    playerTwo: trimmedPlayerTwoValue,
  });

  changeScreen("ready");
});
