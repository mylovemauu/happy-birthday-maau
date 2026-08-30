/* =========================================
   ELEMENTS
========================================= */
/* =========================================
   BACKGROUND MUSIC
========================================= */
/* =========================================
   BACKGROUND MUSIC
========================================= */

const bgMusic = document.getElementById("bgMusic");

let musicStarted = false;

bgMusic.volume = 0.5;


/* =========================================
   START MUSIC
========================================= */

function startMusic() {

    if (musicStarted) {
        return;
    }

    bgMusic.play()
        .then(() => {

            musicStarted = true;

            console.log("🎵 Music started successfully");

        })
        .catch((error) => {

            console.log(
                "🎵 Music blocked:",
                error
            );

        });

}


/* =========================================
   TRY AUTOPLAY
========================================= */

window.addEventListener("load", () => {

    startMusic();

});


/* =========================================
   MOBILE FALLBACK
   Start music on first interaction
========================================= */

document.addEventListener(
    "pointerdown",
    startMusic,
    { once: true }
);


/* ---------- Screens ---------- */

const countdownScreen =
    document.getElementById("countdownScreen");

const birthdayScreen =
    document.getElementById("birthdayScreen");

const photosScreen =
    document.getElementById("photosScreen");

const balloonScreen =
    document.getElementById("balloonScreen");

const letterIntroScreen =
    document.getElementById("letterIntroScreen");

const letterScreen =
    document.getElementById("letterScreen");

const finalScreen =
    document.getElementById("finalScreen");


/* ---------- Buttons ---------- */

const countdownNumber =
    document.getElementById("countdownNumber");

const celebrateBtn =
    document.getElementById("celebrateBtn");

const continueFromBalloons =
    document.getElementById(
        "continueFromBalloons"
    );

const readLetterBtn =
    document.getElementById(
        "readLetterBtn"
    );

const finalSurpriseBtn =
    document.getElementById(
        "finalSurpriseBtn"
    );


/* ---------- Photo Elements ---------- */

const sliderImage =
    document.getElementById(
        "sliderImage"
    );

const photoCaption =
    document.getElementById(
        "photoCaption"
    );

const dotsContainer =
    document.getElementById(
        "dots"
    );


/* ---------- Balloon Elements ---------- */

const balloonGarden =
    document.getElementById(
        "balloonGarden"
    );

const balloonMessage =
    document.getElementById(
        "balloonMessage"
    );

const balloonComplete =
    document.getElementById(
        "balloonComplete"
    );


/* ---------- Confetti ---------- */

const confettiContainer =
    document.getElementById(
        "confetti"
    );



/* =========================================
   COUNTDOWN
========================================= */

let count = 5;


const countdownInterval =
    setInterval(() => {

        count--;


        if (count > 0) {

            countdownNumber.textContent =
                count;


            /*
                Restart countdown animation
            */

            countdownNumber.style.animation =
                "none";


            void countdownNumber.offsetWidth;


            countdownNumber.style.animation =
                "countdownPulse 1s ease";

        }


        else {

            clearInterval(
                countdownInterval
            );


            countdownNumber.textContent =
                "❤️";


            /*
                Move to birthday screen
            */

            setTimeout(() => {

                countdownScreen.classList.add(
                    "hidden"
                );


                birthdayScreen.classList.remove(
                    "hidden"
                );

            }, 800);

        }

    }, 1000);



/* =========================================
   PHOTO DATA
========================================= */

const photos = [

    {
        image: "images/mauu1.jpeg",
        caption:
            "How can someone look this cute? 🥹"
    },

    {
        image: "images/mauu2.jpeg",
        caption:
            "Okay... this smile is illegal ❤️"
    },

    {
        image: "images/mauu3.jpeg",
        caption:
            "My favourite face to look at. 🥰"
    },

    {
        image: "images/mauu4.jpeg",
        caption:
            "Mauu being Mauu ✨"
    },

    {
        image: "images/mauu5.jpeg",
        caption:
            "Simply beautiful. ❤️"
    },

    {
        image: "images/mauu6.jpeg",
        caption:
            "Every picture somehow gets prettier ❤️"
    },

    {
        image: "images/mauu7.jpeg",
        caption:
            "And this one... my favourite. 🥹❤️"
    }

];



/* =========================================
   PHOTO SLIDER VARIABLES
========================================= */

let currentPhoto = 0;

let sliderInterval = null;

let photoTransitionTimeout = null;



/* =========================================
   CREATE PHOTO DOTS
========================================= */

photos.forEach(
    (photo, index) => {

        const dot =
            document.createElement(
                "div"
            );


        dot.classList.add(
            "dot"
        );


        dot.dataset.index =
            index;


        if (index === 0) {

            dot.classList.add(
                "active"
            );

        }


        dotsContainer.appendChild(
            dot
        );

    }
);



/* =========================================
   SHOW PHOTO
========================================= */

