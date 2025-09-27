let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display cart items
function displayCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  if(cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("totalPrice").textContent = "0";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p><strong>${item.title}</strong> (${item.category}) - ₹${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    container.appendChild(div);
  });

  document.getElementById("totalPrice").textContent = total;
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Checkout (simple example)
function checkout() {
  if(cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert(`Order placed! Total: ₹${cart.reduce((sum, item)=>sum+item.price,0)}`);
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Menu toggle
function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("active");
}

// Initialize
document.addEventListener("DOMContentLoaded", displayCart);
