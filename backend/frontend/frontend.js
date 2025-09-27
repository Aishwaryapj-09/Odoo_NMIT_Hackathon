// ================== DEFAULT PRODUCTS ==================
const defaultProducts = [
  {id:1, title:"Laptop", price:50000, category:"Electronics", description:"Powerful laptop", img:"laptop.jpg"},
  {id:2, title:"T-shirt", price:500, category:"Clothes", description:"Cool cotton t-shirt", img:"shirt.jpg"},
  {id:3, title:"Sofa", price:15000, category:"Furniture", description:"Comfortable sofa", img:"sofa.jpg"},
  {id:4, title:"Bicycle", price:7000, category:"Fitness", description:"Latest bicycle most comfort", img:"cycle.jpg"},
  {id:5, title:"The Alchemist", price:200, category:"Books", description:"Read,get inspired and captivated", img:"book.jpg"},
  {id:6, title:"Comfy Slippers", price:400, category:"Footwears", description:"Ultra soft slippers with cushion footbed", img:"slips.jpg"},
  {id:7, title:"Skincare-cosmetics", price:1200, category:"Health and Personal care", description:"Cleanse and enchance appearance", img:"skincare.jpg"},
  {id:8, title:"Calculator", price:1350, category:"Office-Equipments", description:"High speed calculator with 3 years warranty", img:"calci.jpg"},
  {id:9, title:"Headphones", price:1200, category:"Electronics", description:"Noise cancelling headphones", img:"headphones.jpg"}
];

// ================== LOCAL STORAGE HELPERS ==================
function loadUserProducts() {
  const saved = localStorage.getItem("userProducts");
  return saved ? JSON.parse(saved) : [];
}

function saveUserProducts(list) {
  localStorage.setItem("userProducts", JSON.stringify(list));
}

function loadCart() {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ================== GLOBALS ==================
let userProducts = loadUserProducts();
let cart = loadCart();

// ================== DISPLAY PRODUCTS ==================
function displayProducts() {
  const container = document.getElementById("productList");
  if(!container) return;
  container.innerHTML = "";

  // Merge default + user-added
  const allProducts = [...defaultProducts, ...userProducts];

  allProducts.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="/${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>₹${p.price}</p>
      <p>${p.category}</p>
      <button onclick="viewProduct(${p.id})">View</button>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// ================== VIEW PRODUCT ==================
function viewProduct(id) {
  localStorage.setItem("viewProductId", id);
  window.location.href = "productDetail.html";
}

// ================== CART ==================
function addToCart(id) {
  const allProducts = [...defaultProducts, ...userProducts];
  const product = allProducts.find(p => p.id === id);
  if(product) {
    cart.push(product);
    saveCart(cart);
    updateCartCount();
    alert(`${product.title} added to cart!`);
  }
}

function updateCartCount() {
  const el = document.getElementById("cartCount");
  if(el) el.textContent = cart.length;
}

// ================== SEARCH ==================
function setupSearch() {
  const searchBar = document.getElementById("searchBar");
  if(!searchBar) return;

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    const allProducts = [...defaultProducts, ...userProducts];
    const filtered = allProducts.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
    displayCustom(filtered);
  });
}

function displayCustom(list) {
  const container = document.getElementById("productList");
  if(!container) return;
  container.innerHTML = "";
  if(list.length === 0) { container.innerHTML = "<p>No products found.</p>"; return; }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="/${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>₹${p.price}</p>
      <p>${p.category}</p>
      <button onclick="viewProduct(${p.id})">View</button>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// ================== FILTER & SORT ==================
function filterCategory(cat) {
  const allProducts = [...defaultProducts, ...userProducts];
  const filtered = cat === "All" ? allProducts : allProducts.filter(p => p.category === cat);
  displayCustom(filtered);
}

function applyFilter() {
  const category = document.getElementById("filterCategory").value;
  const maxPrice = document.getElementById("filterPrice").value;
  const allProducts = [...defaultProducts, ...userProducts];

  const filtered = allProducts.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const matchPrice = !maxPrice || p.price <= parseFloat(maxPrice);
    return matchCat && matchPrice;
  });

  displayCustom(filtered);
}

function sortProducts(type) {
  const allProducts = [...defaultProducts, ...userProducts];
  let sorted = [...allProducts];

  if(type==="asc") sorted.sort((a,b)=>a.price-b.price);
  if(type==="desc") sorted.sort((a,b)=>b.price-a.price);
  if(type==="recent") sorted.sort((a,b)=>b.id-b.id);

  displayCustom(sorted);
}

// ================== GROUP BY ==================
function groupBy(type) {
  if(type !== "category") { displayProducts(); return; }

  const allProducts = [...defaultProducts, ...userProducts];
  const grouped = {};
  allProducts.forEach(p => {
    if(!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  const container = document.getElementById("productList");
  container.innerHTML = "";
  for(const cat in grouped) {
    const h2 = document.createElement("h2");
    h2.textContent = cat;
    container.appendChild(h2);

    grouped[cat].forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="/${p.img}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>₹${p.price}</p>
        <p>${p.category}</p>
        <button onclick="viewProduct(${p.id})">View</button>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      `;
      container.appendChild(card);
    });
  }
}




// ================== MENU & NAVIGATION ==================
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.classList.toggle("active");
}

function goToCart() { window.location.href = "cart.html"; }
function goToProfile() { window.location.href = "profile.html"; }
function addProduct() { window.location.href = "addProduct.html"; }

// ================== INIT ==================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayProducts();
  setupSearch();
});