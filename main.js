

//search section //
document.getElementById('searchButton').addEventListener('click', function () {
  const query = document.getElementById('searchInput').value;

  fetch(`/search?q=${query}`)
    .then(response => response.json())
    .then(data => {
      const resultsContainer = document.getElementById('resultsContainer');
      resultsContainer.innerHTML = '';

      if (data.length > 0) {
        data.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.classList.add('product-item');
          productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Category: ${product.category}</p>
          `;
          resultsContainer.appendChild(productDiv);
        });
      } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
      }
    })
    .catch(error => console.error('Error:', error));
});
//end search section//

// JavaScript to handle quantity increments and decrement
document.addEventListener('DOMContentLoaded', () => {
  const templateItems = document.querySelectorAll('.template-item');

  templateItems.forEach(item => {
    const incrementButton = item.querySelector('.increment');
    const decrementButton = item.querySelector('.decrement');
    const quantitySpan = item.querySelector('.quantity');

    incrementButton.addEventListener('click', () => {
      let currentQuantity = parseInt(quantitySpan.textContent, 10);
      quantitySpan.textContent = currentQuantity + 1;
    });

    decrementButton.addEventListener('click', () => {
      let currentQuantity = parseInt(quantitySpan.textContent, 10);
      if (currentQuantity > 0) {
        quantitySpan.textContent = currentQuantity - 1;
      }
    });
  });
});


//console.log("script loaded");


console.log("Server running on port 3000");
document.addEventListener('DOMContentLoaded', () => {
  const templateItems = document.querySelectorAll('.template-item');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  templateItems.forEach(item => {
    const incrementButton = item.querySelector('.increment');
    const decrementButton = item.querySelector('.decrement');
    const quantitySpan = item.querySelector('.quantity');
    const addToCartButton = item.querySelector('.add-to-cart');

    incrementButton.addEventListener('click', () => {
      let currentQuantity = parseInt(quantitySpan.textContent, 10);
      quantitySpan.textContent = currentQuantity + 1;
    });

    decrementButton.addEventListener('click', () => {
      let currentQuantity = parseInt(quantitySpan.textContent, 10);
      if (currentQuantity > 0) {
        quantitySpan.textContent = currentQuantity - 1;
      }
    });

    addToCartButton.addEventListener('click', () => {
      const quantity = parseInt(quantitySpan.textContent, 10);
      if (quantity > 0) {
        const product = {
          name: item.querySelector('h3').textContent,
          description: item.querySelector('p').textContent,
          price: parseFloat(item.dataset.price), // Assuming you have a data-price attribute
          quantity: quantity
        };

        const existingProductIndex = cart.findIndex(p => p.name === product.name);
        if (existingProductIndex > -1) {
          cart[existingProductIndex].quantity += quantity;
        } else {
          cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${quantity} ${product.name} added to cart!`);
        quantitySpan.textContent = '0'; // Reset quantity after adding to cart
      } else {
        alert('Quantity must be greater than 0 to add to cart.');
      }
    });
  });
});

document.getElementById("signup-button").addEventListener("click", function (event) {
  event.preventDefault(); 
  
  const emailInput = document.getElementById("email-input").value;
  const messageDiv = document.getElementById("message");

  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (emailPattern.test(emailInput)) {
    
    messageDiv.style.color = "green";
    messageDiv.textContent = "Thank you for signing up for our newsletter!";
    
    
    
    console.log("User's Email: ", emailInput);
    
    
    document.getElementById("email-input").value = '';
  } else {
    
    messageDiv.style.color = "red";
    messageDiv.textContent = "Please enter a valid email address.";
  }
});


fetch('https://example.com/api/newsletter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email: emailInput })
})
.then(response => response.json())
.then(data => {
  messageDiv.textContent = "You have successfully signed up!";
})
.catch(error => {
  messageDiv.textContent = "There was an error, please try again later.";
});
 