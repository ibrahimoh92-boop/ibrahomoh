const birthdayMusic = document.getElementById("birthdayMusic");

const surpriseBtn = document.getElementById("surpriseBtn");

const welcomeScreen = document.getElementById("welcomeScreen");

const birthdayScreen = document.getElementById("birthdayScreen");


if (!surpriseBtn) {
    console.warn("surpriseBtn not found in DOM");
} else {
    surpriseBtn.addEventListener("click", function () {
        if (welcomeScreen) welcomeScreen.style.display = "none";

        // Prepare fade elements inside the birthday screen
        const fadeEls = birthdayScreen ? birthdayScreen.querySelectorAll('h1, p, audio, .message') : [];
        fadeEls.forEach(el => el.classList.add('fade'));

        if (birthdayScreen) birthdayScreen.style.display = "block";

        // Staggered reveal
        fadeEls.forEach((el, i) => {
            setTimeout(() => el.classList.add('show'), 250 * i + 200);
        });

        // Trigger cake animation
        const cake = document.querySelector('.cake');
        if (cake) {
            cake.classList.add('cake-animate');
            // remove animation class after a while so it can replay
            setTimeout(() => cake.classList.remove('cake-animate'), 5000);
        }

        // Start confetti burst (auto-stop after 5s)
        startConfetti(80);
    });
}
function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.animationDuration =
        Math.random() * 3 + 3 + "s";

    document.body.appendChild(heart);

    setTimeout(function () {
        heart.remove();
    }, 6000);
}

setInterval(createHeart, 500);

// --- Confetti ---
let confettiInterval = null;
function createConfettiPiece() {
    const el = document.createElement('div');
    el.className = 'confetti';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.background = ['#ff6b6b', '#ffd93d', '#6bffb8', '#6b8bff', '#ff9ee6'][Math.floor(Math.random()*5)];
    el.style.transform = 'rotate(' + (Math.random()*360) + 'deg)';
    el.style.width = (6 + Math.random()*8) + 'px';
    el.style.height = (8 + Math.random()*10) + 'px';
    el.style.opacity = 1;
    el.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(el);
    // remove after animation
    setTimeout(() => el.remove(), 6000);
}

function startConfetti(piecesPerTick = 30) {
    if (confettiInterval) return;
    // burst for a short period
    confettiInterval = setInterval(() => {
        for (let i=0;i<piecesPerTick;i++) createConfettiPiece();
    }, 250);
    // stop after 5 seconds
    setTimeout(stopConfetti, 5000);
}

function stopConfetti() {
    if (confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
    }
}