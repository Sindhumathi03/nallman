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

function showMenu(restaurant) {
    const menu = document.getElementById('menu');
    const menuTitle = document.getElementById('menuTitle');
    const menuItems = document.getElementById('menuItems');

    menuTitle.innerText = restaurant;
    menuItems.innerHTML = '';

    menuData[restaurant].items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto; margin-right: 10px;"> 
            ${item.name} - $${item.price} (${item.offer}) 
            <span class="rating" data-index="${index}">${getStars(item.rating)}</span>
        `;
        li.onclick = (e) => {
            e.stopPropagation(); // Prevent menu from closing
            addToOrders(item);
        };
        li.querySelector('.rating').onclick = (e) => {
            e.stopPropagation(); // Prevent menu from closing
            rateFood(e, item);
        };
        menuItems.appendChild(li);
    });

    document.getElementById('restaurants').style.display = 'none'; // Hide restaurants
    menu.style.display = 'block';
}

function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        const starColor = i <= rating ? 'yellow' : 'silver'; // Change color based on rating
        stars += `<span class="star" style="color: ${starColor}; cursor: pointer;" onclick="rateFood(event, ${i})">&#9733;</span>`;
    }
    return stars;
}

function rateFood(event, star) {
    const itemIndex = event.target.closest('li').querySelector('.rating').dataset.index; // Get item index
    const restaurantName = document.getElementById('menuTitle').innerText; // Get current restaurant name
    const item = menuData[restaurantName].items[itemIndex]; // Get the current item

    item.rating = star; // Set the rating to the clicked star
    const starsContainer = event.target.closest('li').querySelector('.rating');
    starsContainer.innerHTML = getStars(item.rating); // Update stars display
}

function addToOrders(item) {
    const orderList = document.getElementById('orderList');

    const li = document.createElement('li');
    li.innerText = `${item.name} - $${item.price}`;
    orderList.appendChild(li);

    totalPrice += item.price;
    updateTotalPrice();

    alert(`"${item.name}" ordered successfully!`);
}

function updateTotalPrice() {
    document.getElementById('totalPrice').innerText = `$${totalPrice}`;
    document.getElementById('totalPriceHeader').innerText = `$${totalPrice}`;
}

function toggleOrders() {
    const myOrdersSection = document.getElementById('myOrders');

    if (myOrdersSection.style.display === 'block') {
        myOrdersSection.style.display = 'none';
    } else {
        myOrdersSection.style.display = 'block';
        document.getElementById('restaurants').style.display = 'none'; // Hide restaurants
        document.getElementById('menu').style.display = 'none'; // Hide menu
    }
}

function hideMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
    document.getElementById('restaurants').style.display = 'block'; // Show restaurants again
}

function hideOrders() {
    const myOrdersSection = document.getElementById('myOrders');
    myOrdersSection.style.display = 'none';
    document.getElementById('restaurants').style.display = 'block'; // Show restaurants again
}

function searchItems() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const menuItems = document.querySelectorAll('#menuItems li');

    menuItems.forEach(item => {
        const itemName = item.innerText.toLowerCase();
        item.style.display = itemName.includes(query) ? 'block' : 'none'; // Show matching items
    });
}

function showOffers() {
    const offersModal = document.getElementById('offersModal');
    const offerItems = document.getElementById('offerItems');

    offerItems.innerHTML = '';

    Object.keys(menuData).forEach(restaurant => {
        menuData[restaurant].items.forEach(item => {
            if (item.offer) {
                const li = document.createElement('li');
                li.innerText = `${item.name} at ${restaurant}: ${item.offer}`;
                offerItems.appendChild(li);
            }
        });
    });

    offersModal.style.display = 'block';
}

function hideOffers() {
    const offersModal = document.getElementById('offersModal');
    offersModal.style.display = 'none';
}

// Initialize the restaurant list on page load
document.addEventListener('DOMContentLoaded', showRestaurants);
