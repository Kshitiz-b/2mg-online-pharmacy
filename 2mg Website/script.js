function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    for (const section of sections) {
        section.style.display = 'none';
    }
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        if (sectionId === 'orders') {
            updateOrderList();
        }
        if (sectionId === 'profile') {
            updateProfileName();
        }
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');
    if (username && password) {
        localStorage.setItem('username', username);
        updateProfileName();
        document.getElementById('login').style.display = 'none';
        document.getElementById('mainNav').style.display = 'block';
        showSection('home');
        loginError.style.display = 'none';
    } else {
        loginError.innerText = 'Please enter both username and password.';
        loginError.style.display = 'block';
    }
}

function submitOrder() {
    const medicine = document.getElementById('medicine').value;
    const quantity = document.getElementById('quantity').value;
    const orderError = document.getElementById('orderError');
    const orderConfirmation = document.getElementById('orderConfirmation');
    if (!medicine || !quantity) {
        orderError.innerText = 'Please specify medicine and quantity.';
        orderError.style.display = 'block';
    } else {
        const order = `Order placed for ${quantity} units of ${medicine}.`;
        orderConfirmation.innerText = order;
        orderConfirmation.style.display = 'block';
        orderError.style.display = 'none';
        saveOrder(order);
        updateOrderList();
    }
}

function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function updateOrderList() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = orders.map(order => `<p>${order}</p>`).join('');
}

function updateProfileName() {
    const username = localStorage.getItem('username');
    const profileName = document.getElementById('profileName');
    profileName.innerText = 'Username: ' + username;
}

// Initialize UI based on user session status
if (localStorage.getItem('username')) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('mainNav').style.display = 'block';
    updateProfileName();
    showSection('home');
} else {
    document.getElementById('login').style.display = 'block';
    document.getElementById('mainNav').style.display = 'none';
}
