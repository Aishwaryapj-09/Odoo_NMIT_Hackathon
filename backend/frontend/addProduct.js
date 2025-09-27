// Logic for handling the Add/Edit Product form
document.addEventListener("DOMContentLoaded", ()=>{
  const form = document.getElementById("productForm");
  if(form){
    const editData = localStorage.getItem("editProduct");
    if(editData){
      // Edit an existing product
      const product = JSON.parse(editData);
      document.getElementById("title").value = product.title;
      document.getElementById("category").value = product.category;
      document.getElementById("description").value = product.description;
      document.getElementById("price").value = product.price;

      form.onsubmit = (e)=>{
        e.preventDefault();
        
        let products = JSON.parse(localStorage.getItem("products")) || [];
        product.title = document.getElementById("title").value;
        product.category = document.getElementById("category").value;
        product.description = document.getElementById("description").value;
        product.price = parseFloat(document.getElementById("price").value);

        products = products.map(p => p.id === product.id ? product : p);
        localStorage.setItem("products", JSON.stringify(products));
        localStorage.removeItem("editProduct");
        alert("Product updated!");
        window.location.href = "myListings.html";
      };
    } else {
      // Add a new product
      form.onsubmit = (e)=>{
        e.preventDefault();
        
        let products = JSON.parse(localStorage.getItem("products")) || [];
        const newProduct = {
          id: Date.now(),
          title: document.getElementById("title").value,
          category: document.getElementById("category").value,
          description: document.getElementById("description").value,
          price: parseFloat(document.getElementById("price").value),
          img: "https://via.placeholder.com/200",
          addedAt: Date.now()
        };
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        alert("Product added!");
        window.location.href = "myListings.html";
      };
    }
  }
});