function showPhoto(index) {

    /*
        Check if photo exists
    */

    if (!photos[index]) {

        return;

    }


    const photo =
        photos[index];


    /*
        Fade image out
    */

    sliderImage.style.opacity =
        "0";


    /*
        Clear previous transition
    */

    if (photoTransitionTimeout) {

        clearTimeout(
            photoTransitionTimeout
        );

    }


    /*
        Change image after fade
    */

    photoTransitionTimeout =
        setTimeout(() => {

            sliderImage.src =
                photo.image;


            photoCaption.textContent =
                photo.caption;


            sliderImage.style.opacity =
                "1";

        }, 400);


    /*
        Update dots
    */

    const dots =
        document.querySelectorAll(
            ".dot"
        );


    dots.forEach(
        dot => {

            dot.classList.remove(
                "active"
            );

        }
    );


    if (dots[index]) {

        dots[index].classList.add(
            "active"
        );

    }

}



/* =========================================
   GO TO BALLOON PAGE
========================================= */

function goToBalloonPage() {

    /*
        Stop photo slider
    */

    stopSlider();


    /*
        Hide photos
    */

    photosScreen.classList.add(
        "hidden"
    );


    /*
        Show balloons
    */

    balloonScreen.classList.remove(
        "hidden"
    );


    /*
        Create balloons
    */

    createBalloons();

}



/* =========================================
   START PHOTO SLIDER
========================================= */

function startSlider() {

    /*
        Stop any existing slider
    */

    stopSlider();


    /*
        Start from first photo
    */

    currentPhoto = 0;


    showPhoto(
        currentPhoto
    );


    /*
        Change photo every 4 seconds
    */

    sliderInterval =
        setInterval(() => {

            currentPhoto++;


            /*
                If all photos
                are completed
            */

            if (
                currentPhoto >=
                photos.length
            ) {

                goToBalloonPage();

                return;

            }


            /*
                Show next photo
            */

            showPhoto(
                currentPhoto
            );

        }, 4000);

}



/* =========================================
   STOP PHOTO SLIDER
========================================= */

function stopSlider() {

    if (sliderInterval) {

        clearInterval(
            sliderInterval
        );


        sliderInterval = null;

    }

}



/* =========================================
   CELEBRATE BUTTON
========================================= */

celebrateBtn.addEventListener(
    "click",
    () => {

        /*
            Hide birthday screen
        */

        birthdayScreen.classList.add(
            "hidden"
        );


        /*
            Show photos screen
        */

        photosScreen.classList.remove(
            "hidden"
        );


        /*
            Start photo slider
        */

        startSlider();

    }
);



/* =========================================
   PHOTO DOT CLICK
========================================= */

dotsContainer.addEventListener(
    "click",
    event => {

        /*
            Only react to dots
        */

        if (
            !event.target.classList.contains(
                "dot"
            )
        ) {

            return;

        }


        /*
            Get selected index
        */

        const index =
            Number(
                event.target.dataset.index
            );


        /*
            Validate index
        */

        if (
            Number.isNaN(index) ||
            !photos[index]
        ) {

            return;

        }


        /*
            Stop current slider
        */

        stopSlider();


        /*
            Show selected photo
        */

        currentPhoto =
            index;


        showPhoto(
            currentPhoto
        );


        /*
            Continue from selected photo
        */

        sliderInterval =
            setInterval(() => {

                currentPhoto++;


                /*
                    All photos completed
                */

                if (
                    currentPhoto >=
                    photos.length
                ) {

                    goToBalloonPage();

                    return;

                }


                showPhoto(
                    currentPhoto
                );

            }, 4000);

    }
);



/* =========================================
   BALLOON DATA
========================================= */

const balloonMessages = [

    "Your smile is one of my favourite things ❤️",

    "You deserve all the happiness in the world 🌸",

    "Never stop being the beautiful person you are ✨",

    "You make ordinary moments feel special 🥰",

    "I hope this year gives you countless reasons to smile 💖",

    "You are more special than you know ❤️",

    "Keep shining, Mauu ✨",

    "Happy Birthday to my favourite person 🎂❤️"

];



/* =========================================
   BALLOON COLORS
========================================= */

const balloonColors = [

    "#ff6fa9",

    "#b77cff",

    "#ff8b8b",

    "#ffbd69",

    "#70c7ff",

    "#ff82c8",

    "#8ddf9a",

    "#ff718c"

];



/* =========================================
   BALLOON STATE
========================================= */

let poppedBalloons = 0;



/* =========================================
   CREATE BALLOONS
========================================= */

function createBalloons() {

    /*
        Clear old balloons
    */

    balloonGarden.innerHTML = "";


    /*
        Hide completion section
    */

    balloonComplete.classList.add(
        "hidden"
    );


    /*
        Show message area
    */

    balloonMessage.classList.remove(
        "hidden"
    );


    balloonMessage.classList.remove(
        "message-show"
    );


    balloonMessage.textContent =
        "Click a balloon 🎈";


    /*
        Reset counter
    */

    poppedBalloons = 0;


    /*
        Create balloons
    */

    balloonMessages.forEach(
        (message, index) => {

            const balloon =
                document.createElement(
                    "div"
                );


            balloon.classList.add(
                "balloon"
            );


            balloon.dataset.index =
                index;


            /*
                Set balloon color
            */

            balloon.style.background =
                balloonColors[
                    index %
                    balloonColors.length
                ];


            /*
                Balloon emoji
            */

            balloon.textContent =
                "🎈";


            /*
                Balloon click
            */

            balloon.addEventListener(
                "click",
                () => {

                    popBalloon(
                        balloon,
                        message
                    );

                }
            );


            /*
                Add balloon
            */

            balloonGarden.appendChild(
                balloon
            );

        }
    );

}



