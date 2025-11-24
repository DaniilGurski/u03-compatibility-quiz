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

// The localStorage key (will get value "accepted" or "rejected")

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
    setLocalStorageConsent("accepted");
    addAnalytics();
    hideModal();
}

function handleReject() {
    setLocalStorageConsent("rejected");
    removeAnalytics();
    hideModal();
}

function acceptButton(resolve) {
    const acceptButton = document.querySelector(".cookie-consent__button--accept");
    acceptButton.addEventListener("click", () => {
        handleAccept();
        resolve("accepted");
    })
}

function rejectButton(resolve) {
    const rejectButton = document.querySelector(".cookie-consent__button--reject");
    rejectButton.addEventListener("click", () => {
        handleReject();
        resolve("rejected");
    })
}

function modalTrigger() {
    const cookieModalTrigger = document.querySelector(".cookie-consent-trigger");
    cookieModalTrigger.addEventListener("click", () => {
        showModal();
    })
}

function getLocalStorageConsent() {
    return localStorage.getItem(STORAGE_KEY);
}

function setLocalStorageConsent(value) {
    localStorage.setItem(STORAGE_KEY, value);

}

function addAnalytics() {
    console.log("Added analytics script.")
}

function removeAnalytics() {
    console.log("Removed analytics script.")
}

export function initCookieConsent() {
    modalTrigger();
    return new Promise((resolve) => {
        const storedConsent = getLocalStorageConsent();

        acceptButton(resolve);
        rejectButton(resolve);


        if (storedConsent) {
            if (storedConsent === "accepted") {
                addAnalytics();
            }
            resolve(storedConsent);
            return;
        }
        showModal()
    });
}