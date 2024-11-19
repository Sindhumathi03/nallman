const predefinedItems = [
    {
        name: 'Vintage Lamp',
        price: 30,
        description: 'A beautiful vintage lamp.',
        owner: 'Admin',
        image: 'path/to/lamp.jpg' // Replace with actual image path
    },
    {
        name: 'Wooden Chair',
        price: 50,
        description: 'A sturdy wooden chair.',
        owner: 'Admin',
        image: 'path/to/chair.jpg' // Replace with actual image path
    },
    {
        name: 'Coffee Table',
        price: 100,
        description: 'A stylish coffee table.',
        owner: 'Admin',
        image: 'path/to/table.jpg' // Replace with actual image path
    }
];
const items = JSON.parse(localStorage.getItem('items')) || [];
const cart = [];
let currentUser = localStorage.getItem('currentUser');
if (document.getElementById('loginBtn')) {
    document.getElementById('loginBtn').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username && password) {
            localStorage.setItem('currentUser', username);
            alert('Login successful!');
            window.location.href = 'sell.html'; // Redirect to main page
        } else {
            alert('Please enter both username and password.');
        }
    });
}
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
document.getElementById('productsBtn').addEventListener('click', () => {
    displayItems();
    document.getElementById('cart').classList.add('hidden');
});
document.getElementById('postAdBtn').addEventListener('click', () => {
    document.getElementById('itemForm').classList.toggle('hidden');
});
document.getElementById('cartBtn').addEventListener('click', () => {
    displayCart();
    document.getElementById('itemList').classList.add('hidden');
});
if (document.getElementById('submitItemBtn')) {
    document.getElementById('submitItemBtn').addEventListener('click', (e) => {
        e.preventDefault();
        const itemName = document.getElementById('itemName').value;
        const itemPrice = document.getElementById('itemPrice').value;
        const itemDescription = document.getElementById('itemDescription').value;
        const itemImageInput = document.getElementById('itemImage');
        if (itemName && itemPrice) {
            const item = {
                name: itemName,
                price: itemPrice,
                description: itemDescription,
                owner: currentUser,
                image: itemImageInput.files[0] ? URL.createObjectURL(itemImageInput.files[0]) : null,
            };
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items)); // Save items to localStorage
            displayItems();
            document.getElementById('itemForm').reset();
            document.getElementById('itemForm').classList.add('hidden');
        } else {
            alert('Please fill in all fields.');
        }
    });
    document.getElementById('cancelBtn').addEventListener('click', () => {
        document.getElementById('itemForm').classList.add('hidden');
    });
}
function displayItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    const allItems = [...predefinedItems, ...items]; // Combine predefined items with user-added items
    allItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <h2>${item.name}</h2>
            <p><strong>Price:</strong> $${item.price}</p>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Owner:</strong> ${item.owner}</p>
            ${item.image ? `<img src="${item.image}" alt="${item.name}" class="item-image">` : ''}
            <button class="add-to-cart-btn" data-index="${index}">Add to Cart</button>
            ${item.owner === currentUser ? `<button class="remove-btn" data-index="${index}">Remove</button>` : ''}
        `;
        itemList.appendChild(itemDiv);
    }); 
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}
function addToCart(e) {
    const index = e.target.getAttribute('data-index');
    const itemToAdd = items[index] || predefinedItems[index]; // Get item from items or predefined items
    cart.push(itemToAdd);
    alert(`${itemToAdd.name} added to cart.`);
}
function removeItem(e) {
    const index = e.target.getAttribute('data-index');
    if (index < predefinedItems.length) {
        alert("You cannot remove predefined items.");
    } else {
        items.splice(index - predefinedItems.length, 1); // Adjust index for user-added items
        localStorage.setItem('items', JSON.stringify(items)); // Update localStorage
        displayItems();
    }
}
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Price:</strong> $${item.price}</p>
            <button class="remove-from-cart-btn" data-index="${index}">Remove from Cart</button>
        `;
        cartItems.appendChild(cartItemDiv);
    });
    document.getElementById('checkoutBtn').classList.remove('hidden');
    document.getElementById('cart').classList.remove('hidden');
    document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}
function removeFromCart(e) {
    const index = e.target.getAttribute('data-index');
    cart.splice(index, 1);
    displayCart();
}
document.getElementById('checkoutBtn').addEventListener('click', () => {
    const paymentMethod = prompt('Please enter your payment method (e.g., Credit Card, PayPal):');
    if (paymentMethod) {
        alert(`Checkout successful! Payment method: ${paymentMethod}`);
        cart.length = 0; // Clear the cart after checkout
        displayCart(); // Refresh the cart view
    }
});
function handleCreditCardPayment() {
    const creditCardNumber = prompt('Enter your credit card number:');
    const amount = cart.reduce((total, item) => total + item.price, 0);
    if (creditCardNumber && amount) {
        alert(`Payment of $${amount} processed with credit card: ${creditCardNumber}`);
        cart.length = 0; // Clear cart after payment
        displayCart(); // Refresh the cart view
    } else {
        alert('Payment failed. Please try again.');
    }
}
if (document.getElementById('itemList')) {
    displayItems();
}
