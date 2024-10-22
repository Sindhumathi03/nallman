let products = [];

// Display products
function displayProducts() {
    const productsDiv = document.getElementById('searchResults');
    productsDiv.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
        `;
        productsDiv.appendChild(productDiv);
    });
}

// Post new product
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('productTitle').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;

    const newProduct = {
        title,
        description,
        price: parseFloat(price).toFixed(2),
    };

    products.push(newProduct);
    displayProducts();

    // Clear form
    this.reset();
});

// Search products
function searchProducts() {
    const keyword = document.getElementById('searchKeyword').value.toLowerCase();
    const category = document.getElementById('searchCategory').value;
    const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(keyword) && 
               (category === '' || product.category === category);
    });
    displayProducts(filteredProducts);
}

// Send message
function sendMessage() {
    const messageInput = document.getElementById('messageInput').value;
    alert('Message sent: ' + messageInput);
    document.getElementById('messageInput').value = '';
}

// Submit review
function submitReview() {
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const reviewText = document.getElementById('reviewText').value;

    const reviewsList = document.getElementById('reviewsList');
    const reviewDiv = document.createElement('div');
    reviewDiv.innerHTML = `<p>Rating: ${'★'.repeat(rating)} ${'☆'.repeat(5 - rating)}</p><p>${reviewText}</p>`;
    reviewsList.appendChild(reviewDiv);
    
    // Clear review form
    document.getElementById('reviewText').value = '';
}

// Process payment
function processPayment() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    alert('Processing payment via ' + paymentMethod);
}

// Social login placeholder
function socialLogin(provider) {
    alert('Logging in with ' + provider);
}
