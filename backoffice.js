document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("product-form");
    const deleteButton = document.getElementById("delete-button");
    const resetButton = document.getElementById("reset-button");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("productId");
    const create = id === null;

    if (create) {                                                       //!Inizio crezione pulsanti Delete e Reset (che sono collegati)
        deleteButton.style.display = "none";                 
    } else {
        document.getElementById("form-title").textContent = "Edit Products";
        fetchProduct(id);
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const product = {
            name: form.name.value,
            description: form.description.value,
            brand: form.brand.value,
            price: form.price.value,
            imageUrl: form.imageUrl.value
        }
        if (create) {
            createProduct(product);
        } else {
            updateProduct(id, product);
        }
    });

    resetButton.addEventListener("click", function(event) {
        if (confirm("Sei sicuro di voler resettare?")) {
            event.preventDefault();
        }
    });

    deleteButton.addEventListener("click", function() {
        if (confirm("Confermi di voler eliminare il prodotto?")) {
            deleteProduct(id);
        }
    });

    function fetchProduct(id) {                                                                 
        fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {                 //! Esempio da seguire  URL:  https://striveschool-api.herokuapp.com/api/agenda/:id_dinamico
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmIxODdjMjM5YzAwMTUyZjRiNGEiLCJpYXQiOjE3MTgzNTI2NjQsImV4cCI6MTcxOTU2MjI2NH0.zfSPnMsez_qRyGwpyoUXFHXNnLnpQfeQ2VE-C7Lty0c"
            }
        })
        .then(response => response.json())                  //!response è l'oggetto che rappresenta la risposta da parte del server 
        .then(product => {
            form.name.value = product.name;
            form.description.value = product.description;
            form.brand.value = product.brand;
            form.price.value = product.price;
            form.imageUrl.value = product.imageUrl;
            deleteButton.style.display = "block";
        })
        .catch(error => {                           //?Metodo che ti fa capire se abbiamo errori 
            console.log(error);
        });
    }

    function createProduct(product) {
        fetch("https://striveschool-api.herokuapp.com/api/product/", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmIxODdjMjM5YzAwMTUyZjRiNGEiLCJpYXQiOjE3MTgzNTI2NjQsImV4cCI6MTcxOTU2MjI2NH0.zfSPnMsez_qRyGwpyoUXFHXNnLnpQfeQ2VE-C7Lty0c"
            },
            body: JSON.stringify(product)
        })
        .then(response => {                             //? E' una risposta alla 'richiesta' (del fetch sopprastante) è true (ovvero se abbiamo il response.ok) 
            if (response.ok) {
                window.location.href = "/";             //? reindirizza l'utente alla home page
            } else {
                throw new Error("Failed to create product"); 
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function updateProduct(id, product) {
        fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmIxODdjMjM5YzAwMTUyZjRiNGEiLCJpYXQiOjE3MTgzNTI2NjQsImV4cCI6MTcxOTU2MjI2NH0.zfSPnMsez_qRyGwpyoUXFHXNnLnpQfeQ2VE-C7Lty0c"
            },
            body: JSON.stringify(product)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/";
            } else {
                throw new Error("ERORRE");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function deleteProduct(id) {
        console.log(id);
        fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmIxODdjMjM5YzAwMTUyZjRiNGEiLCJpYXQiOjE3MTgzNTI2NjQsImV4cCI6MTcxOTU2MjI2NH0.zfSPnMsez_qRyGwpyoUXFHXNnLnpQfeQ2VE-C7Lty0c"
            }
        })
        .then(response => {
            console.log(response.status);
            if (response.ok) {
                window.location.href = "/";
            } else {
                throw new Error("ERRORE");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
});
