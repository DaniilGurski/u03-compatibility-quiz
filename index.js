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

    if (screenName === "ready") populateReadyScreen();

    changeScreen(screenName);
  } catch (error) {
    console.error(error.message);
  }
};

export function changeScreen(screenName) {
  const screenElements = document.querySelectorAll("section[data-screen]");

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

window.changeScreen = changeScreen;

// Populate the READY screen with greeting + player name
function populateReadyScreen() {
  const readyEl = document.querySelector('section[data-screen="ready"]');
  if (!readyEl) {
    console.warn("Ready screen not found");
    return;
  }

  const greetingEl = readyEl.querySelector(".screen__title__text--greeting");
  const usernameEl = readyEl.querySelector("screen__title__text--username");

  const greetings = [
    "Ready",
    "Prepare yourself",
    "Focus up",
    "Hey",
    "You're up",
  ];

  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)] + ",";

  let playerName = "Player";
  try {
    const fromLS = localStorage.getItem("player1");
    if (fromLS) {
      playerName = fromLS;
    } else if (typeof getSavedPlayers === "function") {
      const saved = getSavedPlayers();
      if (saved && saved.player1) playerName = saved.player1;
    } else {
      const maybe = document.querySelector("#player-one")?.value?.trim();
      if (maybe) playerName = maybe;
    }
  } catch (e) {}

  if (greetingEl) greetingEl.textContent = randomGreeting;
  if (usernameEl) usernameEl.textContent = playerName;
}

window.populateReadyScreen = populateReadyScreen;

// MAIN INITIALIZATION (DOM READY)
document.addEventListener("DOMContentLoaded", () => {
  // Make thr first screen visible
  const firstScreen = document.querySelector(".screen");
  if (firstScreen) firstScreen.classList.add("is-active");

  // Navigation buttons (fallback if not defined globally)
  const navigationButtons = Array.from(
    document.querySelectorAll('button[data-type="navigation"]')
  );
  navigationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const to = button.dataset.to;
      if (!to) return;

      if (typeof window.changeScreen === "function") {
        window.changeScreen(to);
        return;
      }
      // Simple fallback navigation
      document
        .querySelectorAll("section.screen")
        .forEach((s) => s.classList.remove("is-active"));
      const next = document.querySelector(
        `section.screen[data-screen="${to}"]`
      );
      if (next) next.classList.add("is-active");
    });
  });

  // Handle the player input form
  const playersForm = document.querySelector("#players-form");
  if (playersForm) {
    playersForm.addEventListener("submit", (ev) => {
      ev.preventDefault();

      const p1 = document.querySelector("#player-one")?.value.trim();
      const p2 = document.querySelector("#player-two")?.value.trim();

      if (!p1 || !p2) {
        const err = playersForm.querySelector(".player-input__error");
        if (err) err.textContent = "Please enter both names";
        return;
      }

      try {
        localStorage.setItem("player1", p1);
        localStorage.setItem("player2", p2);
      } catch (e) {}

      populateReadyScreen();
    });
  }

  // Show the welcome screen at start
  if (typeof window.changeScreen === "function") {
    window.changeScreen("ready");
  }
  try {
    window.changeScreen("ready");
  } catch (e) {}
  // fallback navigation
  document
    .querySelectorAll("section.screen")
    .forEach((s) => s.classList.remove("is-active"));
  const ready = document.querySelector('section.screen[data-screen="ready"]');
  if (ready) ready.classList.add("is-active");
});

if (typeof window.changeScreen === "function") {
  try {
    window.changeScreen("welcome");
  } catch (e) {}
} else {
  const welcome = document.querySelector('section[data-screen="welcome"]');
  if (welcome) {
    document
      .querySelectorAll("section[data-screen]")
      .forEach((s) => s.classList.remove("is-active"));
    welcome.classList.add("is-active");
  } else {
    document
      .querySelectorAll("section[data-screen]")
      .forEach((s) => s.classList.remove("is-active"));
    const ready = document.querySelector('section.screen[data-screen="ready"]');
    if (ready) ready.classList.add("is-active");
  }
}
