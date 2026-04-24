// Typing effect for Arabic phrases
// Phrases: "تميز معنا" and "أفضل الأدوات المكتبية"
(function(){
  const phrases = ['تميز معنا', 'أفضل الأدوات المكتبية'];
  const typedEl = document.getElementById('typed-text');
  const cursorEl = document.querySelector('.cursor');

  const typeSpeed = 120;    // ms per character
  const deleteSpeed = 60;   // ms per character when deleting
  const pauseBetween = 1400; // ms pause after typing a phrase

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop(){
    const current = phrases[phraseIndex];
    if (!isDeleting){
      // typing
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length){
        // finished typing
        isDeleting = true;
        setTimeout(typeLoop, pauseBetween);
      } else {
        setTimeout(typeLoop, typeSpeed);
      }
    } else {
      // deleting
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0){
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 420);
      } else {
        setTimeout(typeLoop, deleteSpeed);
      }
    }
  }

  // small caret blink sync
  function init(){
    if (!typedEl) return;
    // start after a short delay
    setTimeout(typeLoop, 700);

    // set year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // start when DOM ready
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
