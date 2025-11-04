# The amazing compatibility quiz or conversation starter game
The cool and quirky conversation starter or when you want to find out if you and your partner agrees on something.

## How the game works
This game is sort of a "SPA" that uses localStorage for state management. All parts of the game is broken down into "screens", example:

- Intro screen (game title)
- Rule screen (this is how you play)
- Category screen (game categories)
- Name input + start game screen (input, button)
- Transition screen (black screen with countdown)
- Result screen

The HTML and CSS are static, and the data/user input is dynamic.

## File structure

- index.html - contains all the markup, block by block
- styles.css - contains global styling for all markup
- game.js - the actual quiz
- data/questions.json - the questions/categories/statements


## How the game works

1. Two players: Player 1 and Player 2
2. Choose a category
3. Input both names and press start
4. Player 1 answers the question/statement
5. A black screen with a countdown is displayed
6. Player 2 answers the same question/statement
7. Step 4-6 are repeated until there are no more questions/statements
8. The Result screen is shown and displayed what both Player 1 and Player 2 answered. Some cool statistics are shown in a neat and somewhat fancy way

## Design inpo

https://neo-brutalism-ui-library.vercel.app/