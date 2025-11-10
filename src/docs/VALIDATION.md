# Form Validation Guide

This document explains all validation in the game, where it happens, and how to implement it correctly.

## Overview

The game has validation at three key points:
1. **Category selection** - Ensure a category is chosen
2. **Player name input** - Ensure names are valid and different
3. **Question answers** - Ensure an answer is selected

## Common Pattern: CSS Override Required

**CRITICAL:** All error spans have `display: none` in the CSS by default.

You MUST use inline styles to show/hide errors:

```javascript
// Show error
errorSpan.textContent = 'Error message';
errorSpan.style.display = 'block'; // Required!

// Hide error
errorSpan.textContent = '';
errorSpan.style.display = 'none';
```

## 1. Category Selection Validation

**Screen:** Category selection screen
**Element:** `<span class="category-select__error">`
**Trigger:** When user tries to navigate to input screen without selecting a category

### Validation Rules

| Rule | Check | Error Message |
|------|-------|---------------|
| Category required | Selected value is empty string or null | "Please select a category" |

### Implementation Steps

1. **Listen for navigation button click** that goes to "input" screen
2. **Check if category is selected** before allowing navigation
3. **Show error if not selected:**
   - Set error text
   - Set `display: block` inline style
   - Prevent navigation
4. **Hide error when user selects** a category

### Example Flow

```javascript
// On button click to navigate to input screen
function validateCategorySelection() {
  const selectElement = document.getElementById('category-select');
  const errorSpan = document.querySelector('.category-select__error');

  if (!selectedCategoryId || selectedCategoryId === '') {
    if (errorSpan) {
      errorSpan.textContent = 'Please select a category';
      errorSpan.style.display = 'block';
    }
    return false; // Validation failed
  }

  if (errorSpan) {
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
  }
  return true; // Validation passed
}

// Clear error on selection change
selectElement.addEventListener('change', () => {
  if (errorSpan && selectElement.value) {
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
  }
});
```

## 2. Player Name Input Validation

**Screen:** Player input screen
**Elements:** Two `<span class="player-input__error">` spans
**Trigger:** When form is submitted (user clicks "Start the game")

### Validation Rules

| Rule | Check | Error Message | Where to Show |
|------|-------|---------------|---------------|
| Player 1 required | Input 1 is empty (after trim) | "Player 1 name cannot be empty" | Player 1 error span |
| Player 2 required | Input 2 is empty (after trim) | "Player 2 name cannot be empty" | Player 2 error span |
| Names must differ | Names are identical (case-insensitive) | "Names must be different" | Both error spans |

### Implementation Steps

1. **Listen for form submit event** on `<form id="players-form">`
2. **Prevent default** form submission with `event.preventDefault()`
3. **Get input values** and trim whitespace
4. **Run all validation checks** in order
5. **Show errors** where applicable (remember to set `display: block`)
6. **Only navigate if all validation passes**

### Example Flow

```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const player1Name = input1.value.trim();
  const player2Name = input2.value.trim();
  let isValid = true;

  // Clear previous errors
  error1.textContent = '';
  error1.style.display = 'none';
  error2.textContent = '';
  error2.style.display = 'none';

  // Check if empty
  if (!player1Name) {
    error1.textContent = 'Player 1 name cannot be empty';
    error1.style.display = 'block';
    isValid = false;
  }

  if (!player2Name) {
    error2.textContent = 'Player 2 name cannot be empty';
    error2.style.display = 'block';
    isValid = false;
  }

  // Check if identical (case-insensitive)
  if (player1Name && player2Name &&
      player1Name.toLowerCase() === player2Name.toLowerCase()) {
    error1.textContent = 'Names must be different';
    error1.style.display = 'block';
    error2.textContent = 'Names must be different';
    error2.style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    // Save names and navigate to ready screen
  }
});

// Clear errors when user types
input1.addEventListener('input', () => {
  error1.textContent = '';
  error1.style.display = 'none';
});

input2.addEventListener('input', () => {
  error2.textContent = '';
  error2.style.display = 'none';
});
```

