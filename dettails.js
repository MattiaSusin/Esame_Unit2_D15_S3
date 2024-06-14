document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("productId");

    if (!id) return;

    fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmIxODdjMjM5YzAwMTUyZjRiNGEiLCJpYXQiOjE3MTgzNTI2NjQsImV4cCI6MTcxOTU2MjI2NH0.zfSPnMsez_qRyGwpyoUXFHXNnLnpQfeQ2VE-C7Lty0c"
        }
    })
    .then(response => response.json())
    .then(product => displayProduct(product))
    .catch(error => {
        console.error("Fetch error: ", error);
        displayError("Si è verificato un errore durante il caricamento dei dettagli del prodotto.");
    });

    function displayProduct(product) {
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-brand").textContent = "Brand: " + product.brand;
        document.getElementById("product-price").textContent = "Price: €" + product.price;
        document.getElementById("product-image").src = product.imageUrl;
    }

    function displayError(message) {
        const container = document.querySelector(".container");
        container.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    }
});
