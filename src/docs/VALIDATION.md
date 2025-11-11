# Validation Guide

This document explains all validation in the game and where it needs to happen.

## Where Validation Occurs

The game has validation at three points:
1. **Category selection** - Make sure a category is chosen
2. **Player name input** - Make sure names are valid and different
3. **Question answers** - Make sure an answer is selected

---

## Important: Showing Error Messages

All error spans have `display: none` in the CSS by default, which means they're hidden.

**To show an error:**
1. Set the error text
2. Change the display style to make it visible

**To hide an error:**
1. Clear the text
2. Change the display style back to hidden

This is a common web pattern - elements can exist in the HTML but be visually hidden until needed.

---

## 1. Category Selection Validation

**Where:** Category selection screen
**When:** Before allowing navigation to the input screen
**Error element:** `<span class="category-select__error">`

### The Rule

A category must be selected from the dropdown.

**Error message:** "Please select a category"

### What Needs to Happen

1. When the "Who's playing?" button is clicked, check if a category is selected
2. If no category (empty value), show the error and prevent navigation
3. If a category is selected, hide any error and allow navigation
4. Clear the error when the user selects a category from the dropdown

---

## 2. Player Name Input Validation

**Where:** Player input screen
**When:** When the form is submitted (user clicks "Start the game")
**Error elements:** Two `<span class="player-input__error">` spans (one for each player)

### The Rules

| Rule | What to Check | Error Message | Where to Show |
|------|---------------|---------------|---------------|
| Player 1 required | Input is not empty (ignoring spaces) | "Player 1 name cannot be empty" | Player 1 error span |
| Player 2 required | Input is not empty (ignoring spaces) | "Player 2 name cannot be empty" | Player 2 error span |
| Names must differ | Names are not the same (case-insensitive) | "Names must be different" | Both error spans |

### What Needs to Happen

1. When the form submits, prevent the page from reloading
2. Get both name values and remove spaces from beginning/end
3. Check if either name is empty → show appropriate error(s)
4. Check if names are identical (ignoring capitalization) → show error on both
5. If any errors, stay on the current screen
6. If all valid, save names and navigate to ready screen
7. Clear errors when users start typing in the input fields

### Example Scenarios

**Scenario 1: Both empty**
- Show "Player 1 name cannot be empty"
- Show "Player 2 name cannot be empty"

**Scenario 2: One empty**
- Show error only for the empty field

**Scenario 3: Same names**
- Show "Names must be different" on both

**Scenario 4: Valid**
- No errors, save and continue

### Important Note

The "Start the game" button is inside a form with `type="submit"`. This means clicking it triggers form submission. Your code needs to:
- Prevent the page from reloading (default form behavior)
- Run validation before navigation
- Only navigate if validation passes

---

## 3. Question Answer Validation

**Where:** Question screen
**When:** When the form is submitted (user clicks "Lock in and continue")
**Error element:** `<span class="question-form__error">`

### The Rule

An answer must be selected (one of the three radio buttons must be checked).

**Error message:** "Please select an answer"

### What Needs to Happen

1. When the form submits, prevent the page from reloading
2. Check if any radio button is selected
3. If no selection → show error and stay on screen
4. If selected → hide any error, save the answer, and navigate to handoff screen
5. Clear the error when the user selects any radio button

### Important Note

The "Lock in and continue" button is inside a form with `type="submit"`. This means clicking it triggers form submission. Your code needs to:
- Prevent the page from reloading (default form behavior)
- Run validation before navigation
- Only navigate if validation passes

---

## General Validation Tips

### Order of Operations

When validating:
1. Prevent the default action (page reload)
2. Clear any previous errors
3. Check all validation rules
4. Show errors for rules that failed
5. Only proceed if everything is valid

### Clearing Errors

Clear errors when the user starts fixing the issue:
- When they type in an input field
- When they change a dropdown selection
- When they select a radio button

### Form Buttons

Buttons inside forms with `type="submit"` will trigger form submission. Make sure your validation runs before any navigation happens.

---

## Common Issues

**Problem: Error text is set but not visible**
- Remember to change the display style to make the error visible

**Problem: Navigation happens without validation**
- Make sure form validation runs before navigation code

**Problem: Error doesn't clear when user fixes it**
- Add listeners to clear errors when users interact with the form fields

**Problem: Multiple errors need to show at once**
- Check all rules first, collect all errors, then display them all together

---

## Quick Reference

### Validation Checklist

✅ Prevent page reload when forms submit
✅ Show errors with both text and display style
✅ Hide errors with both text and display style
✅ Clear errors when users start fixing issues
✅ Validate before navigating
✅ Remove extra spaces before checking if empty
✅ Compare names ignoring capitalization
