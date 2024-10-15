const menuData = {
    'Pizza Place': {
        image: 'https://img.freepik.com/free-psd/italian-restaurant-square-flyer-template_23-2148670801.jpg?size=626&ext=jpg&ga=GA1.1.2146971310.1728371548&semt=ais_hybrid',
        items: [
            { name: 'Margherita Pizza', price: 8, offer: '20% off', image: 'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg=', rating: 0 },
            { name: 'Pepperoni Pizza', price: 10, offer: 'Buy 1 Get 1 Free', image: 'https://img.freepik.com/premium-photo/colorful-homemade-pizza-with-black-ham-cherry-tomatoes_1126714-13363.jpg?size=626&ext=jpg', rating: 0 },
            { name: 'Veggie Pizza', price: 9, offer: '10% off', image: 'https://img.freepik.com/premium-photo/colorful-homemade-pizza-with-black-ham-cherry-tomatoes_1126714-13105.jpg?size=626&ext=jpg&ga=GA1.1.2146971310.1728371548&semt=ais_hybrid', rating: 0 }
        ]
    },
    'Burger Joint': {
        image: 'https://media.istockphoto.com/id/1485677116/photo/waiter-hands-hold-a-plate-with-a-very-big-cheeseburger-in-pub.webp?a=1&b=1&s=612x612&w=0&k=20&c=tMi4IqxQ2t4LwwWyFca0bHLVqp6UQuUMeLxMf9G7EJc=',
        items: [
            { name: 'Cheeseburger', price: 5, offer: 'Free fries with burger', image: 'https://img.freepik.com/free-photo/big-sandwich-hamburger-burger-with-beef-red-onion-tomato-fried-bacon_2829-5398.jpg?size=626&ext=jpg&ga=GA1.1.2146971310.1728371548&semt=ais_hybrid', rating: 0 },
            { name: 'Veggie Burger', price: 6, offer: '20% off', image: 'https://img.freepik.com/premium-photo/green-vegan-burger-without-meat-with-vegetables_659326-3791.jpg?size=626&ext=jpg&ga=GA1.1.2146971310.1728371548&semt=ais_hybrid', rating: 0 },
            { name: 'Double Burger', price: 7, offer: '10% off on 2nd item', image: 'https://img.freepik.com/free-photo/view-delicious-burgers-with-buns-cheese_23-2150887913.jpg?size=626&ext=jpg&ga=GA1.1.2146971310.1728371548&semt=ais_hybrid', rating: 0 }
        ]
    },
    'Sushi Bar': {
        image: 'https://img.freepik.com/premium-photo/closeup-hands-expertly-rolling-sushi_167857-73950.jpg?size=626&ext=jpg&ga=GA1.1.2146971310.1728371548&semt=ais_hybrid',
        items: [
            { name: 'California Roll', price: 12, offer: 'Free drink with order', image: 'https://via.placeholder.com/100', rating: 0 },
            { name: 'Spicy Tuna Roll', price: 14, offer: '20% off', image: 'https://via.placeholder.com/100', rating: 0 },
            { name: 'Veggie Roll', price: 10, offer: '10% off', image: 'https://via.placeholder.com/100', rating: 0 }
        ]
    },
    'Indian Diner': {
        image: 'https://img.freepik.com/premium-photo/photography-tasty-indian-indian-tikka_1288657-47362.jpg?size=626&ext=jpg&ga=GA1.1.2146971310.1728371548&semt=ais_hybrid',
        items: [
            { name: 'Butter Chicken', price: 11, offer: '15% off', image: 'https://via.placeholder.com/100', rating: 0 },
            { name: 'Paneer Tikka', price: 9, offer: 'Buy 1 Get 1 Free', image: 'https://via.placeholder.com/100', rating: 0 },
            { name: 'Biryani', price: 10, offer: '10% off on orders above $20', image: 'https://via.placeholder.com/100', rating: 0 }
        ]
    }
};

let totalPrice = 0;
let orders = {}; // To store the order items with their quantities

