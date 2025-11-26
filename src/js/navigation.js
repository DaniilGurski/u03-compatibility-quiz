export function showScreen(screenName) {
    const allScreens = document.querySelectorAll("section");
    allScreens.forEach(screenElement => {
        screenElement.classList.toggle("hidden", screenElement.dataset.screen !== screenName);
        screenElement.classList.toggle("screen", screenElement.dataset.screen === screenName)
    });
    console.log(`Showing screen: ${screenName}`);
    if (screenName === "ready" && window.updateReadyScreen) {
        window.updateReadyScreen()
    } else if (screenName === "question" && window.updateQuestionScreen) {
        window.updateQuestionScreen()
    } else if (screenName === "handoff" && window.updateHandoffScreen) {
        window.updateHandoffScreen()
    } else if (screenName === "result" && window.updateResultScreen) {
        window.updateResultScreen()
    }
}

function setupNavigationButtons() {
    const navigationButtons = document.querySelectorAll('[data-type="navigation"]');
    navigationButtons.forEach(button => {
        const isInsideForm = button.closest("form");
        if (isInsideForm) {
            return
        }
        button.addEventListener("click", () => {
            const destinationScreen = button.getAttribute("data-to");
            if (destinationScreen) {
                showScreen(destinationScreen)
            }
        })
    })
}
export function initNavigation() {
    setupNavigationButtons();
    showScreen("welcome")
}