### Special Considerations

**Form vs Navigation Button:**
- The submit button has BOTH `type="submit"` AND navigation attributes
- Navigation handler MUST be disabled for buttons inside forms
- Let the form's submit handler run validation FIRST
- Only trigger navigation manually if validation passes

```javascript
// In navigation setup, skip form buttons
if (button.closest('#players-form')) {
  return; // Let form handle it
}
```

## 3. Question Answer Validation

**Screen:** Question screen
**Element:** `<span class="question-form__error">`
**Trigger:** When form is submitted (user clicks "Lock in and continue")

### Validation Rules

| Rule | Check | Error Message |
|------|-------|---------------|
| Answer required | No radio button is checked | "Please select an answer" |

### Implementation Steps

1. **Listen for form submit event** on `<form class="question-form">`
2. **Prevent default** form submission
3. **Check if any radio button is selected**
4. **Show error if not selected** (remember to set `display: block`)
5. **Save answer and navigate** only if validation passes
6. **Clear error when user selects** any radio button

### Example Flow

```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const selectedRadio = form.querySelector('input[type="radio"]:checked');
  const errorSpan = document.querySelector('.question-form__error');

  if (!selectedRadio) {
    if (errorSpan) {
      errorSpan.textContent = 'Please select an answer';
      errorSpan.style.display = 'block';
    }
    return; // Don't navigate
  }

  // Clear error
  if (errorSpan) {
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
  }

  // Save answer and navigate to handoff
  saveAnswer(selectedRadio.value);
  navigateToHandoff();
});

// Clear error when any radio is selected
const radioInputs = form.querySelectorAll('input[type="radio"]');
radioInputs.forEach(radio => {
  radio.addEventListener('change', () => {
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.style.display = 'none';
    }
  });
});
```

### Special Considerations

**Form vs Navigation Button:**
- Similar to player input, this button is inside a form
- Navigation handler MUST be disabled for the question form button
- Let the form's submit handler run validation FIRST

```javascript
// In navigation setup, skip form buttons
if (button.closest('.question-form')) {
  return; // Let form handle it
}
```

## Validation Best Practices

### 1. Always Prevent Default
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Always do this first!
  // ... validation logic
});
```

### 2. Clear Errors Properly
```javascript
// Always clear BOTH textContent AND display style
errorSpan.textContent = '';
errorSpan.style.display = 'none';
```

### 3. Show Errors Properly
```javascript
// Always set BOTH textContent AND display style
errorSpan.textContent = 'Error message';
errorSpan.style.display = 'block'; // Critical!
```

### 4. Validate in the Right Order
1. Clear previous errors
2. Check all validation rules
3. Show errors for failed rules
4. Only proceed if all rules pass

### 5. Clear Errors on User Action
```javascript
// Clear when user starts fixing the issue
input.addEventListener('input', clearError);
select.addEventListener('change', clearError);
radio.addEventListener('change', clearError);
```

## Troubleshooting

### Error message not showing
- **Problem:** Error text is set but not visible
- **Cause:** Forgot to set `display: block`
- **Solution:** Always set `errorSpan.style.display = 'block'`

### Validation is bypassed
- **Problem:** Navigation happens without validation
- **Cause:** Navigation button click handler runs instead of form submit
- **Solution:** Skip form buttons in navigation handler

### Error doesn't clear when typing
- **Problem:** Error stays visible after user starts fixing it
- **Cause:** No event listener on input/change
- **Solution:** Add input/change listeners to clear errors

### Multiple errors at once
- **Problem:** Need to show errors on multiple fields
- **Solution:** Use a `isValid` flag, check all rules, show all errors, then check flag

## Summary Checklist

✅ Always use `event.preventDefault()` in form submit handlers
✅ Always set `style.display = 'block'` when showing errors
✅ Always set `style.display = 'none'` when hiding errors
✅ Clear errors when user starts fixing (input/change events)
✅ Skip form buttons in navigation handler
✅ Validate before allowing navigation
✅ Trim whitespace before checking if empty
✅ Use case-insensitive comparison for names
