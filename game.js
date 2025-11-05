addEventListener("DOMContentLoaded", (event) => {

    let allCategories = "";
    let selectedCategory = "";


    // Get quiz data from localStorage

    function getQuizData() {

        const storedQuizData = localStorage.getItem("quizData")

        if (storedQuizData) {
            return JSON.parse(storedQuizData);
        } else {
            return {
                selectedCategory: "",
            }
        }
    }

    // Set quiz data to localStorage

    function setQuizData(quizData) {
        const quizDataAsString = JSON.stringify(quizData);
        localStorage.setItem("quizData", quizDataAsString)
    }

    // Fetch our JSON (questions.json)

    async function getQuestions() {
        try {
            const response = await fetch("/data/questions.json");
            const result = await response.json()
            //    console.log(result)
            allCategories = result.categories;
            loadCategories();
        } catch (error) {
            console.error("Could not get the JSON", error);
        }
    }

    getQuestions();

    // Load our categories

    function loadCategories() {
        const selectElement = document.querySelector(".category-select__field");

        selectElement.innerHTML = '<option value="">Browse...</option>';

        allCategories.forEach(category => {
            const optionElement = document.createElement("option");
            optionElement.value = category.id;
            optionElement.textContent = `${category.title} (${category.questions.length} questions)`;
            selectElement.appendChild(optionElement);
        });
    }

    setQuizData();


    // Is this a smart way to handle the changing between sections?

    function sectionScroller() {
        const nextSectionScroller = document.querySelectorAll(".screen__button");

        nextSectionScroller.forEach(button => {
            button.addEventListener("click", () => {
                const currentSection = button.closest("section");
                const nextSection = currentSection.nextElementSibling;

                if (nextSection) {
                    nextSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    currentSection.inert = true;
                    nextSection.inert = false;
                }
            });
        });
    }

    sectionScroller();

    // Countdown after turn
    // How can we get this to only trigger after the slide has loaded?

    // function nextPayerCountdown() {

    //     const countdown = document.querySelector(".screen__counter");

    //     countdown.textContent = "5";

    //     setTimeout(() => {
    //         countdown.textContent = "4";
    //     }, 1000);

    //     setTimeout(() => {
    //         countdown.textContent = "3";
    //     }, 2000);

    //     setTimeout(() => {
    //         countdown.textContent = "2";
    //     }, 3000);

    //     setTimeout(() => {
    //         countdown.textContent = "1";
    //     }, 4000);

    //     setTimeout(() => {
    //         countdown.textContent = "Go!";
    //     }, 5000);
    // };

    // nextPayerCountdown();

});


// What we need
//
// 0. Game state
// 1. Category selection
// 2. Name input for players
// 3. Statement/answer view
// 4. Transition screen
// 5. Results viev


// Workings
//
// 0. LocalStorage for persistence ("localStorage.setItem()" and "localStorage.getItem()")
// 1. Save Game state after : Category selection, Name input for players and Answer input
// 
//