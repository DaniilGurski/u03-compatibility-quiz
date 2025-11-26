import {
    gameState
} from "./main.js";
export async function loadQuestions() {
    try {
        const response = await fetch("/src/data/questions.json");
        if (!response.ok) {
            throw new Error(`Failed to load questions: ${response.status}`)
        }
        const questionsData = await response.json();
        gameState.questionsData = questionsData;
        console.log(`Loaded ${questionsData.categories.length} categories`);
        return questionsData
    } catch (error) {
        console.error("Error loading questions:", error);
        throw error
    }
}
export function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)]
}