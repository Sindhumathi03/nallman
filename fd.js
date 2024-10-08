 const menuData = {
            'Pizza Place': [
             { name: 'Margherita Pizza', price: 8, offer: '20% off',image:'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg=' },
                { name: 'Pepperoni Pizza', price: 10, offer: 'Buy 1 Get 1 Free' },
                { name: 'Veggie Pizza', price: 9, offer: '10% off' }
             ]
            'Sushi Bar': [
                { name: 'California Roll', price: 12, offer: 'Free drink with order', image: 'https://via.placeholder.com/100' },
                { name: 'Spicy Tuna Roll', price: 14, offer: '20% off', image: 'https://via.placeholder.com/100' },
                { name: 'Veggie Roll', price: 10, offer: '10% off', image: 'https://via.placeholder.com/100' }
            ],
            'Indian Diner': [
                { name: 'Butter Chicken', price: 11, offer: '15% off', image: 'https://via.placeholder.com/100' },
                { name: 'Paneer Tikka', price: 9, offer: 'Buy 1 Get 1 Free', image: 'https://via.placeholder.com/100' },
                { name: 'Biryani', price: 10, offer: '10% off on orders above $20', image: 'https://via.placeholder.com/100' }
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
                li.innerHTML = `<img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto; margin-right: 10px;"> 
                                ${item.name} - $${item.price} (${item.offer})`;
                li.onclick = () => addToOrders(item);
                menuItems.appendChild(li);
            });

            document.getElementById('restaurants').style.display = 'none'; // Hide restaurants
            menu.style.display = 'block';
        }

        function hideMenu() {
            const menu = document.getElementById('menu');
            menu.style.display = 'none';
            document.getElementById('restaurants').style.display = 'block'; // Show restaurants again
        }

        function addToOrders(item) {
            const orderList = document.getElementById('orderList');
            const li = document.createElement('li');
            li.innerText = `${item.name} - $${item.price}`;
            orderList.appendChild(li);

            totalPrice += item.price;
            document.getElementById('totalPrice').innerText = `$${totalPrice}`;
            document.getElementById('totalPriceHeader').innerText = `$${totalPrice}`;

            toggleOrders();
            alert(`${item.name} ordered successfully!`);
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

        function hideOrders() {
            const myOrdersSection = document.getElementById('myOrders');
            myOrdersSection.style.display = 'none';
            document.getElementById('restaurants').style.display = 'block'; // Show restaurants again
        }

        function searchItems() {
            const query = document.getElementById('searchBar').value.toLowerCase();
            const menuItems = document.querySelectorAll('#menuItems li');
            const restaurantNames = Object.keys(menuData);

            restaurantNames.forEach(restaurant => {
                const items = menuData[restaurant];
                items.forEach(item => {
                    if (item.name.toLowerCase().includes(query)) {
                        const li = document.createElement('li');
                        li.innerText = `${item.name} - $${item.price} (${item.offer})`;
                        li.onclick = () => addToOrders(item);

                        const menuItems = document.getElementById('menuItems');
                        menuItems.insertBefore(li, menuItems.firstChild);
                    }
                });
            });

            menuItems.forEach(item => {
                item.style.display = 'none';
            });

            const newMenuItems = document.querySelectorAll('#menuItems li');
            newMenuItems.forEach(item => {
                if (item.innerText.toLowerCase().includes(query)) {
                    item.style.display = 'block';
                }
            });
        }

        function showOffers() {
            const offersModal = document.getElementById('offersModal');
            const offerItems = document.getElementById('offerItems');

            offerItems.innerHTML = '';

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
