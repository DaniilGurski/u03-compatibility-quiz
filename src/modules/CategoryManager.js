export default class CategoryManager {
  constructor() {
    this.categories;
    this.categorySelect = document.getElementById("category-select");

    this.listeners = [];

    this.setupEventListeners();
  }

  createOptions() {
    this.categories.forEach(({ id, title, questions }) => {
      const option = document.createElement("option");
      const questionCount = questions.length;

      option.textContent = `${title} (${questionCount} questions)`;
      option.value = id;
      this.categorySelect.appendChild(option);
    });
  }

  async loadCategories() {
    try {
      const res = await fetch("/src/data/questions.json");

      if (!res.ok) {
        throw new Error("Network error");
      }

      const json = await res.json();
      this.categories = json.categories;
      this.createOptions();

      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

  setupEventListeners() {
    this.categorySelect.addEventListener("change", (e) => {
      this.notifyEventListeners(e.target.value);
    });
  }

  onSelect(callback) {
    this.listeners.push(callback);
  }

  notifyEventListeners(categoryId) {
    this.listeners.forEach((callback) => callback(categoryId));
  }
}
