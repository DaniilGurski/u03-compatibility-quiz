// Shared validation for category.js, input.js and question.js //

// Turn off HTML5 form validation because we use our own!
const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.setAttribute("novalidate", "");
});

export function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.add("error--visible");
}

export function clearError(errorElement) {
  errorElement.textContent = "";
  errorElement.classList.remove("error--visible");
}

// Shared event listner. Used to remove "error--visible" when the players starts to change input/interaction

export function clearErrorOnInteraction(element, errorElement, eventType) {
  element.addEventListener(eventType, () => {
    clearError(errorElement);
  });
}
