function typingAnimation(texts, elementId, delay = 100) {
    let index = 0;
    let textIndex = 0;
    const element = document.getElementById(elementId);

    function type() {
        if (index < texts[textIndex].length) {
            element.textContent += texts[textIndex].charAt(index);
            index++;
            setTimeout(type, delay);
        } else {
            index = 0;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(() => {
                element.textContent = '';
                type();
            }, 1000); // Delay before starting the next phrase
        }
    }

    type();
}

// Initialize the typing animation
const phrases = ["مرحباً بك في مكتبة الامتياز", "اكتشف آلاف الكتب والمراجع", "قريباً في حلة جديدة"];
typingAnimation(phrases, 'typing-element');