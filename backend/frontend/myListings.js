// ----- My Listings -----
function displayMyListings(){
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const container = document.getElementById("myListings");
  if(!container) return;

  container.innerHTML = "";
  if(products.length === 0){
    container.innerHTML = "<p>No products listed yet.</p>";
    return;
  }

  products.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>₹${p.price}</p>
        <div class="card-actions">
          <button class="edit-btn" onclick="editProduct(${p.id})">Edit</button>
          <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
        </div>
        <button class="submit-btn" onclick="viewProduct(${p.id})">View Details</button>
      </div>
    `;
  });
}

function deleteProduct(id){
  if(confirm("Are you sure you want to delete this product?")){
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    displayMyListings();
  }
}

function editProduct(id){
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find(p => p.id === id);
  if(!product) return;
  localStorage.setItem("editProduct", JSON.stringify(product));
  window.location.href = "addProduct.html";
}

function viewProduct(id){
  localStorage.setItem("viewProductId", id);
  window.location.href = "productDetail.html";
}

// Initial load
document.addEventListener("DOMContentLoaded", ()=>{
  displayMyListings();
});