# Category screen
The category screen allows players to choose which quiz category they want to play. The dropdown menu is dynamically populated with all available categories from the [questions.json](/src/data/questions.json) file.

## Elements to be populated by JavaScript

### Category Dropdown Options
**Element:** `<select class="category-select__field" id="category-select">`

- **What:** A list of all available quiz categories with question counts
- **Source:** `categories` array from questions.json
- **Format:** "Category Title (X questions)" 
  - Example: "What movies do you prefer? (5 questions)"
  - Example: "Where and how do you want to live? (5 questions)"
- **When:** When the page first loads OR when the questions.json file has been fetched
- **Logic:** 
  - Loop through each category in the categories array
  - For each category, create an `<option>` element
  - Set the option's value to the category's `id` (e.g., "movies", "living")
  - Set the option's display text to `category.title + " (" + category.questions.length + " questions)"`
  - Append each option to the select element
  - Make sure there is an "empty category" with the text "Choose a category"
  - If no real category is selected, show a error message in `<span class="category-select__error" aria-live="assertive"></span>`

### What data to extract from each category
From questions.json, each category object contains:
- `id` - Used as the option's value attribute (e.g., "movies")
- `title` - The category name to display (e.g., "What movies do you prefer?")
- `questions` - An array of question objects
- `questions.length` - The number of questions (e.g., 5)

### Saving the selected category
- **What:** Store which category the players chose
- **When:** When the player changes the dropdown selection
- **Where to save:** In your game state (could be a variable, object, or localStorage)
- **What to save:** The category `id` (e.g., "movies", not the full title)
- **Why:** You'll need this later to know which questions to load during the game

## How it works for the user
1. Player navigates to the category screen
2. They see a dropdown with all available categories
3. They select one category from the list
4. The selection is saved
5. They click "Who's playing?" button to continue
6. If no category is selected and the user tried to go to the next step, an error message is displayed

## Example of what gets created
If questions.json has 5 categories, the select element will contain 6 options (5 categories and 1 "Choose a category"):

```html
<select class="category-select__field" id="category-select">
  <option value="">Choose a category</option>
  <option value="movies">What movies do you prefer? (5 questions)</option>
  <option value="living">Where and how do you want to live? (5 questions)</option>
  <option value="travel">What type of traveler are you? (5 questions)</option>
  <option value="sport">Assorted sport questions (5 questions)</option>
  <option value="cinema">Some statements about modern cinema (5 questions)</option>
</select>

Note: The actual options are created by JavaScript, not written in the HTML file.

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