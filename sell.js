// Show the selected section and hide others
function showSection(sectionId) {
    const sections = ['login', 'home', 'productListing', 'searchProducts', 'messageSeller', 'leaveReview', 'paymentMethod'];
    sections.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Handle login form submission
function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Here you would typically authenticate the user
    if (email && password) {
        alert('Login successful!'); // Replace with actual authentication
        showSection('home'); // Navigate to home page
    }
}

// Handle product form submission
function postProduct(event) {
    event.preventDefault();
    const title = document.getElementById('productTitle').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;
    const category = document.getElementById('category').value;

    // Logic to post the product goes here
    alert(`Product posted: ${title}, ${description}, $${price}, ${category}`);
    document.getElementById('productForm').reset();
    showSection('home'); // Return to home after posting
}

// Search products functionality (placeholder)
function searchProducts() {
    const keyword = document.getElementById('searchKeyword').value;
    alert(`Searching for: ${keyword}`);
}

// Send message to seller
function sendMessage() {
    const message = document.getElementById('messageInput').value;
    alert(`Message sent: ${message}`);
    document.getElementById('messageInput').value = ''; // Clear input after sending
}

// Submit review
function submitReview() {
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const reviewText = document.getElementById('reviewText').value;
    alert(`Review submitted: Rating - ${rating}, Review - ${reviewText}`);
    document.getElementById('reviewText').value = ''; // Clear input after submitting
}

// Process payment
function processPayment() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    alert(`Proceeding with payment via: ${paymentMethod}`);
}
