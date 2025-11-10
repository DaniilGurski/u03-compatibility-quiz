# Handoff screen
The purpose of the handoff screen is to allow for the players to pass the device they're playing on. The handoff screen will display a greeting from [questions.json](/src/data/questions.json) (handoffMessage) along with the players name.

- ``<span class="screen__title__text screen__title__text--greeting"></span>`` is populated by the names of the players
- ``<span class="screen__title__text screen__title__text--username"></span>`` is populated by a random "handoffMessage"

For example "Spicy take, Sarah".

The last time this screen is showed, it will instad simply say "All done, let's see how you answered", and the button will show "Show reults".

For a quiz category with 5 questions, that will happen on the 10th time this screen is showed to the players.

## Handoff screen markup

``
        <section class="screen" data-screen="handoff">
            <div class="screen__content">
                <h1 class="screen__title">
                    <span class="screen__title__text screen__title__text--greeting"></span>
                    <span class="screen__title__text screen__title__text--username"></span>
                </h1>
                <p class="screen__subtitle">
                    Answer recorded. Now close your eyes and pass the device.
                </p>
                <button class="screen__button" data-type="navigation" data-to="result">Hand it over</button>
            </div>
        </section>
``