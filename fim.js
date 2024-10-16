const restaurants = [
    {
        id: 1,
        name: 'Italian Bistro',
        menu: [
            { id: 1, name: 'Pizza', price: 10.99, img: 'pizza.jpg' },
            { id: 2, name: 'Pasta', price: 12.99, img: 'pasta.jpeg' },
        ]
    },
    {
        id: 2,
        name: 'Burger House',
        menu: [
            { id: 3, name: 'Burger', price: 8.99, img: 'burger.jpeg' },
            { id: 4, name: 'Fries', price: 3.99, img: 'fries.jpeg' },
        ]
    },
    {
        id: 3,
        name: 'Japanese Bites',
        menu: [
            { id: 5, name: 'Sushi', price: 14.99, img: 'sushi.jpeg' },
            { id: 6, name: 'Sashimi', price: 16.99, img: 'sashimi.jpeg' },
        ]
    },
];

let cart = [];

// Display restaurants
function displayRestaurants() {
    const restaurantContainer = document.getElementById('restaurant-container');
    restaurantContainer.innerHTML = '';

    restaurants.forEach(restaurant => {
        const restaurantItem = document.createElement('div');
        restaurantItem.className = 'restaurant-item';
        restaurantItem.innerText = restaurant.name;
        restaurantItem.onclick = () => displayMenu(restaurant);
        restaurantContainer.appendChild(restaurantItem);
    });
}

// Display menu items for selected restaurant
function displayMenu(restaurant) {
    const menuContainer = document.getElementById('menu-container');
    const menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = '';

    menuContainer.style.display = 'block';
    document.getElementById('restaurant-container').style.display = 'none';
    document.getElementById('back-button').style.display = 'block';

    restaurant.menu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        `;
        menuItems.appendChild(menuItem);
    });
}

// Add item to cart
function addToCart(id) {
    const item = restaurants.flatMap(r => r.menu).find(i => i.id === id);
    cart.push(item);
    updateCartInfo();
}

// Update cart information
function updateCartInfo() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Handle back button
document.getElementById('back-button').onclick = () => {
    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('restaurant-container').style.display = 'block';
    document.getElementById('back-button').style.display = 'none';
};

// Handle checkout button
document.getElementById('checkout-button').onclick = () => {
    showCheckoutModal();
};

function showCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const orderSummary = document.getElementById('order-summary');
    const totalAmount = document.getElementById('total-amount');

    orderSummary.innerHTML = cart.map(item => `<p>${item.name} - $${item.price.toFixed(2)}</p>`).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalAmount.innerText = `Total Amount: $${total.toFixed(2)}`;

    modal.style.display = 'block';
}

// Close modal
document.querySelector('.close').onclick = () => {
    document.getElementById('checkout-modal').style.display = 'none';
};

// Payment method change
document.getElementById('payment-method').onchange = function() {
    document.getElementById('card-details').style.display = this.value === 'card' ? 'block' : 'none';
};

// Handle payment
document.getElementById('pay-button').onclick = () => {
    const paymentMethod = document.getElementById('payment-method').value;
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (cardNumber && expiryDate && cvv) {
            alert('Payment successful! Thank you for your order.');
        } else {
            alert('Please fill out all card details.');
            return;
        }
    } else {
        alert('Payment successful! Thank you for your order.');
    }
    cart = [];
    updateCartInfo();
    document.getElementById('checkout-modal').style.display = 'none';
    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('restaurant-container').style.display = 'block';
};

// Initialize app
displayRestaurants();
