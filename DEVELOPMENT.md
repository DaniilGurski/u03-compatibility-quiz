# Development Guide

This document explains how to work on the project and switch between demo and development modes.

## Quick Start

1. Open `index.html` in your browser
2. The game should load and work

## Switching Between Demo and Development

The project has two JavaScript setups:

### Development Mode (Default)

This is the current mode where the team works on separate files.

**How to use:**
- Just open `index.html` - it's already set to development mode
- Everyone works on their assigned file in `src/js/`

**Files:**
- `src/js/main.js` - Loads all the modular files
- `src/js/category.js` - Category selection
- `src/js/input.js` - Player names
- `src/js/ready.js` - Ready screen
- `src/js/question.js` - Questions screen
- `src/js/handoff.js` - Handoff screen
- `src/js/result.js` - Results screen

### Demo Mode (Working Example)

A fully working version to see how the game should function.

**How to switch to demo:**

1. Open `index.html`
2. Find this line near the bottom (line 271):
   ```html
   <script type="module" src="src/js/main.js"></script>
   ```
3. Comment it out and uncomment the demo line:
   ```html
   <!-- <script type="module" src="src/js/main.js"></script> -->
   <script type="module" src="demo.js"></script>
   ```
4. Save and refresh your browser

**How to switch back to development:**

1. Open `index.html`
2. Comment out demo and uncomment main:
   ```html
   <script type="module" src="src/js/main.js"></script>
   <!-- <script type="module" src="demo.js"></script> -->
   ```
3. Save and refresh your browser

## Screen Files

### Category Selection (category.js)
- Populates dropdown with categories
- Saves selection to gameState
- Validates before continuing

### Player Input (input.js)
- Captures both player names
- Validates names are filled
- Validates names are different
- Shows proper error messages

### Ready Screen (ready.js)
- Show random greeting
- Show current player name

### Question Screen (question.js)
- Display question and options
- Validate answer selected
- Save answer to gameState

### Handoff Screen (handoff.js)
- Show acknowledgment
- Handle player switching
- Handle final handoff

### Results Screen (result.js)
- Calculate compatibility
- Display results
- Generate result cards
- Handle play again

## Tips for Working

1. **See the demo first** - Switch to demo mode to see how the game should work
2. **Read the docs** - Check `src/docs/JS_MODULE_GUIDE.md` for detailed instructions
3. **Check your screen docs** - Each screen has documentation in `src/docs/screens/`
4. **Test as you go** - Refresh the browser after making changes
5. **Use console.log** - Add logging to see what's happening
6. **Check the browser console** - Look for errors (F12 to open)

## File Structure

```
project/
├── index.html              - Main HTML file
├── src/
│   ├── js/
│   │   ├── main.js         - Coordinator (DO NOT EDIT)
│   │   ├── navigation.js   - Screen switching (DO NOT EDIT)
│   │   ├── data.js         - Data loading (DO NOT EDIT)
│   │   ├── category.js     - Category screen
│   │   ├── input.js        - Input screen
│   │   ├── ready.js        - Ready screen
│   │   ├── question.js     - Question screen
│   │   ├── handoff.js      - Handoff screen
│   │   └── result.js       - Results screen
│   ├── docs/
│   │   ├── JS_MODULE_GUIDE.md      - Complete JavaScript guide
│   │   └── screens/                - Documentation for each screen
│   └── data/
│       └── questions.json          - Question data
├── demo.js                 - Working demo (reference only)
└── game.js                 - Old code (kept for reference)
```

## Common Issues

**Problem: "Import declarations may only appear at top level of a module"**
- Solution: Make sure the script tag has `type="module"`

**Problem: "Questions data not loaded"**
- Solution: Wait for the console to say "Questions loaded" before testing

**Problem: Nothing happens when I click buttons**
- Solution: Check browser console for errors (F12)

**Problem: Changes not showing**
- Solution: Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)

## Need Help?

1. Check `src/docs/JS_MODULE_GUIDE.md`
2. Look at the completed files (category.js, input.js)
3. Check the demo to see how it should work
4. Ask anyone in the team chat!
