const phrases = [
    "تميز معنا في كل خطوة دراسية..",
    "أفضل الأدوات المكتبية تحت سقف واحد..",
    "مكتبة الامتياز: الجودة والاحترافية."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const textTarget = document.getElementById("typed-text");

function typeEffect() {
    const current = phrases[phraseIndex];
    
    if (isDeleting) {
        textTarget.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textTarget.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", typeEffect);
