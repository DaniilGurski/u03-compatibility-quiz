import {
    gameState
} from "./main.js";
let timer = null;

function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
        gameState.completionTimeSeconds += 1
    }, 1e3)
}
export function stopTimer() {
    clearInterval(timer)
}
export function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    const pad = num => String(num).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
}
export function initTimer() {
    const startButton = document.getElementById("start-game-button");
    startButton.addEventListener("click", () => {
        console.log("Start timer");
        startTimer()
    })
}