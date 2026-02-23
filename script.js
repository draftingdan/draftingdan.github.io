console.log("DraftingDan System Online");

const phrases = [
    "Enterprise Architect",
    "High-Impact",
    "Fractional CTO",
    "Startups and Growing Enterprises",
    "Bridge the Gaps Between Tools"
];

const typingElement = document.getElementById('typing-text');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 100;
const erasingDelay = 50;
const newPhraseDelay = 2000; // Delay between phrases

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        delay = newPhraseDelay; // Pause at the end of the phrase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 200; // Small pause before starting new phrase
    }

    setTimeout(type, delay);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typingElement) {
        setTimeout(type, 500); // Initial delay
    }

    // Flash Cards Flip
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.hash !== "") {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
