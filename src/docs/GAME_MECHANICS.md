# Same Wave Game Mechanics

Let's use this file as reference as to how the game works. We should definitely add more stuff to the DOCS as we go.

- Use LocalStorage to set an get data. Example: Save progressively the players answers as an array.


## What we need (to-do)

- Fetch questions from data/questions.json
- Store users input into an array
- Some way to move between "slides" or "sections"
- Refresh handler - what if the user refreshes the page?
- Form error handling
- Cool countdown

## How the game works

Two players takes turns answering questions separately, passing the phone back and forth between them. This game is sort of a "SPA" that uses localStorage for state management. 

All parts of the game is broken down into "screens", example:

- Intro screen (game title and description)
- Rule screen (this is how you play)
- Category screen (choose between categories with question)
- Name input + start game screen (player input names, button)
- Transition screen (button to load next question)
- Result screen

The HTML and CSS are static, and the data/user input is dynamic.

## File structure

- index.html - contains all the markup, block by block
- styles.css - contains global styling for all markup
- game.js - the actual quiz
- data/questions.json - the questions/categories/statements
- docs/ - how it all works and comes togheter

## Welcome screen
Static HTML, some introduction to the game. Contains a button that takes you to to the "How to play"-section

## How to play / rules
Static HTML, some instructions on how the game is played. Contains a button that takes you the "Category"-selector, were the players can chose from a category of quizzes.

## Pick a category

Static HTML section with a dynamic part. The section contains a `<select>` element which dynamically loads and shows multiple `<option>` elements inside the `<select>`  based on how many categories there exists in **"/data/questions.json"**.

- Should populate the `<select>` with as many `<option>` as there are categories
- Should write out in the `<option>` how many questions there are in a category
- Save the choosen category

The section contains a button that takes you two the "Who's playing?"-section.

## Who's playing?

Static HTML section with a dynamic part. The section contains two input fields, where the two Players input their names (should contain some sort of input validation).

- Save the users names, as they will be used throughout the game

The section contains a button that starts the game.

## Get ready

A semi static HTML section with dynamic content that tells the player's whos turn it is.

## Question

The game starts and the first question is displayed. Is this a static section? I don't know, it contains dynamic content. Reusable.

- The questions are fetched from **"/data/questions.json"**
- There is information about which player's turn it is
- What question (and the total amount of questions) are displayed

Player 1 can choose from "Agree", "Disagree" and "Neutral" and then press a button "Lock in and continue" to "provide their answer".

## Switch (or handoff)

A new section is scrolled to/loaded into view. Is it a static section? I don't know. The purpose of this screen is to give feedback to Player 1 that their input was recieved, but also to instruct them to pass the screen over to Player 2.

Each player answers separately, passing the phone back and forth until there's no questions left.

The switch (or handoff)-screen contains a button to load the next question. When there are no more questions, we will load the "Results"-screen (changes based on context).

## Results screen

A section (is this a static section?) where to players input (answers) are displayed in some fancy and fun way (to be decided).

Section contains a button to restart the game. Maybe to "share to social feed" or maybe just as an image?






