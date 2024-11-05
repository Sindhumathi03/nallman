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
const cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = localStorage.getItem('currentUser');

// Check if the login page is loaded
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

// Check if the main page is loaded
if (document.getElementById('logoutBtn')) {
    if (!currentUser) {
        alert('You need to log in first!');
        window.location.href = 'sell.html'; // Redirect to login if not logged in
    }

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        alert('Logged out successfully!');
        window.location.href = 'login.html';
    });
}

// Navigation buttons
document.getElementById('productsBtn').addEventListener('click', () => {
    displayItems();
    document.getElementById('cart').classList.add('hidden');
});

document.getElementById('postAdBtn').addEventListener('click', () => {
    document.getElementById('itemForm').classList.toggle('hidden');
});

document.getElementById('cartBtn').addEventListener('click', () => {
    displayCart();
    document.getElementById('itemList').innerHTML = '';
});

// Adding item functionality
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
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
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
            <button class="remove-cart-btn" data-index="${index}">Remove from Cart</button>
        `;
        cartItems.appendChild(cartItemDiv);
    });
    document.getElementById('checkoutBtn').classList.remove('hidden');
    document.getElementById('cart').classList.remove('hidden');

    document.querySelectorAll('.remove-cart-btn').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function removeFromCart(e) {
    const index = e.target.getAttribute('data-index');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCart();
}

// Checkout functionality
document.getElementById('checkoutBtn').addEventListener('click', () => {
    // Show payment modal with options
    document.getElementById('paymentModal').classList.remove('hidden');
});

// Handle payment selection
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function () {
        const selectedPayment = this.dataset.payment;
        showPaymentForm(selectedPayment);
    });
});

// Show form based on selected payment method
function showPaymentForm(paymentMethod) {
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.innerHTML = '';  // Clear any previous form content

    if (paymentMethod === 'creditCard') {
        // For Credit Card, ask for the credit card number, expiration date, CVV, and amount
        paymentForm.innerHTML = `
            <label for="creditCardNumber">Credit Card Number:</label>
            <input type="text" id="creditCardNumber" placeholder="1234 5678 1234 5678" required>

            <label for="creditCardExp">Expiration Date (MM/YY):</label>
            <input type="text" id="creditCardExp" placeholder="MM/YY" required>

            <label for="creditCardCVV">CVV:</label>
            <input type="text" id="creditCardCVV" placeholder="123" required>

            <label for="creditCardAmount">Amount ($):</label>
            <input type="number" id="creditCardAmount" placeholder="Amount to pay" value="${calculateTotalAmount()}" readonly required>
        `;
    } else if (paymentMethod === 'paypal') {
        paymentForm.innerHTML = `
            <label for="paypalEmail">PayPal Email:</label>
            <input type="email" id="paypalEmail" placeholder="your-email@example.com">
        `;
    } else if (paymentMethod === 'bankTransfer') {
        paymentForm.innerHTML = `
            <label for="bankAccount">Bank Account Number:</label>
            <input type="text" id="bankAccount" placeholder="Account Number">
        `;
    }

    // Show confirm button after payment details are filled
    paymentForm.innerHTML += `<button id="confirmPaymentBtn">Confirm Payment</button>`;
    document.getElementById('confirmPaymentBtn').addEventListener('click', confirmPayment);
}

// Function to calculate total amount from the cart
function calculateTotalAmount() {
    return cart.reduce((total, item) => total + item.price, 0);
}

// Confirm payment and process the order
function confirmPayment() {
    // Check if it's a credit card payment
    if (document.getElementById('creditCardNumber')) {
        const creditCardNumber = document.getElementById('creditCardNumber').value;
        const creditCardExp = document.getElementById('creditCardExp').value;
        const creditCardCVV = document.getElementById('creditCardCVV').value;
        const creditCardAmount = document.getElementById('creditCardAmount').value;

        // Validate the credit card information
        if (!creditCardNumber || !creditCardExp || !creditCardCVV) {
            alert('Please fill in all credit card fields.');
            return;
        }

        // Simulate payment process (in a real-world scenario, you'd integrate with a payment API here)
        alert(`Payment of $${creditCardAmount} via Credit Card successful! Order confirmed.`);

        // Process the order (Display the products and delivery date)
        displayOrderSummary();

        // Clear the cart and update localStorage
        cart.length = 0;
        localStorage.setItem('cart', JSON.stringify(cart));

        // Close the payment modal
        document.getElementById('paymentModal').classList.add('hidden');

        // Clear cart display
        displayCart();
    }
}

// Display the products and delivery date after a successful payment
function displayOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const deliveryDate = calculateDeliveryDate();

    // Displaying the order summary
    let orderDetailsHTML = `<h2>Order Summary</h2>`;
    orderDetailsHTML += `<p><strong>Products:</strong></p>`;
    cart.forEach(item => {
        orderDetailsHTML += `<p>${item.name} - $${item.price}</p>`;
    });

    orderDetailsHTML += `<p><strong>Delivery Date:</strong> ${deliveryDate}</p>`;

    orderSummary.innerHTML = orderDetailsHTML;
}

// Calculate a delivery date (for simplicity, assume a fixed date or 5 days from now)
function calculateDeliveryDate() {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate.setDate(currentDate.getDate() + 5)); // 5 days later
    return `${deliveryDate.getDate()}/${deliveryDate.getMonth() + 1}/${deliveryDate.getFullYear()}`;
}
