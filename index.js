document.addEventListener("DOMContentLoaded", function() {
    function fetchProducts() {
        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmIxODdjMjM5YzAwMTUyZjRiNGEiLCJpYXQiOjE3MTgzNTI2NjQsImV4cCI6MTcxOTU2MjI2NH0.zfSPnMsez_qRyGwpyoUXFHXNnLnpQfeQ2VE-C7Lty0c" 
            }
        })
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => {
            console.error("Fetch error: ", error);
            displayError("Si è verificato un errore durante il caricamento dei prodotti.");
        });
    }

    function displayProducts(products) {
        const list = document.getElementById("products-list");
        list.innerHTML = "";
        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "col-md-4";
            card.innerHTML = `
                <div class="card mb-4">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-name">${product.name}</h5>
                        <p class="card-description">${product.description}</p>
                        <p class="card-band"><strong>Brand:</strong> ${product.brand}</p>
                        <p class="card-price"><strong>Price:</strong> ${product.price}€</p>
                        <a href="./dettails.html?productId=${product._id}" class="btn btn-primary">Dettagli Prodotto</a>
                        <a href="./backoffice.html?productId=${product._id}" class="btn btn-secondary">Modifica</a>
                    </div>
                </div>
            `;
            list.appendChild(card);
        });
        document.getElementById("loading-indicator").style.display = "none";
    }

    function displayErr(message) {
        const list = document.getElementById("products-list");
        list.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
        document.getElementById("loading-indicator").style.display = "none";
    }

    fetchProducts();
});
      