
const menuData = {
};

let totalPrice = 0;

// Initialize the restaurant list on page load
document.addEventListener('DOMContentLoaded', showRestaurants);

function showRestaurants() {
  const restaurantSection = document.getElementById('restaurants');
  restaurantSection.innerHTML = '';
  Object.keys(menuData).forEach((restaurant) => {
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
      <hr>
      <input type="number" id="quantity_${index}" value="1" min="1" style="width: 40px; margin-left: 10px;"/>
      <hr>
      <button class="addToOrderBtn" data-index="${index}">Add to Order</button>
    `;
    li.querySelector('.addToOrderBtn').onclick = (e) => {
      e.stopPropagation();
      const quantity = parseInt(document.getElementById(`quantity_${index}`).value);
      addToOrders(item, quantity);
    };
    li.querySelector('.rating').onclick = (e) => {
      e.stopPropagation();
      rateFood(e, item);
    };
    menuItems.appendChild(li);
  });
  document.getElementById('restaurants').style.display = 'none';
  menu.style.display = 'block';
}

function getStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    const starColor = i <= rating ? 'yellow' : 'silver';
    stars += `<span class="star" style="color: ${starColor}; cursor: pointer;" onclick="rateFood(event, ${i})">&#9733;</span>`;
  }
  return stars;
}

function rateFood(event, star) {
  const itemIndex = event.target.closest('li').querySelector('.rating').dataset.index;
  const restaurantName = document.getElementById('menuTitle').innerText;
  const item = menuData[restaurantName].items[itemIndex];
  item.rating = star;
  const starsContainer = event.target.closest('li').querySelector('.rating');
  starsContainer.innerHTML = getStars(item.rating);
}

function addToOrders(item, quantity) {
  const orderList = document.getElementById('orderList');
  const li = document.createElement('li');
  li.innerHTML = `
    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
    ${item.name} - $${item.price} x ${quantity} = $${item.price * quantity}
  `;
  orderList.appendChild(li);
  totalPrice += item.price * quantity;
  updateTotalPrice();
  alert(`"${item.name}" ordered successfully!`);
}

function updateTotalPrice() {
  document.getElementById('totalPrice').innerText = `$${totalPrice}`;
  document.getElementById('totalPriceHeader').innerText = `Total: $${totalPrice}`;
}

function toggleOrders() {
  const myOrdersSection = document.getElementById('myOrders');
  if (myOrdersSection.style.display === 'block') {
    myOrdersSection.style.display = 'none';
  } else {
    myOrdersSection.style.display = 'block';
    document.getElementById('restaurants').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
  }
}

function hideMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'none';
  document.getElementById('restaurants').style.display = 'block';
}

function hideOrders() {
  const myOrdersSection = document.getElementById('myOrders');
  myOrdersSection.style.display = 'none';
  document.getElementById('restaurants').style.display = 'block';
}

function searchItems() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const menuItems = document.querySelectorAll('#menuItems li');
  menuItems.forEach((item) => {
    const itemName = item.innerText.toLowerCase();
    item.style.display = itemName.includes(query) ? 'block' : 'none
```Here's the rest of the JavaScript code:

```
function checkoutOrder() {
  const myOrdersSection = document.getElementById('myOrders');
  const checkoutSection = document.getElementById('checkoutSection');
  checkoutSection.style.display = 'block';
  myOrdersSection.style.display = 'none';
  document.getElementById('totalAmount').innerText = `Total Amount: $${totalPrice}`;
}

function payNow() {
  alert('Payment successful!');
  document.getElementById('orderList').innerHTML = '';
  document.getElementById('totalPrice').innerText = `$0`;
  totalPrice = 0;
  document.getElementById('checkoutSection').style.display = 'none';
  document.getElementById('myOrders').style.display = 'block';
}

document.getElementById('checkoutBtn').onclick = checkoutOrder;
document.getElementById('payNowBtn').onclick = payNow;

function showOffers() {
  const offersModal = document.getElementById('offersModal');
  const offerItems = document.getElementById('offerItems');
  offerItems.innerHTML = '';
  Object.keys(menuData).forEach((restaurant) => {
    menuData[restaurant].items.forEach((item) => {
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

document.getElementById('offersBtn').onclick = showOffers;
document.getElementById('closeOffersBtn').onclick = hideOffers;


