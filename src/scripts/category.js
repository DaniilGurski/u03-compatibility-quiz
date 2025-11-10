import { setPlayerState } from "./playerState.js";

const categorySelect = document.getElementById("category-select");

// For each category in the categories array, create an option element and add it to the categorySelect element.
function createOptions(categories) {
  categories.forEach(({ id, title, questions }) => {
    const option = document.createElement("option");
    const questionCount = questions.length;

    option.textContent = `${title} (${questionCount} questions)`;
    option.value = id;
    categorySelect.appendChild(option);
  });
}

async function getQuestionCategories() {
  try {
    const res = await fetch("/src/data/questions.json");

    if (!res.ok) {
      throw new Error("Network error");
    }

    const json = await res.json();
    createOptions(json.categories);

    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// When user selects new category, save it in the playerState object and in local storage.
categorySelect.addEventListener("change", (e) => {
  setPlayerState({ selectedCategory: e.target.value });
});

getQuestionCategories();
