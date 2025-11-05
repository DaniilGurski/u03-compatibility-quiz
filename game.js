addEventListener("DOMContentLoaded", (event) => {

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

    function nextPayerCountdown() {

        const countdown = document.querySelector(".screen__counter");

        countdown.textContent = "3";

        setTimeout(() => {
            countdown.textContent = "2";
        }, 1000);

        setTimeout(() => {
            countdown.textContent = "1";
        }, 2000);

        setTimeout(() => {
            countdown.textContent = "Go!";
        }, 3000);

    };

    nextPayerCountdown();

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