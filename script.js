
JavaScript (script.js):
// Load items from Google Sheets - https://docs.google.com/spreadsheets/d/1Y7QGXt0Oj1mL830iyq5kC0OwszRUGf87OvsqYlXBgW4/edit?usp=sharing
function loadItems() {
    fetch('https://sheets.googleapis.com/v4/spreadsheets/1Y7QGXt0Oj1mL830iyq5kC0OwszRUGf87OvsqYlXBgW4/values/Sheet1!A2:D?key=AIzaSyD3hKoq1iyBYUBxZUe3WaN3ioAb8b1IyVM')
        .then(response => response.json())
        .then(data => {
            const items = data.values;
            const itemsContainer = document.getElementById('items-container');
            itemsContainer.innerHTML = '';

            items.forEach(item => {
                const name = item[0];
                const price = item[1];
                const stock = item[2];

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${name}</td>
                    <td>${price}</td>
                    <td>${stock}</td>
                    <td><input type="number" class="order-quantity" min="1" max="${stock}" value="1"></td>
                    <td><button class="order-button">Order</button></td>
                `;
                itemsContainer.appendChild(row);
            });

            // Add event listeners to order buttons
            const orderButtons = document.getElementsByClassName('order-button');
            for (let i = 0; i < orderButtons.length; i++) {
                orderButtons[i].addEventListener('click', placeOrder);
            }
        })
        .catch(error => {
            console.error('Error loading items:', error);
        });
}

// Handle form submission
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();
    placeOrder();
});

// Place an order
function placeOrder() {
    const itemName = this.parentNode.parentNode.cells[0].innerText;
    const quantityInput = this.parentNode.parentNode.querySelector('.order-quantity');
    const quantity = parseInt(quantityInput.value);

    // Perform order processing or submission to a backend server
    // You can customize this part to suit your needs

    // Update stock in the table
    const stockCell = this.parentNode.parentNode.cells[2];
    const stock = parseInt(stockCell.innerText);
    if (quantity > stock) {
        alert('Insufficient stock.');
        return;
    }
    stockCell.innerText = stock - quantity;

    // Clear the form fields
    document.getElementById('item-name').value = '';
    document.getElementById('quantity').value = '';
    quantityInput.value = 1;
}

// Call the loadItems function to fetch and display the items
loadItems();
