# Category screen
The category screen consists of some static HTML and some dynamically populated HTML. The ``<select>`` element will be populated by the categories in [questions.json](/src/data/questions.json). 

Each generated ``<option>`` element will contain:

- The name of the category
- The amount of questions (lenght) that category contains

In the game, the players choose a category togheter. We save their selection.

## Category screen markup

``
 <section class="screen" data-screen="category">
            <div class="screen__content">
                <h1 class="screen__title">Pick a category</h1>
                <p class="screen__subtitle">
                    First date? Start light with favorites and preferences. Long-term
                    couple? Go deep with values and dreams. Just hanging with friends?
                    Dive into the weird stuff.
                </p>

                <div class="category-select">
                    <label class="category-select__label" for="category-select">Select a category</label>
                    <select class="category-select__field" id="category-select" name="category">
                        <!-- The <options> will be poplated by JS bsed on the amount of categories in the .json file. It should show the name of the category + amount of questions (lenght) -->
                    </select>
                </div>

                <button class="screen__button" data-type="navigation" data-to="input">
                    Who's playing?
                </button>
            </div>
        </section>
``