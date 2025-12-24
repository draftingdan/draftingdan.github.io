console.log("DraftingDan System Online");

const textToType = "<Architect>";
const typingElement = document.getElementById('typing-text');
let charIndex = 0;
const typingDelay = 150;

function type() {
    if (charIndex < textToType.length) {
        typingElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    type();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

