console.log("DraftingDan System Online");

const phrases = [
    "Rescue Systems",
    "Modernize Legacy",
    "Fractional CTO",
    "Structural Engineering for Software",
    "High-Impact Leadership"
];

const typingElement = document.getElementById('typing-text');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 100;
const erasingDelay = 50;
const newPhraseDelay = 2000;

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
        delay = newPhraseDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 200;
    }

    setTimeout(type, delay);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typingElement) {
        setTimeout(type, 500);
    }

    // Problem Cards Flip Logic
    document.querySelectorAll('.problem-item').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Sequential Journey Highlight with Loop
    const journeyContainer = document.querySelector('.journey-steps');
    const journeySteps = document.querySelectorAll('.journey-step');
    
    if (journeyContainer && journeySteps.length > 0) {
        function runJourneyCycle() {
            // 1. Highlight sequentially
            journeySteps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('active');
                }, index * 1000); // 1-second delay between steps
            });

            // 2. Wait for highlighting to finish + hold for 10s
            const totalHighlightingTime = (journeySteps.length - 1) * 1000;
            const holdTime = 10000;

            setTimeout(() => {
                // 3. Fade out
                journeySteps.forEach(step => step.classList.remove('active'));

                // 4. Wait 3s and restart
                const waitTime = 3000;
                setTimeout(runJourneyCycle, waitTime);
            }, totalHighlightingTime + holdTime);
        }

        const journeyObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                runJourneyCycle();
                journeyObserver.unobserve(journeyContainer);
            }
        }, { threshold: 0.2 });

        journeyObserver.observe(journeyContainer);
    }

    // Scroll-triggered Fade Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.problem-item, .service-card, .why-item, .journey-step').forEach(el => {
        el.classList.add('fade-in-trigger');
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
