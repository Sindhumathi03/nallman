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
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));

        // Close the payment modal
        document.getElementById('paymentModal').classList.add('hidden');

        // Clear cart display
        displayCart();
    }
    // You can add similar checks for PayPal or Bank Transfer, if needed.
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
