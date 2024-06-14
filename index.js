document.addEventListener("DOMContentLoaded", function() {
    function fetchProducts() {
        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmIxODdjMjM5YzAwMTUyZjRiNGEiLCJpYXQiOjE3MTgzNTI2NjQsImV4cCI6MTcxOTU2MjI2NH0.zfSPnMsez_qRyGwpyoUXFHXNnLnpQfeQ2VE-C7Lty0c" 
            }
        })
        .then(response => response.json())
        .then(products => productsAll(products))
        .catch(error => console.log(error));
    }

    function productsAll(products) {
        const list = document.getElementById("products-list");
        list.innerHTML = "";
        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "col-md-4";
            //!  INIZIO INSERIMENTO CARD ALL'INTERNO DELL'HTML-------------------------------------------------------------------------------------------
            card.innerHTML = `                                                                     
                <div class="card mb-4">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                         <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
                        <p class="card-text"><strong>Price:</strong> ${product.price}€</p>
                        <a href="./dettails.html?productId=${product._id}" class="btn btn-primary">Vedi Dettagli</a>
                        <a href="./backoffice.html?productId=${product._id}" class="btn btn-primary">Modifica</a>
                    </div>
                </div>
            `; 
            //! FINE INSERIMENTO CARD ALL'INTERNO DELL'HTML--------------------------------------------------------------------------------------------------
            list.appendChild(card);  //? INSERIMENTO CARD NELLE LISTE DELL' index.html
        });
        document.getElementById("loading-indicator").style.display = "none";
    }

    function displayErr(message) {
        const list = document.getElementById("productsAll");
        list.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
        document.getElementById("loading-indicator").style.display = "none";
    }

    fetchProducts(); //! RICHIAMO LA FUNZIONE SENNO' NON SI 
});
      