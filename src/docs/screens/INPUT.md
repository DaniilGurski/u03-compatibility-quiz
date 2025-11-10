# Input screen
The input screen is where we ask the players for the names they want to use while playing our game. We validate the user input to make sure the players:

- Have enetered at least one character each
- Have not entered the same name
- Other validation to be decided

When the players have enhetered their names they can proceed to the next screen.

## Input screen markup

``
        <section class="screen" data-screen="input">
            <div class="screen__content">
                <h1 class="screen__title">Who's playing?</h1>
                <p class="screen__subtitle">
                    Please remember to answer honestly. No screen-peeking! Press play to
                    start the game when you're ready. Good luck!
                </p>

                <form id="players-form">
                    <div class="screen__players">
                        <div class="player-input">
                            <label class="player-input__label" for="player-one">Player 1</label>
                            <input class="player-input__field" id="player-one" type="text" name="player-one"
                                minlength="1" placeholder="Daty McDate" />
                            <span class="player-input__error" aria-live="assertive"></span>
                        </div>
                        <div class="player-input">
                            <label class="player-input__label" for="player-two">Player 2</label>
                            <input class="player-input__field" id="player-two" type="text" name="player-two"
                                minlength="1" placeholder="Friendy McFriend" />
                            <span class="player-input__error" aria-live="assertive"></span>
                        </div>
                    </div>

                    <button class="screen__button" type="submit" data-type="navigation" data-to="ready">Start the game</button>
                </form>
            </div>
        </section>
``