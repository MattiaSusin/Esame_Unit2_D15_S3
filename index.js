document.addEventListener("DOMContentLoaded", function() {                  //!Ogni volta bisogna sistematicamente usare 'document.' per richiamare qualcosa del docuemnto per farlo funzionare su js   
    function fetchProducts() {
        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmIxODdjMjM5YzAwMTUyZjRiNGEiLCJpYXQiOjE3MTgzNTI2NjQsImV4cCI6MTcxOTU2MjI2NH0.zfSPnMsez_qRyGwpyoUXFHXNnLnpQfeQ2VE-C7Lty0c" 
            }
        })
        .then(response => response.json())          //!response è l'oggetto che rappresenta la risposta da parte del server 
        .then(products => productsAll(products))
        .catch(error => console.log(error));
    }

    function productsAll(products) {
        const list = document.getElementById("products-list"); //! ci prende l'id product list dalla pagina html  
        list.innerHTML = "";
        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "col-md-4";

                                                                                                //! STRUTTURA PER ESEGUIRE IL FORM  (INIZIO FORM)//
            card.innerHTML = `                
                <div class="card mb-4">                                                         
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}"> 
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
                        <p class="card-text"><strong>Price:</strong> ${product.price}€</p>
                        <a href="./dettails.html?productId=${product._id}" class="btn btn-outline-primary">See details</a>
                        <a href="./backoffice.html?productId=${product._id}" class="btn btn-outline-primary">Change</a>
                    </div>
                </div>                                                                        
            `;                                                                                     //! STRUTTURA PER ESEGUIRE IL FORM  (INIZIO FORM)
            list.appendChild(card);         //! appendiamo (mettiamo qua) le card generate successivamente in backoffice 
        });
        document.getElementById("caricamento").style.display = "none"; //! quà sarà visualizzato il contatore 'loading...' se non ci saranno card presenti 
    }

    function displayErr(message) {
        const list = document.getElementById("productsAll");
        list.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
        document.getElementById("caricamento").style.display = "none";
    }

    fetchProducts();
});
