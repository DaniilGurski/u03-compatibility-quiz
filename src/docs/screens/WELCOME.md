# Welcome screen
The welcome screen consists off static HTML that will not be manipulated with JavaScript.

## Welcome screen markup

```html
        <section class="screen" data-screen="welcome">
            <div class="screen__content">
                <h1 class="screen__title">Same Wave</h1>
                <p class="screen__subtitle">
                    Take turns answering quirky questions - are you on the same
                    <span class="wave">wavelength</span>? A fun conversation starter for
                    couples, friends, and anyone who wants to see how well they really
                    know each other.
                </p>

                <button class="screen__button" data-type="navigation" data-to="rules">
                    Get started
                </button>
            </div>
        </section>
```