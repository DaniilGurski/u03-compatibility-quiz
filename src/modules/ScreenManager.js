export default class ScreenManager {
  constructor() {
    this.screenNames = [
      "welcome",
      "rules",
      "category",
      "input",
      "ready",
      "question",
      "blackout",
      "result",
    ];

    this.screenElements = document.querySelectorAll("section");


    this.navigationButtons = document.querySelectorAll(
      "button[data-type='navigation']"
    );
  }

  changeScreen(screenName) {
    if (!this.screenNames.includes(screenName)) {
      throw new Error(
        "screenName must be one of the following values: welcome | rules | category | input | ready | question | blackout | result"
      );
    }

    // Hide all screens (sections) except the one with the passed screen name
    this.screenElements.forEach((screenElement) => {
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

  setupNavigationButtons() {
    this.navigationButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        try {
          const button = e.target;
          const screenName = button.dataset.to;

          this.changeScreen(screenName);
        } catch (error) {
          console.error(error.message);
        }
      });
    });
  }
}
