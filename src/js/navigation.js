/**
 * NAVIGATION.JS
 *
 * Responsible for: Screen navigation and showing/hiding screens
 * Person: Team lead or most experienced person
 */

// ==========================================
// NAVIGATION FUNCTIONS
// ==========================================

/**
 * Shows a specific screen and hides all others
 * @param {string} screenName - The data-screen value (e.g., 'welcome', 'category')
 */
export function showScreen(screenName) {
  // Hide all screens and show only the requested one
  const allScreens = document.querySelectorAll('section');

  allScreens.forEach(screenElement => {
    // Add 'hidden' class to all screens except the target
    screenElement.classList.toggle('hidden', screenElement.dataset.screen !== screenName);

    // Toggle 'screen' class (remove from hidden screens to avoid conflicts)
    screenElement.classList.toggle('screen', screenElement.dataset.screen === screenName);
  });

  console.log(`Showing screen: ${screenName}`);

  // Update dynamic screens when they become active
  if (screenName === 'ready' && window.updateReadyScreen) {
    window.updateReadyScreen();
  } else if (screenName === 'question' && window.updateQuestionScreen) {
    window.updateQuestionScreen();
  } else if (screenName === 'handoff' && window.updateHandoffScreen) {
    window.updateHandoffScreen();
  } else if (screenName === 'result' && window.updateResultScreen) {
    window.updateResultScreen();
  }
}

/**
 * Sets up navigation buttons throughout the app
 * Looks for buttons with data-type="navigation" and data-to="screenname"
 */
function setupNavigationButtons() {
  const navigationButtons = document.querySelectorAll('[data-type="navigation"]');

  navigationButtons.forEach(button => {
    // Skip buttons inside forms - they'll be handled by form validation
    const isInsideForm = button.closest('form');
    if (isInsideForm) {
      return;
    }

    button.addEventListener('click', () => {
      const destinationScreen = button.getAttribute('data-to');
      if (destinationScreen) {
        showScreen(destinationScreen);
      }
    });
  });
}

/**
 * Initialize the navigation system
 */
export function initNavigation() {
  // Set up all navigation buttons
  setupNavigationButtons();

  // Show the welcome screen by default
  showScreen('welcome');
}
