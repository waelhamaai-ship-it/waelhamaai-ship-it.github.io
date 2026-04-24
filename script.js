// إعدادات Firebase الخاصة بك
const firebaseConfig = {
    apiKey: "AIzaSyD8I6yxMO3WJ7I7B6DmFUcsz2NXxOaSYUQ",
    authDomain: "imtiyaz-library.firebaseapp.com",
    projectId: "imtiyaz-library",
    storageBucket: "imtiyaz-library.firebasestorage.app",
    messagingSenderId: "251483297311",
    appId: "1:251483297311:web:327dc4f27f28b493ab672a",
    measurementId: "G-DRDS32HWYT"
};

// تشغيل Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// دالة فتح وغلق النافذة
function toggleAuthModal() {
    const modal = document.getElementById("auth-modal");
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
}

// دالة التبديل بين الدخول والتسجيل
function switchForm(formType) {
    document.getElementById("login-form").style.display = (formType === 'login') ? "block" : "none";
    document.getElementById("register-form").style.display = (formType === 'register') ? "block" : "none";
}

// دالة إنشاء الحساب
function handleRegister() {
    const email = document.querySelector('#register-form input[type="email"]').value;
    const password = document.querySelector('#register-form input[type="password"]').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => { alert("تم إنشاء الحساب بنجاح!"); toggleAuthModal(); })
        .catch((error) => { alert("خطأ: " + error.message); });
}

// دالة تسجيل الدخول
function handleLogin() {
    const email = document.querySelector('#login-form input[type="email"]').value;
    const password = document.querySelector('#login-form input[type="password"]').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => { alert("مرحباً بك من جديد!"); toggleAuthModal(); })
        .catch((error) => { alert("خطأ: " + error.message); });
}

// تأثير الكتابة
const phrases = ["تميز معنا في كل خطوة..", "مكتبة الامتياز وجهتكم."];
let i = 0, j = 0, isDel = false;
function typeEffect() {
    const current = phrases[i];
    document.getElementById("typed-text").textContent = isDel ? current.substring(0, j--) : current.substring(0, j++);
    if (!isDel && j === current.length) { isDel = true; setTimeout(typeEffect, 2000); }
    else if (isDel && j === 0) { isDel = false; i = (i + 1) % phrases.length; setTimeout(typeEffect, 500); }
    else { setTimeout(typeEffect, isDel ? 50 : 100); }
}
document.addEventListener("DOMContentLoaded", typeEffect);
