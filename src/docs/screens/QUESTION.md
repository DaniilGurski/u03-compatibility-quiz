# Question screen
The questions screen handles showing each player a question and recording each answer. The questions all come from [questions.json](/src/data/questions.json). The players can chose to "Agree", "Disagree" or be "Neutral" to a question/statemanet.

If a quiz category contains 5 questions, the question screen will be displayed a total of 10 times (each user gets to see each question)

## Elements to be populated by JavaScript

- ``<span class="question-form__player-name"></span>`` is a tag and indicated which players' turn there is. Example "Sarah's turn"
- ``<span class="question-form__progress-current"></span>`` shows which question is currently active. Example "Question 2"
- ``<span class="question-form__progress-total"></span>`` show the total amount of questions in the category (lenght). Example "of 5"
- ``<span class="question-form__fieldset-text"></span>`` show the questions text
- ``<span class="answer-option__text"></span>`` shows either "Agree, "Disagree" or "Neutral" based on the value or data-attribute of the corresponding input


## Ready screen markup

``
        <section class="screen" data-screen="question">
            <div class="screen__content">
                <form class="question-form">
                    <fieldset class="question-form__fieldset">
                        <legend class="question-form__legend">
                            <span class="question-form__player-name"></span>
                            <div class="question-form__legendquestion-form__progress">
                                <span class="question-form__progress-current"></span>
                                <span class="question-form__progress-total"></span>
                            </div>
                            <span class="question-form__fieldset-text"></span>
                        </legend>

                        <div class="answer-option" data-answer="agree">
                            <label for="q1_a1" class="answer-option__label">
                                <input type="radio" id="q1_a1" name="question1" value="agree" data-answer="agree"
                                    class="answer-option__input" />
                                <span class="answer-option__text"></span>
                            </label>
                        </div>

                        <div class="answer-option" data-answer="disagree">
                            <label for="q1_a2" class="answer-option__label">
                                <input type="radio" id="q1_a2" name="question1" value="disagree" data-answer="disagree"
                                    class="answer-option__input" />
                                <span class="answer-option__text"></span>
                            </label>
                        </div>

                        <div class="answer-option" data-answer="neutral">
                            <label for="q1_a3" class="answer-option__label">
                                <input type="radio" id="q1_a3" name="question1" value="neutral" data-answer="neutral"
                                    class="answer-option__input" />
                                <span class="answer-option__text"></span>
                            </label>
                        </div>

                        <button class="screen__button" data-type="navigation" data-to="handoff">Lock in and
                            continue</button>
                    </fieldset>
                </form>
            </div>
        </section>
``