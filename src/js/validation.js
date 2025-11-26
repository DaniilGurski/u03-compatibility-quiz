const forms = document.querySelectorAll("form");
forms.forEach(form => {
    form.setAttribute("novalidate", "")
});
export function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.add("error--visible")
}
export function clearError(errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove("error--visible")
}
export function clearErrorOnInteraction(element, errorElement, eventType) {
    element.addEventListener(eventType, () => {
        clearError(errorElement)
    })
}