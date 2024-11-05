const predefinedItems = [
    {
        name: 'Vintage Lamp',
        price: 30,
        description: 'A beautiful vintage lamp.',
        owner: 'Admin',
        image: 'path/to/lamp.jpg' // Replace with the actual path
    },
    {
        name: 'Wooden Chair',
        price: 50,
        description: 'A sturdy wooden chair.',
        owner: 'Admin',
        image: 'path/to/chair.jpg' // Replace with the actual path
    },
    {
        name: 'Coffee Table',
        price: 100,
        description: 'A stylish coffee table.',
        owner: 'Admin',
        image: 'path/to/table.jpg' // Replace with the actual path
    }
];

const items = JSON.parse(localStorage.getItem('items')) || [];
const cart = [];
let currentUser = localStorage.getItem('currentUser');

// Main page logic
if (document.getElementById('logoutBtn')) {
    if (!currentUser) {
        alert('You need to log in first!');
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        alert('Logged out successfully!');
        window.location.href = 'login.html';
    });
}

// Navigation buttons
document.getElementById('productsBtn').addEventListener('click', displayItems);
document.getElementById('postAdBtn').addEventListener('click', showPostAdForm);
document.getElementById('cartBtn').addEventListener('click', showCart);
document.getElementById('checkoutBtn').addEventListener('click', showPaymentOptions);

// Display items
function displayItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    const allItems = [...predefinedItems, ...items];
    allItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
            <img class="item-image" src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Price: $${item.price}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(item)})">Add to Cart</button>
        `;
        itemList.appendChild(div);
    });
}

// Show post ad form
function showPostAdForm() {
    document.getElementById('itemForm').classList.remove('hidden');
}

// Add item to cart
function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart`);
    updateCartButton();
}

// Show cart
function showCart() {
    const cartSection = document.getElementById('cart');
    cartSection.classList.remove('hidden');
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <button class="remove-from-cart-btn" onclick="removeFromCart(${JSON.stringify(item)})">Remove from Cart</button>
        `;
        cartItemsDiv.appendChild(div);
    });

    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.classList.remove('hidden');
}

// Remove item from cart
function removeFromCart(item) {
    const index = cart.indexOf(item);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
    }
}

// Update cart button
function updateCartButton() {
    const cartBtn = document.getElementById('cartBtn');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartBtn.textContent = `Cart (${cart.length})`;
}

// Show payment options
function showPaymentOptions() {
    document.getElementById('paymentOptions').classList.remove('hidden');
    document.getElementById('checkoutBtn').classList.add('hidden');
}

// Handle payment method selection
document.getElementById('creditCardOption').addEventListener('click', showCreditCardForm);
document.getElementById('paypalOption').addEventListener('click', showPaypalForm);
document.getElementById('bankTransferOption').addEventListener('click', showBankTransferForm);

function showCreditCardForm() {
    document.getElementById('paymentOptions').classList.add('hidden');
    document.getElementById('creditCardForm').classList.remove('hidden');
}

function showPaypalForm() {
    document.getElementById('paymentOptions').classList.add('hidden');
    document.getElementById('paypalForm').classList.remove('hidden');
}

function showBankTransferForm() {
    alert("Bank Transfer option coming soon!");
}

// Handle credit card payment
document.getElementById('payBtn').addEventListener('click', processPayment);

function processPayment() {
    const cardNumber = document.getElementById('creditCardNumber').value;
    const expiryDate = document.getElementById('cardExpiry').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber && expiryDate && cvv) {
        document.getElementById('creditCardForm').classList.add('hidden');
        document.getElementById('paymentConfirmation').classList.remove('hidden');

        // Display the product name and delivery date
        const productNames = cart.map(item => item.name).join(", ");
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7); // Deliver in 7 days

        document.getElementById('productName').textContent = `Product(s): ${productNames}`;
        document.getElementById('deliveryDate').textContent = `Delivery Date: ${deliveryDate.toDateString()}`;
    } else {
        alert("Please fill in all payment details.");
    }
}
