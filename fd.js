const menuData = {
    'Pizza Place': [
        { name: 'Margherita Pizza', price: 8, offer: '20% off' },
        { name: 'Pepperoni Pizza', price: 10, offer: 'Buy 1 Get 1 Free' },
        { name: 'Veggie Pizza', price: 9, offer: '10% off' }
    ],
    'Burger Joint': [
        { name: 'Cheeseburger', price: 5, offer: 'Free fries with burger' },
        { name: 'Veggie Burger', price: 6, offer: '20% off' },
        { name: 'Double Burger', price: 7, offer: '10% off on 2nd item' }
    ],
    'Sushi Bar': [
        { name: 'California Roll', price: 12, offer: 'Free drink with order' },
        { name: 'Spicy Tuna Roll', price: 14, offer: '20% off' },
        { name: 'Veggie Roll', price: 10, offer: '10% off' }
    ],
    'Indian Diner': [
        { name: 'Butter Chicken', price: 11, offer: '15% off' },
        { name: 'Paneer Tikka', price: 9, offer: 'Buy 1 Get 1 Free' },
        { name: 'Biryani', price: 10, offer: '10% off on orders above $20' }
    ]
};

let totalPrice = 0;

function showMenu(restaurant) {
    const menu = document.getElementById('menu');
    const menuTitle = document.getElementById('menuTitle');
    const menuItems = document.getElementById('menuItems');

    menuTitle.innerText = restaurant;
    menuItems.innerHTML = '';

    menuData[restaurant].forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - $${item.price} (${item.offer})`;
        li.onclick = () => addToOrders(item);
        menuItems.appendChild(li);
    });

    menu.style.display = 'block';
}

function hideMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}

function addToOrders(item) {
    const orderList = document.getElementById('orderList');
    const li = document.createElement('li');
    li.innerText = `${item.name} - $${item.price}`;
    orderList.appendChild(li);

    totalPrice += item.price;
    document.getElementById('totalPrice').innerText = `$${totalPrice}`;
    document.getElementById('totalPriceHeader').innerText = `$${totalPrice}`;
}

function searchItems() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const menuItems = document.querySelectorAll('#menuItems li');
    const restaurants = document.querySelectorAll('.restaurant');

    // Show all restaurants initially
    restaurants.forEach(restaurant => {
        restaurant.style.display = 'block';
    });

    menuItems.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
    });
}

function showOffers() {
    const offersModal = document.getElementById('offersModal');
    const offerItems = document.getElementById('offerItems');

    offerItems.innerHTML = ''; // Clear previous offers

    Object.keys(menuData).forEach(restaurant => {
        menuData[restaurant].forEach(item => {
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
