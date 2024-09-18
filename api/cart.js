document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-items');
    const totalItemsSpan = document.getElementById('total-items');
    const totalPriceSpan = document.getElementById('total-price');
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;
    let totalPrice = 0;
  
    if (cart.length > 0) {
      cart.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Price: $${product.price.toFixed(2)}</p>
          <p>Quantity: ${product.quantity}</p>
          <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
        `;
        cartContainer.appendChild(itemDiv);
  
        totalItems += product.quantity;
        totalPrice += product.price * product.quantity;
      });
  
      totalItemsSpan.textContent = totalItems;
      totalPriceSpan.textContent = totalPrice.toFixed(2);
    } else {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
  });
  