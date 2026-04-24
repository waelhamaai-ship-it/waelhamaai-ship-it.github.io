// كود الجافا سكريبت الاحترافي
const textElement = document.getElementById('ai-text');
const phrases = [
    "شريككم في التميز الدراسي..",
    "أفضل الأدوات بأفضل الأسعار..",
    "انتظرونا في الانطلاقة الكبرى!"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // استراحة بعد ما يكمل الجملة
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// تشغيل الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', type);
