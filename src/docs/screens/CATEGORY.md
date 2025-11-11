# Category screen

The category screen allows players to choose which quiz category they want to play. The dropdown menu needs to be populated with all available categories from [questions.json](/src/data/questions.json).

## What this screen does

This screen needs to:
1. Load all categories from questions.json
2. Create a dropdown option for each category
3. Show the category title and question count for each option
4. Save the selected category when the player chooses one
5. Validate that a category is selected before continuing
6. Show an error if they try to continue without selecting

---

## Elements that need content

### Category Dropdown Options
**Element:** `<select class="category-select__field" id="category-select">`

**What it should contain:**
Multiple `<option>` elements - one for each category, plus a default "Choose a category" option.

**Format for each option:**
"Category Title (X questions)"

**Examples:**
- "What movies do you prefer? (5 questions)"
- "Where and how do you want to live? (5 questions)"
- "What type of traveler are you? (5 questions)"

**Where the data comes from:**
The `categories` array in [questions.json](/src/data/questions.json). Each category has:
- `id` - Use this as the option's value (e.g., "movies", "living")
- `title` - The category name to display (e.g., "What movies do you prefer?")
- `questions` - An array of questions. Count the length to show "(X questions)"

---

## Saving the Selection

**What to save:**
The category ID (e.g., "movies") - NOT the full title.

**When to save:**
When the player selects a category from the dropdown.

**Why it's needed:**
You'll need the category ID later to load the correct questions during the game.

---

## Validation

Before allowing navigation to the input screen:
- Check if a category has been selected
- If the dropdown is empty or still shows "Choose a category", show an error

**Error element:** `<span class="category-select__error" aria-live="assertive"></span>`
**Error message:** "Please select a category"

---

## Example

If questions.json has 5 categories, the dropdown will contain 6 options total:

**The completed select element would look like:**
```html
<select class="category-select__field" id="category-select">
  <option value="">Choose a category</option>
  <option value="movies">What movies do you prefer? (5 questions)</option>
  <option value="living">Where and how do you want to live? (5 questions)</option>
  <option value="travel">What type of traveler are you? (5 questions)</option>
  <option value="sport">Assorted sport questions (5 questions)</option>
  <option value="cinema">Some statements about modern cinema (5 questions)</option>
</select>
```

**Note:** These options need to be created dynamically - they're not hard-coded in the HTML file.

---

## Implementation Notes

### Creating Options Dynamically

You need to create `<option>` elements for each category found in questions.json. Each option needs:
- A `value` attribute set to the category ID
- Display text showing the title and question count

### Default Option

Include an empty default option with text "Choose a category" and an empty value. This helps with validation.

### Error Display

The error span has `display: none` in the CSS by default. To show the error, you need to both set the error text AND change the display style to make it visible.

---

## Category screen markup

```html
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
```