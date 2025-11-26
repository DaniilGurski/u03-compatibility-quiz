const STORAGE_KEY = "cookie_consent";

function hideModal() {
    const modal = document.querySelector(".cookie-consent");
    modal.setAttribute("hidden", "");
    document.body.style.overflow = ""
}

function showModal() {
    const modal = document.querySelector(".cookie-consent");
    modal.removeAttribute("hidden", "");
    document.body.style.overflow = "hidden"
}

function handleAccept() {
    setLocalStorageConsent("accepted");
    addAnalytics();
    hideModal()
}

function handleReject() {
    setLocalStorageConsent("rejected");
    removeAnalytics();
    hideModal()
}

function acceptButton(resolve) {
    const acceptButton = document.querySelector(".cookie-consent__button--accept");
    acceptButton.addEventListener("click", () => {
        handleAccept();
        resolve("accepted")
    })
}

function rejectButton(resolve) {
    const rejectButton = document.querySelector(".cookie-consent__button--reject");
    rejectButton.addEventListener("click", () => {
        handleReject();
        resolve("rejected")
    })
}

function modalTrigger() {
    const cookieModalTrigger = document.querySelector(".cookie-consent-trigger");
    cookieModalTrigger.addEventListener("click", () => {
        showModal()
    })
}

function getLocalStorageConsent() {
    return localStorage.getItem(STORAGE_KEY)
}

function setLocalStorageConsent(value) {
    localStorage.setItem(STORAGE_KEY, value)
}

function addAnalytics() {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocalhost) {
        document.cookie = "_ga_test=test_value; path=/";
        console.log("Analytics added (test cookie on localhost)");
        return
    }
    if (document.getElementById("ga-script")) return;
    const script = document.createElement("script");
    script.id = "ga-script";
    script["async"] = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-HY34VF7V3L";
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments)
    }
    window.gtag = gtag;
    gtag("js", new Date);
    gtag("config", "G-HY34VF7V3L");
    console.log("Analytics added")
}

function removeAnalytics() {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocalhost) {
        document.cookie = "_ga_test=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        console.log("Analytics removed (test cookie on localhost)");
        return
    }
    const script = document.getElementById("ga-script");
    if (script) {
        script.remove()
    }
    window.dataLayer = [];
    delete window.gtag;
    document.cookie.split(";").forEach(cookie => {
        const name = cookie.split("=")[0].trim();
        if (name.startsWith("_ga") || name.startsWith("_gid")) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`
        }
    });
    console.log("Analytics removed")
}
export function initCookieConsent() {
    modalTrigger();
    return new Promise(resolve => {
        const storedConsent = getLocalStorageConsent();
        acceptButton(resolve);
        rejectButton(resolve);
        if (storedConsent) {
            if (storedConsent === "accepted") {
                addAnalytics()
            }
            resolve(storedConsent);
            return
        }
        showModal()
    })
}