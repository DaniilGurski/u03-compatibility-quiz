const screenNames = [
  "welcome",
  "rules",
  "category",
  "input",
  "ready",
  "question",
  "blackout",
  "result",
];
const screenElements = document.querySelectorAll("section");
const navigationButtons = document.querySelectorAll(
  "button[data-type='navigation']"
);

// Get playerState from local storage OR, if none exists, assign an empty object.
export const playerState = JSON.parse(
  localStorage.getItem("quiz-player-state")
) ?? { selectedCategory: "movies" };

const handleNavigationButtonClick = (e) => {
  try {
    const button = e.target;
    const screenName = button.dataset.to;

    changeScreen(screenName);
  } catch (error) {
    console.error(error.message);
  }
};

export function changeScreen(screenName) {
  if (!screenNames.includes(screenName)) {
    throw new Error(
      "screenName must be one of the following values: welcome | rules | category | input | ready | question | blackout | result"
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

navigationButtons.forEach((button) => {
  button.addEventListener("click", handleNavigationButtonClick);
});

changeScreen("welcome");
