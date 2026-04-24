const phrases = [
    'مرحباً بك في مكتبة الامتياز',
    'اكتشف آلاف الكتب والمراجع',
    'قريباً في حلة جديدة'
];

const typingElement = document.getElementById('ai-text');

let phraseIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < phrases[phraseIndex].length) {
        typingElement.innerHTML += phrases[phraseIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(() => {
            typingElement.innerHTML = '';
            phraseIndex = (phraseIndex + 1) % phrases.length;
            charIndex = 0;
            type();
        }, 2000);
    }
}

type();