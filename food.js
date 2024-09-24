let total = 0;
const orders = [];

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
}

function checkout() {
    alert(`Thank you for your order! Total amount: $${total}`);
    // Reset orders
    total = 0;
    orders.length = 0;
    updateOrderSummary();
}