/* =========================================
   POP BALLOON
========================================= */

function popBalloon(
    balloon,
    message
) {

    /*
        Don't allow
        already popped balloon
    */

    if (
        balloon.classList.contains(
            "popped"
        )
    ) {

        return;

    }


    /*
        Mark balloon as popped
    */

    balloon.classList.add(
        "popped"
    );


    /*
        Increase counter
    */

    poppedBalloons++;


    /*
        Show balloon message
    */

    balloonMessage.textContent =
        message;


    balloonMessage.classList.remove(
        "hidden"
    );


    balloonMessage.classList.add(
        "message-show"
    );


    /*
        Remove balloon
        after pop animation
    */

    setTimeout(() => {

        balloon.remove();

    }, 400);


    /*
        Remove message animation
        after a while
    */

    setTimeout(() => {

        balloonMessage.classList.remove(
            "message-show"
        );

    }, 2500);


    /*
        Check if all balloons
        have been popped
    */

    if (
        poppedBalloons ===
        balloonMessages.length
    ) {

        setTimeout(() => {

            /*
                Hide instructions
            */

            const smallTitle =
                document.querySelector(
                    ".balloon-small-title"
                );


            const heading =
                document.querySelector(
                    ".balloon-content h2"
                );


            const description =
                document.querySelector(
                    ".balloon-description"
                );


            if (smallTitle) {

                smallTitle.classList.add(
                    "hidden"
                );

            }


            if (heading) {

                heading.classList.add(
                    "hidden"
                );

            }


            if (description) {

                description.classList.add(
                    "hidden"
                );

            }


            /*
                Hide individual message
            */

            balloonMessage.classList.add(
                "hidden"
            );


            /*
                Show completion card
            */

            balloonComplete.classList.remove(
                "hidden"
            );


            /*
                Animation
            */

            balloonComplete.classList.remove(
                "celebrate"
            );


            void balloonComplete.offsetWidth;


            balloonComplete.classList.add(
                "celebrate"
            );

        }, 800);

    }

}



/* =========================================
   CONTINUE FROM BALLOONS
========================================= */

if (continueFromBalloons) {

    continueFromBalloons.addEventListener(
        "click",
        () => {

            /*
                Hide balloon screen
            */

            balloonScreen.classList.add(
                "hidden"
            );


            /*
                Show letter intro
            */

            letterIntroScreen.classList.remove(
                "hidden"
            );

        }
    );

}



/* =========================================
   READ LETTER
========================================= */

if (readLetterBtn) {

    readLetterBtn.addEventListener(
        "click",
        () => {

            /*
                Hide intro
            */

            letterIntroScreen.classList.add(
                "hidden"
            );


            /*
                Show letter
            */

            letterScreen.classList.remove(
                "hidden"
            );


            /*
                Scroll to top
            */

            window.scrollTo(
                0,
                0
            );

        }
    );

}



/* =========================================
   FINAL SURPRISE
========================================= */

if (finalSurpriseBtn) {

    finalSurpriseBtn.addEventListener(
        "click",
        () => {

            /*
                Hide letter
            */

            letterScreen.classList.add(
                "hidden"
            );


            /*
                Show final screen
            */

            finalScreen.classList.remove(
                "hidden"
            );


            /*
                Start confetti
            */

            createConfetti();

        }
    );

}



/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const symbols = [

        "❤️",
        "✨",
        "💖",
        "🌸",
        "🎉",
        "💕",
        "⭐",
        "💗",
        "🌷",
        "💐"

    ];


    /*
        Clear previous confetti
    */

    confettiContainer.innerHTML =
        "";


    /*
        Create confetti
    */

    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );


        /*
            Random symbol
        */

        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        /*
            Position
        */

        confetti.style.position =
            "absolute";


        confetti.style.left =
            Math.random() * 100 +
            "%";


        confetti.style.top =
            "-50px";


        /*
            Random size
        */

        confetti.style.fontSize =
            Math.random() * 20 +
            12 +
            "px";


        confetti.style.zIndex =
            "10";


        /*
            Random animation duration
        */

        confetti.style.animation =
            `fall ${
                Math.random() * 3 + 3
            }s linear forwards`;


        confettiContainer.appendChild(
            confetti
        );

    }

}



/* =========================================
   CONFETTI ANIMATION
========================================= */

const style =
    document.createElement(
        "style"
    );


style.innerHTML = `

@keyframes fall {

    0% {

        transform:
            translateY(0)
            rotate(0deg);

        opacity: 1;

    }

    100% {

        transform:
            translateY(110vh)
            rotate(720deg);

        opacity: 0;

    }

}

`;


document.head.appendChild(
    style
);