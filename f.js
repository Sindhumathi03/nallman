const restaurants = {
    pizzaPlace: {
        name: "Pizza Place",
        menu: [
            { item: "Margherita Pizza", price: 10 },
            { item: "Pepperoni Pizza", price: 12 },
            { item: "Veggie Pizza", price: 11 },
        ],
    },
    burgerJoint: {
        name: "Burger Joint",
        menu: [
            { item: "Cheeseburger", price: 8 },
            { item: "Veggie Burger", price: 7 },
            { item: "Chicken Burger", price: 9 },
        ],
    },
};

let total = 0;
const orders = [];

function showMenu(restaurantKey) {
    const restaurant = restaurants[restaurantKey];
    document.getElementById('menuTitle').innerText = restaurant.name;
    const menuList = document.getElementById('menu');
    menuList.innerHTML = '';

    restaurant.menu.forEach(dish => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${dish.item} - $${dish.price} <button onclick="order('${dish.item}', ${dish.price})">Order</button>`;
        menuList.appendChild(listItem);
    });

    document.getElementById('restaurants').style.display = 'none';
    document.getElementById('menuSection').style.display = 'block';
    document.getElementById('orderSummary').style.display = 'none';
}

function order(item, price) {
    orders.push({ item, price });
    total += price;
    updateOrderSummary();
}

function updateOrderSummary() {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';

    orders.forEach(order => {
        const listItem = document.createElement('li');
        listItem.textContent = `${order.item} - $${order.price}`;
        ordersList.appendChild(listItem);
    });

    document.getElementById('totalPrice').textContent = `Total: $${total}`;
    document.getElementById('orderSummary').style.display = 'block';
}

function goBack() {
    document.getElementById('restaurants').style.display = 'block';
    document.getElementById('menuSection').style.display = 'none';
}

function checkout() {
    alert(`Thank you for your order! Total amount: $${total}`);
    // Reset orders
    total = 0;
    orders.length = 0;
    updateOrderSummary();
    goBack();
}
