# Ready screen
The ready screen is displayed before every question. The purpose is to get the player ready. The markup is mostly static, however some parts and populated with JavaScript (the players names and a "readyMessage" from [questions.json](/src/data/questions.json)).

- ``<span class="screen__title__text screen__title__text--greeting"></span>`` is populated by the names of the players
- ``<span class="screen__title__text screen__title__text--username"></span>`` is populated by a random "readyMessage"

For example "You're up, Sarah".

## Ready screen markup

``
 <section class="screen" data-screen="ready">
            <div class="screen__content">
                <h1 class="screen__title">
                    <span class="screen__title__text screen__title__text--greeting"></span>
                    <span class="screen__title__text screen__title__text--username"></span>
                </h1>
                <p class="screen__subtitle">
                    Take a deep breath. Remember to answer honestly and make sure no
                    one's peeking!
                </p>
                <button class="screen__button" data-type="navigation" data-to="question">
                    I'm ready
                </button>
            </div>
        </section>
``