// Show the selected section and hide others
function showSection(sectionId) {
    const sections = ['productListing', 'searchProducts', 'location'];
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
        document.getElementById('login').classList.add('hidden');
        document.getElementById('home').classList.remove('hidden'); // Navigate to home page
    }
}

// Handle product form submission
function postProduct(event) {
    event.preventDefault();
    const title = document.getElementById('productTitle').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;
    const category = document.getElementById('category').value;
    const imageFile = document.getElementById('productImage').files[0];

    // Logic to post the product goes here
    if (imageFile) {
        alert(`Product posted: ${title}, ${description}, $${price}, ${category}, Image: ${imageFile.name}`);
    } else {
        alert('Please choose an image.');
    }

    document.getElementById('postProductForm').reset();
    showSection('searchProducts'); // Return to search products after posting
}

// Search products functionality (placeholder)
function searchProducts() {
    const keyword = document.getElementById('searchKeyword').value;
    alert(`Searching for: ${keyword}`);
}
