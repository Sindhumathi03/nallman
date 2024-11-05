// Predefined items for demo
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

// Get saved items and cart from localStorage
const items = JSON.parse(localStorage.getItem('items')) || [];
const cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = localStorage.getItem('currentUser');

// If not logged in, redirect to login page
if (!currentUser && window.location.pathname !== '/login.html') {
    alert('You need to log in first!');
    window.location.href = '/login.html'; // Redirect to login page
}

// Event listeners for buttons in the header
document.getElementById('productsBtn').addEventListener('click', () => {
    displayItems();
    document.getElementById('cart').classList.add('hidden');
    document.getElementById('itemForm').classList.add('hidden'); // Hide post ad form
});

document.getElementById('postAdBtn').addEventListener('click', () => {
    document.getElementById('itemForm').classList.toggle('hidden');
});

document.getElementById('cartBtn').addEventListener('click', () => {
    displayCart();
    document.getElementById('itemList').innerHTML = ''; // Clear products list when viewing cart
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = '/login.html'; // Redirect to login page
});

// Handle posting an ad (submit form)
document.getElementById('submitItemBtn')?.addEventListener('click', (e) => {
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
        localStorage.setItem('items', JSON.stringify(items)); // Save to localStorage

        displayItems(); // Re-display items with the new one added

        // Reset the form and hide it
        document.getElementById('itemForm').reset();
        document.getElementById('itemForm').classList.add('hidden');
    } else {
        alert('Please fill in all fields.');
    }
});

// Cancel button on post ad form
document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('itemForm').classList.add('hidden');
});

// Display the list of all items (including user-added ones)
function displayItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; // Clear the list before displaying new items
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

    // Add event listeners for add-to-cart and remove buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Add an item to the cart
function addToCart(e) {
    const index = e.target.getAttribute('data-index');
    const itemToAdd = items[index] || predefinedItems[index]; // Get item from user or predefined list
    cart.push(itemToAdd);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    alert(`${itemToAdd.name} added to cart.`);
}

// Remove an item from the list (if the item was added by the current user)
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
    cartItems.innerHTML = ''; // Clear cart before displaying it
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

    // Add event listeners for removing items from the cart
    document.querySelectorAll('.remove-cart-btn').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Remove an item from the cart
function removeFromCart(e) {
    const index = e.target.getAttribute('data-index');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCart();
}

// Checkout functionality
document.getElementById('checkoutBtn').addEventListener('click', () => {
    const paymentModal = document.getElementById('paymentModal');
    paymentModal.classList.remove('hidden');
});

// Handle payment method selection
document.querySelectorAll('.payment-option').forEach(button => {
    button.addEventListener('click', showPaymentForm);
});

// Show payment form based on the selected method
function showPaymentForm(e) {
    const paymentMethod = e.target.getAttribute('data-payment');
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.innerHTML = ''; // Clear previous form

    if (paymentMethod === 'creditCard') {
        paymentForm.innerHTML = `
            <label>Credit Card Number: <input type="text" id="creditCardNumber" required></label>
            <label>Expiration Date: <input type="text" id="creditCardExp" required></label>
            <label>CVV: <input type="text" id="creditCardCVV" required></label>
            <label>Amount: <input type="text" id="creditCardAmount" value="$${calculateTotalAmount()}" readonly></label>
            <button id="confirmPaymentBtn">Confirm Payment</button>
        `;
        document.getElementById('confirmPaymentBtn')?.addEventListener('click', confirmPayment);
    }
}

// Confirm the payment and display the order summary
function confirmPayment() {
    const creditCardNumber = document.getElementById('creditCardNumber').value;
    const creditCardExp = document.getElementById('creditCardExp').value;
    const creditCardCVV = document.getElementById('creditCardCVV').value;
    const creditCardAmount = document.getElementById('creditCardAmount').value;

    if (!creditCardNumber || !creditCardExp || !creditCardCVV) {
        alert('Please fill in all the fields.');
        return;
    }

    // Simulate a successful payment
    alert(`Payment of $${creditCardAmount} via Credit Card successful!`);

    // Display the order summary
    displayOrderSummary();

    // Clear the cart
    cart.length = 0;
    localStorage.setItem('cart', JSON.stringify(cart));

    // Close the modal
    document.getElementById('paymentModal').classList.add('hidden');
}

// Display the order summary
function displayOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const deliveryDate = calculateDeliveryDate();

    let orderDetailsHTML = `<h2>Order Summary</h2>`;
    orderDetailsHTML += `<p><strong>Products:</strong></p>`;
    cart.forEach(item => {
        orderDetailsHTML += `<p>${item.name} - $${item.price}</p>`;
    });

    orderDetailsHTML += `<p><strong>Delivery Date:</strong> ${deliveryDate}</p>`;
    orderSummary.innerHTML = orderDetailsHTML;
}

// Calculate the total amount for the cart
function calculateTotalAmount() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

// Calculate estimated delivery date (5 days from today)
function calculateDeliveryDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5); // Add 5 days for delivery
    return `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
}
