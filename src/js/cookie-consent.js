// 1. Check localStorage for for existing preference
// 2. If no preference, show modal and add overflow:hidden to body
// 3. Accept button = update/store preference, inject script and hide modal
// 4. Reject button update/store preference, remove script and hide modal
// 5. Trigger button = open modal regardless of preference


// showModal()
// hideModal()
// addAnalytics()
// removeAnalytics()
// handleAccept()
// handleReject()
// getLocalStorageConsent()
// setLocalStorageConsent()

// The localStorage key

const STORAGE_KEY = "cookie_consent";

function hideModal() {
    const modal = document.querySelector(".cookie-consent");
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
}

function showModal() {
    const modal = document.querySelector(".cookie-consent");
    modal.removeAttribute("hidden", "");
    document.body.style.overflow = "hidden";
}

function handleAccept() {
    const acceptButton = document.querySelector(".cookie-consent__button--accept");
}

function handleReject() {
    const acceptButton = document.querySelector(".cookie-consent__button--reject");
}

function modalTrigger() {
    const cookieModalTrigger = document.querySelector(".cookie-consent-trigger");
}

function getLocalStorageConsent() {

}

function setLocalStorageConsent() {

}

function addAnalytics() {

}

function removeAnalytics {
    
}

export function initCookieConsent() {
    return new Promise((resolve) => {

        resolve();
    });
}