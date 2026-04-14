// Script for navigation bar
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", (e) => {
    e.preventDefault();
    nav.classList.remove("active");
  });
}

document.addEventListener("click", (e) => {
  if (nav && nav.classList.contains("active") && !nav.contains(e.target) && bar && !bar.contains(e.target)) {
    nav.classList.remove("active");
  }
});

// --- Dynamic Shopping Cart Logic ---

// 1. Storage Utility Functions
function getCart() {
  return JSON.parse(localStorage.getItem("shoppingCart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const cart = getCart();
  // Check if item already exists by Name && Image
  const existingItemIndex = cart.findIndex(item => item.name === product.name && item.image === product.image);
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  alert(`${product.name} added to cart!`);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  if (document.getElementById("cart-tbody")) renderCartPage();
}

function updateQuantity(index, newQuantity) {
  const cart = getCart();
  if (newQuantity < 1) newQuantity = 1;
  cart[index].quantity = parseInt(newQuantity);
  saveCart(cart);
  if (document.getElementById("cart-tbody")) renderCartPage();
}

// 2. Global Badge Updater
function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Find all cart badge icons on desktop/mobile instances
  const bagIcons = document.querySelectorAll('.fa-shopping-bag');
  bagIcons.forEach(bag => {
    let badge = bag.parentNode.querySelector('.cart-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge';
      bag.parentNode.appendChild(badge);
    }
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

// 3. Attach Listeners to 'Add To Cart' Buttons Globally
function initAddToCartListeners() {
  const addToCartButtons = document.querySelectorAll('.pro .cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productBox = e.target.closest('.pro');
      if (!productBox) return;

      const image = productBox.querySelector('img').src;
      const name = productBox.querySelector('.des h5').innerText;
      const rawPrice = productBox.querySelector('.des h4').innerText;
      
      // Parse price, removing any non-numeric symbols but keeping decimals
      const price = parseFloat(rawPrice.replace(/[^0-9.]/g, ''));

      addToCart({ name, price, image });
    });
  });
}

// 4. Cart Page Rendering Logic
function renderCartPage() {
  const tbody = document.getElementById("cart-tbody");
  if (!tbody) return;

  const cart = getCart();
  tbody.innerHTML = ''; // clear table
  let subtotal = 0;

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Your cart is empty.</td></tr>`;
    document.getElementById("cart-subtotal").innerHTML = "$0.00";
    document.getElementById("cart-total").innerHTML = "<strong>$0.00</strong>";
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><a href="#" onclick="removeFromCart(${index}); return false;"><i class="far fa-times-circle"></i></a></td>
      <td><img src="${item.image}" alt=""></td>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><input type="number" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)"></td>
      <td>$${itemTotal.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });

  const formattedSubtotal = `$${subtotal.toFixed(2)}`;
  document.getElementById("cart-subtotal").innerHTML = formattedSubtotal;
  document.getElementById("cart-total").innerHTML = `<strong>${formattedSubtotal}</strong>`;
}

// 5. Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  initAddToCartListeners();
  renderCartPage();
});