// Function to initialize and show restaurants
function showRestaurants() {
    const restaurantSection = document.getElementById('restaurants');
    restaurantSection.innerHTML = '';

    Object.keys(menuData).forEach(restaurant => {
        const div = document.createElement('div');
        div.classList.add('restaurant');
        div.onclick = () => showMenu(restaurant);

        div.innerHTML = `
            <img src="${menuData[restaurant].image}" alt="${restaurant}">
            <h3>${restaurant}</h3>
            <p>${restaurant} Cuisine</p>
        `;

        restaurantSection.appendChild(div);
    });
}

// Function to show menu of a specific restaurant
function showMenu(restaurant) {
    const menu = document.getElementById('menu');
    const menuTitle = document.getElementById('menuTitle');
    const menuItems = document.getElementById('menuItems');

    menuTitle.innerText = restaurant;
    menuItems.innerHTML = '';

    menuData[restaurant].items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
            <span>${item.name} - $${item.price}</span>
            <div class="rating" data-item="${item.name}" onclick="rateItem('${restaurant}', ${index})">
                ${generateStars(item.rating)}
            </div>
            <button onclick="addToOrder('${restaurant}', ${index})">Add to Order</button>
        `;
        menuItems.appendChild(li);
    });

    menu.style.display = 'block';
}

// Function to hide the menu
function hideMenu() {
    document.getElementById('menu').style.display = 'none';
}

// Function to add an item to the order
function addToOrder(restaurant, index) {
    const item = menuData[restaurant].items[index];
    if (!orders[item.name]) {
        orders[item.name] = { item, quantity: 0 };
    }
    orders[item.name].quantity += 1;
    updateOrderList();
}

// Function to update the order list
function updateOrderList() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';

    totalPrice = 0;
    Object.values(orders).forEach(order => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${order.item.name} - $${order.item.price} x ${order.quantity}
            <button onclick="removeItem('${order.item.name}')">Remove</button>
        `;
        orderList.appendChild(li);
        totalPrice += order.item.price * order.quantity;
    });

    document.getElementById('totalPrice').innerText = `$${totalPrice.toFixed(2)}`;
    document.getElementById('totalPriceHeader').innerText = `$${totalPrice.toFixed(2)}`;
}

// Function to remove an item from the order
function removeItem(itemName) {
    if (orders[itemName]) {
        orders[itemName].quantity -= 1;
        if (orders[itemName].quantity <= 0) {
            delete orders[itemName];
        }
    }
    updateOrderList();
}

// Function to toggle "My Orders" section
function toggleOrders() {
    const myOrders = document.getElementById('myOrders');
    myOrders.style.display = myOrders.style.display === 'none' ? 'block' : 'none';
}

// Function to show current offers
function showOffers() {
    const offersModal = document.getElementById('offersModal');
    const offerItems = document.getElementById('offerItems');

    offerItems.innerHTML = `
        <li>20% off on your first order!</li>
        <li>Free fries with any burger!</li>
        <li>Buy 1 get 1 free on pizza!</li>
    `;

    offersModal.style.display = 'block';
}

// Function to hide offers modal
function hideOffers() {
    document.getElementById('offersModal').style.display = 'none';
}

// Function to rate an item (star rating)
function rateItem(restaurant, index) {
    const item = menuData[restaurant].items[index];
    const ratingDiv = document.querySelector(`.rating[data-item="${item.name}"]`);
    const currentRating = item.rating;
    const newRating = currentRating === 5 ? 0 : currentRating + 1;

    item.rating = newRating;
    ratingDiv.innerHTML = generateStars(newRating);
}

// Helper function to generate star HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `
            <span class="star" style="color: ${i <= rating ? 'gold' : 'gray'};">&#9733;</span>
        `;
    }
    return stars;
}

// Function to search items
function searchItems() {
    const searchBar = document.getElementById('searchBar').value.toLowerCase();
    const restaurantSection = document.getElementById('restaurants');
    const restaurants = restaurantSection.querySelectorAll('.restaurant');

    restaurants.forEach(restaurant => {
        const restaurantName = restaurant.querySelector('h3').innerText.toLowerCase();
        if (restaurantName.includes(searchBar)) {
            restaurant.style.display = 'block';
        } else {
            restaurant.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    showRestaurants();
});
