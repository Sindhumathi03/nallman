// Predefined items
const predefinedItems = [
    {
        name: 'Vintage Lamp',
        price: 30,
        description: 'A beautiful vintage lamp.',
        owner: 'Admin',
        image: 'path/to/lamp.jpg' // Replace with actual path
    },
    {
        name: 'Wooden Chair',
        price: 50,
        description: 'A sturdy wooden chair.',
        owner: 'Admin',
        image: 'path/to/chair.jpg' // Replace with actual path
    },
    {
        name: 'Coffee Table',
        price: 100,
        description: 'A stylish coffee table.',
        owner: 'Admin',
        image: 'path/to/table.jpg' // Replace with actual path
    }
];

// Variables
const items = JSON.parse(localStorage.getItem('items')) || [];
const cart = [];
let currentUser = localStorage.getItem('currentUser');

// Function to display items
function displayItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    const allItems = [...predefinedItems, ...items];

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

    // Add event listeners for adding to cart and removing items
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Add item to the cart
function addToCart(e) {
    const index = e.target.getAttribute('data-index');
    const itemToAdd = items[index] || predefinedItems[index]; // Get item from items or predefined items
    cart.push(itemToAdd);
    alert(`${itemToAdd.name} added to cart.`);
    displayCart();
}

// Remove item from the user's list
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

// Display the cart
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Price:</strong> $${item.price}</p>
            <button class="remove-cart-btn" data-index="${index}">Remove from Cart</button>
        `;
        cartItems.appendChild(cartItemDiv);
    });
    document.getElementById('checkoutBtn').classList.remove('hidden');
    document.getElementById('cart').classList.remove('hidden');

    // Add event listeners for removing from cart
    document.querySelectorAll('.remove-cart-btn').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Remove item from the cart
function removeFromCart(e) {
    const index = e.target.getAttribute('data-index');
    cart.splice(index, 1);
    displayCart();
}

// Checkout functionality
document.getElementById('checkoutBtn').addEventListener('click', () => {
    // Display payment options
    document.getElementById('paymentOptions').classList.remove('hidden');
    document.getElementById('cart').classList.add('hidden');
});

// Handle the selection of payment option
document.getElementById('creditCardOption').addEventListener('click', () => {
    document.getElementById('creditCardForm').classList.remove('hidden');
    document.getElementById('paypalForm').classList.add('hidden');
});

document.getElementById('paypalOption').addEventListener('click', () => {
    document.getElementById('paypalForm').classList.remove('hidden');
    document.getElementById('creditCardForm').classList.add('hidden');
});

// Handle the credit card payment
document.getElementById('payBtn').addEventListener('click', () => {
    const cardNumber = document.getElementById('creditCardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber && expiryDate && cvv) {
        const productNames = cart.map(item => item.name).join(', ');
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5); // Assuming 5 days delivery
        alert(`Payment successful! Product(s): ${productNames}, Delivery Date: ${deliveryDate.toDateString()}`);
        
        // Clear cart after successful payment
        cart.length = 0;
        displayCart();
        document.getElementById('paymentOptions').classList.add('hidden');
    } else {
        alert('Please fill in all credit card details.');
    }
});

// Handle PayPal payment (example)
document.getElementById('paypalPayBtn').addEventListener('click', () => {
    const paypalEmail = document.getElementById('paypalEmail').value;

    if (paypalEmail) {
        const productNames = cart.map(item => item.name).join(', ');
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5); // Assuming 5 days delivery
        alert(`Payment successful! Product(s): ${productNames}, Delivery Date: ${deliveryDate.toDateString()}`);
        
        // Clear cart after successful payment
        cart.length = 0;
        displayCart();
        document.getElementById('paymentOptions').classList.add('hidden');
    } else {
        alert('Please enter PayPal email.');
    }
});

// Post new item functionality
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

            // Add the new item to both items array and localStorage
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items)); // Save items to localStorage
            
            // Now display all items including the new one
            displayItems();
            
            // Reset the form
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

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = 'login.html'; // Redirect to login page
});

// On page load, display items if the page is the main one
if (document.getElementById('itemList')) {
    displayItems();
}

