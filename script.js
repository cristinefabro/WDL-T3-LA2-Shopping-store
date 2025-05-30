(function() {
    const cart = {};
    const productNames = {
      banana: 'Banana',
      apple: 'Apple',
      orange: 'Orange'
    };
    const productPrices = {
      banana: 2.25,
      apple: 2.30,
      orange: 1.99
    };
    const productListEl = document.getElementById('productList');
    const cartListEl = document.getElementById('cartList');
    const cartTotalEl = document.getElementById('cartTotal');
    
    function renderCart() {
      cartListEl.innerHTML = '';
      const items = Object.keys(cart);
      if (items.length === 0) {
        cartTotalEl.style.display = 'none';
        const emptyMsg = document.createElement('li');
        emptyMsg.className = 'empty-cart';
        emptyMsg.textContent = 'Your cart is empty.';
        cartListEl.appendChild(emptyMsg);
        return;
      }
      let totalPrice = 0;
      items.forEach(product => {
        const qty = cart[product];
        const price = productPrices[product];
        const itemTotal = qty * price;
        totalPrice += itemTotal;
        
        const li = document.createElement('li');

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'cart-item-details';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'cart-item-name';
        nameSpan.textContent = productNames[product];
        
        const qtyPriceSpan = document.createElement('span');
        qtyPriceSpan.className = 'cart-item-qty-price';
        qtyPriceSpan.textContent = `${qty} x $${price.toFixed(2)} = $${itemTotal.toFixed(2)}`;
        
        detailsDiv.appendChild(nameSpan);
        detailsDiv.appendChild(qtyPriceSpan);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.dataset.product = product;
        removeBtn.addEventListener('click', () => {
          removeFromCart(product);
        });
        li.appendChild(detailsDiv);
        li.appendChild(removeBtn);
        cartListEl.appendChild(li);
      });
      cartTotalEl.style.display = 'block';
      cartTotalEl.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    function addToCart(product) {
      if (!cart[product]) {
        cart[product] = 1;
      } else {
        cart[product]++;
      }
      renderCart();
    }

    function removeFromCart(product) {
      if (!cart[product]) return;
      if (cart[product] > 1) {
        cart[product]--;
      } else {
        delete cart[product];
      }
      renderCart();
    }
    
    productListEl.addEventListener('click', (event) => {
      if (event.target.classList.contains('add-btn')) {
        const product = event.target.dataset.product;
        addToCart(product);
      }
    });

    renderCart();
  })();