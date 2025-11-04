addEventListener("DOMContentLoaded", (event) => {

    // Är det smart att anropa denna efter varje tryck på en knapp?

    function sectionScroller() {
        const nextSectionScroller = document.querySelectorAll(".screen-content__button");

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