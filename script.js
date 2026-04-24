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

// مراقبة حالة الحساب
auth.onAuthStateChanged(user => {
    if (user) {
        if (user.emailVerified) {
            switchPage('dashboard');
            document.getElementById('user-display-name').innerText = user.email.split('@')[0];
            initMarket();
            initPDFs();
        } else {
            switchPage('verify-page');
        }
    } else {
        switchPage('landing-page');
    }
});

function handleRegister() {
    const email = document.getElementById('email-reg').value;
    const pass = document.getElementById('email-reg').value;
    auth.createUserWithEmailAndPassword(email, pass).then(u => {
        u.user.sendEmailVerification();
        notify("تم التسجيل! تفقد إيميلك للتفعيل 📧");
    }).catch(e => notify(e.message, "error"));
}

function handleLogin() {
    const email = document.getElementById('email-log').value;
    const pass = document.getElementById('pass-log').value;
    auth.signInWithEmailAndPassword(email, pass)
        .then(() => notify("مرحباً بك مجدداً!"))
        .catch(e => notify("بيانات خاطئة", "error"));
}

function handleLogout() { auth.signOut(); }

// المتجر
const products = [
    { id: 1, name: "كراسة امتياز", price: 3.500, img: "https://images.unsplash.com/photo-1598301257982-0cf014dabbcd?w=300" },
    { id: 2, name: "مجموعة أقلام", price: 4.200, img: "https://images.unsplash.com/photo-1605106702734-205df224ecbc?w=300" }
];

function initMarket() {
    const grid = document.getElementById('market-grid');
    grid.innerHTML = products.map((p, i) => `
        <div class="product-card">
            <img src="${p.img}">
            <h4>${p.name}</h4>
            <p>${p.price.toFixed(3)} DT</p>
            <button onclick="addToCart(${i})">إضافة للسلة</button>
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
    msg += `\nالمجموع الجملي: ${total.toFixed(3)} DT`;
    window.open(`https://wa.me/21652206325?text=${encodeURIComponent(msg)}`);
}

// المكتبة
const docs = [
    { title: "تلخيص عربية", type: "Free" },
    { title: "سلسلة تمارين فيزياء", type: "Premium" }
];

function initPDFs() {
    const grid = document.getElementById('pdf-grid');
    grid.innerHTML = docs.map(d => `
        <div class="pdf-card">
            <i class="fas fa-file-pdf"></i>
            <h4>${d.title}</h4>
            <span class="tag ${d.type.toLowerCase()}">${d.type}</span>
            <button onclick="download('${d.type}')">تحميل</button>
        </div>
    `).join('');
}

function download(type) {
    if(type === 'Premium') notify("حصري للمشتركين فقط 🔒", "error");
    else notify("بدأ تحميل الملف... 📥");
}

// مساعدات الواجهة
function notify(msg, type = "success") {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = msg;
    document.getElementById('toast-container').appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function switchPage(id) {
    ['landing-page', 'dashboard', 'verify-page'].forEach(p => document.getElementById(p).style.display = 'none');
    document.getElementById(id).style.display = (id === 'landing-page') ? 'flex' : 'block';
}

function switchTab(id) {
    ['market-section', 'pdf-section', 'map-section'].forEach(s => document.getElementById(s).style.display = 'none');
    document.getElementById(id + '-section').style.display = 'block';
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

function toggleAuthModal() {
    const m = document.getElementById('auth-modal');
    m.style.display = (m.style.display === 'block') ? 'none' : 'block';
}

function toggleAuthType(t) {
    document.getElementById('login-box').style.display = (t === 'log') ? 'block' : 'none';
    document.getElementById('reg-box').style.display = (t === 'reg') ? 'block' : 'none';
}
