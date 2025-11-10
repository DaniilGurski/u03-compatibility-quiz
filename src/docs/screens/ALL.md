# Index of screens

1. [Welcome](/src/docs/screens/WELCOME.md)
2. [Rules](/src/docs/screens/RULES.md)
3. [Category](/src/docs/screens/CATEGORY.md)
4. [Input](/src/docs/screens/INPUT.md)
5. [Ready](/src/docs/screens/READY.md)
6. [Question](/src/docs/screens/QUESTION.md)
7. [Handoff](/src/docs/screens/HANDOFF.md)
8. [Result](/src/docs/screens/RESULT.md)

## How does this game work?
This is a quiz game where two players takes turns answering questions separately, on one device, passing the device (phone, computer) back and forth between them.

## How is the game built
This game is built using HTML, CSS and JavaScript. Almost all HTML is present in the initial page load and most DOM elements exist from the start. JavaScript is mostly used to manipulate existing DOM elements.

Worth to mention is that almost all markup is rendered below the fold. This is a highly curated quiz game and it follows a specific order. That means that we controll what the players see and interact with at every step of the game.

The players of this game always see a "screen" that covers 100% of the viewport. There are multiple screens to this game, but only one is active at a time.

## What is a screen?
This game is divided into "screens" (or sections), each screen has a a task that it performs. Every screen has a "data attribute", for example "data-screen="question". To move forward to the next step/screen, we are using other data attributes as well:

- "data-type="navigation", to indicate this is navigational
- "data-to="input", to indicate where we are going to next

## Example markup of a screen
For some screens, there exists pre-made text content. For others, JavaScript is used to populate a span for example.

``
        <section class="screen" data-screen="handoff">
            <div class="screen__content">
                <h1 class="screen__title">
                    <span class="screen__title__text screen__title__text--greeting"></span>
                    <span class="screen__title__text screen__title__text--username"></span>
                </h1>
                <p class="screen__subtitle"></p>
                <button class="screen__button" data-to="result"></button>
            </div>
        </section>
``
# Looping of screens
The following screens are repeated/looped and shown until there are no questions left, then we move on to the result screen.

- Ready
- Questions
- Handoff
