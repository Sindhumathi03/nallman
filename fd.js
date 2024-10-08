const menuData = {
    'Pizza Place': [
        { name: 'Margherita Pizza', price: 8 },
        { name: 'Pepperoni Pizza', price: 10 },
        { name: 'Veggie Pizza', price: 9 }
    ],
    'Burger Joint': [
        { name: 'Cheeseburger', price: 5 },
        { name: 'Veggie Burger', price: 6 },
        { name: 'Double Burger', price: 7 }
    ],
    'Sushi Bar': [
        { name: 'California Roll', price: 12 },
        { name: 'Spicy Tuna Roll', price: 14 },
        { name: 'Veggie Roll', price: 10 }
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
        li.innerText = `${item.name} - $${item.price}`;
        li.onclick = () => addToOrders(item); // Pass the entire item object
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

    // Update total price
    totalPrice += item.price;
    document.getElementById('totalPrice').innerText = `$${totalPrice}`;
    document.getElementById('totalPriceHeader').innerText = `$${totalPrice}`;
}

function searchItems() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const menuItems = document.querySelectorAll('#menuItems li');

    menuItems.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
    });
}
