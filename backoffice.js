document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("product-form");
    const deleteButton = document.getElementById("delete-button");
    const resetButton = document.getElementById("reset-button");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("productId");
    const create = id !== null;

    if (create) {
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
        };
        if (create) {
            updateProduct(id, product);
        } else {
            createProduct(product);
        }
    });

    resetButton.addEventListener("click", function(event) {
        if (!confirm("Sei sicuro di voler resettare il form?")) {
            event.preventDefault();
        }
    });

    deleteButton.addEventListener("click", function() {
        if (confirm("Confermi di voler eliminare il prodotto?")) {
            deleteProduct(id);
        }
    });
                                                                                

    function fetchProduct(id) {
        fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmIxODdjMjM5YzAwMTUyZjRiNGEiLCJpYXQiOjE3MTgzNTI2NjQsImV4cCI6MTcxOTU2MjI2NH0.zfSPnMsez_qRyGwpyoUXFHXNnLnpQfeQ2VE-C7Lty0c"
            }
        })
        .then(response => response.json())                                          //!--------------RICAVO I VALORI (DATI) DAL FORM------------------------
        .then(product => {
            form.name.value = product.name;
            form.description.value = product.description;
            form.brand.value = product.brand;
            form.price.value = product.price;
            form.imageUrl.value = product.imageUrl;
            deleteButton.style.display = "block";
        })
        .catch(error => {
            console.log(error);
        });
    }
                                                                                            //!--------------INIZIO CREAZIONE-----------------------------------
    function createProduct(product) {
        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmIxODdjMjM5YzAwMTUyZjRiNGEiLCJpYXQiOjE3MTgzNTI2NjQsImV4cCI6MTcxOTU2MjI2NH0.zfSPnMsez_qRyGwpyoUXFHXNnLnpQfeQ2VE-C7Lty0c"            },
            body: JSON.stringify(product)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/";
            }
            throw new Error("response");
        })
        .catch(error => {
            console.log(error);
        });
    }

    function updateProduct(id, product) {                                                   //!--------------INIZIO MODIFICHE CREAZIONE -----------------------------------
        fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
               "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmIxODdjMjM5YzAwMTUyZjRiNGEiLCJpYXQiOjE3MTgzNTI2NjQsImV4cCI6MTcxOTU2MjI2NH0.zfSPnMsez_qRyGwpyoUXFHXNnLnpQfeQ2VE-C7Lty0c"},
            body: JSON.stringify(product)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/";
            }
            throw new Error(" response");
        })
        .catch(error => {
            console.log(error);
        });
    }
                                                                                                //!--------------INIZIO ELIMINAZIONE-----------------------------------
    function deleteProduct(id) {
        fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmIxODdjMjM5YzAwMTUyZjRiNGEiLCJpYXQiOjE3MTgzNTI2NjQsImV4cCI6MTcxOTU2MjI2NH0.zfSPnMsez_qRyGwpyoUXFHXNnLnpQfeQ2VE-C7Lty0c"        }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/";
            }
            throw new Error("Response");
        })
        .catch(error => {
            console.log(error);
        });
    }
});