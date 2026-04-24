const firebaseConfig = {
    apiKey: "AIzaSyD8I6yxMO3WJ7I7B6DmFUcsz2NXxOaSYUQ",
    authDomain: "imtiyaz-library.firebaseapp.com",
    projectId: "imtiyaz-library",
    storageBucket: "imtiyaz-library.firebasestorage.app",
    messagingSenderId: "251483297311",
    appId: "1:251483297311:web:327dc4f27f28b493ab672a",
    measurementId: "G-DRDS32HWYT"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
let cart = [];

// الدخول المباشر بدون تأكيد
auth.onAuthStateChanged(user => {
    if (user) {
        showUI('dashboard');
        initMarket();
        initPDFs();
    } else {
        showUI('landing-page');
    }
});

function handleRegister() {
    const email = document.getElementById('email-reg').value;
    const pass = document.getElementById('pass-reg').value;
    auth.createUserWithEmailAndPassword(email, pass)
        .then(() => notify("مرحباً بك في مكتبة الامتياز! ✨"))
        .catch(e => notify(e.message, "error"));
}

function handleLogin() {
    const email = document.getElementById('email-log').value;
    const pass = document.getElementById('pass-log').value;
    auth.signInWithEmailAndPassword(email, pass)
        .catch(() => notify("بيانات الدخول خاطئة", "error"));
}

function handleLogout() { auth.signOut(); }

// المتجر والسلة
const products = [
    { name: "حقيبة مدرسية فاخرة", price: 45.000, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
    { name: "مجموعة أقلام ملونة", price: 12.500, img: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400" },
    { name: "دفتر ملاحظات ذكي", price: 8.000, img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400" }
];

function initMarket() {
    const grid = document.getElementById('market-grid');
    grid.innerHTML = products.map((p, i) => `
        <div class="card">
            <img src="${p.img}">
            <h4>${p.name}</h4>
            <p class="price">${p.price.toFixed(3)} DT</p>
            <button onclick="addToCart(${i})">أضف للسلة</button>
        </div>
    `).join('');
}

function addToCart(i) {
    cart.push(products[i]);
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('wa-btn').classList.remove('disabled');
    notify(`تمت إضافة ${products[i].name} 🛒`);
}

function sendOrder() {
    let msg = `طلب جديد من مكتبة الامتياز:\n`;
    let total = 0;
    cart.forEach(p => { msg += `- ${p.name} (${p.price} DT)\n`; total += p.price; });
    msg += `\nالجملة: ${total.toFixed(3)} DT`;
    window.open(`https://wa.me/21652206325?text=${encodeURIComponent(msg)}`);
}

// المكتبة الرقمية
const docs = [
    { title: "ملخص رياضيات - باك", type: "Free" },
    { title: "سلسلة تمارين فيزياء", type: "Premium" }
];

function initPDFs() {
    const grid = document.getElementById('pdf-grid');
    grid.innerHTML = docs.map(d => `
        <div class="card">
            <i class="fas fa-file-pdf pdf-icon"></i>
            <h4>${d.title}</h4>
            <span class="badge ${d.type.toLowerCase()}">${d.type}</span>
            <button onclick="notify('سيتم توفير الروابط قريباً')">تحميل</button>
        </div>
    `).join('');
}

// وظائف مساعدة
function notify(msg, type="success") {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerText = msg;
    document.getElementById('toast-container').appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

function showUI(id) {
    document.getElementById('landing-page').style.display = (id==='landing-page') ? 'flex' : 'none';
    document.getElementById('dashboard').style.display = (id==='dashboard') ? 'block' : 'none';
}

function switchTab(id) {
    ['market-section', 'pdf-section', 'map-section'].forEach(s => document.getElementById(s).style.display = 'none');
    document.getElementById(id + '-section').style.display = 'block';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

function toggleAuth(type) {
    document.getElementById('login-box').style.display = (type==='log') ? 'block' : 'none';
    document.getElementById('reg-box').style.display = (type==='reg') ? 'block' : 'none';
}

function toggleTheme() { document.body.classList.toggle('light-theme'); }
