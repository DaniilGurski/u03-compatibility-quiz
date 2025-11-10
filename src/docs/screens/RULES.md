# Rules screen
The rule screen consists off static HTML that will not be manipulated with JavaScript.

## Rules screen markup

``
<section class="screen" data-screen="rules">
            <div class="screen__content">
                <h1 class="screen__title">How to play</h1>
                <p class="screen__subtitle">
                    Two players, one device. Take turns answering the same questions—one
                    person answers, passes the device, then the other answers. Your
                    responses stay hidden until the final reveal when you compare
                    everything and see if you're in sync.
                </p>

                <ul class="screen__list">
                    <li class="screen__list-item">Pick a category</li>
                    <li class="screen__list-item">Input your names</li>
                    <li class="screen__list-item">
                        Take turns answering on one device
                    </li>
                    <li class="screen__list-item">
                        Responses stay hidden until the end
                    </li>
                    <li class="screen__list-item">No time limit!</li>
                </ul>

                <button class="screen__button" data-type="navigation" data-to="category">
                    Pick a category
                </button>
            </div>
        </section>
``