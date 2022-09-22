
async function recherche_product(){

    let valeurRecherche = recherche_parametre("id");
    const reponse = await fetch("http://localhost:3000/api/products/" + valeurRecherche);
    const product = await reponse.json();

        // Images
        const sectionProduct = document.querySelector(".item__img");

        // On crée l’élément img.
        const imageProduct = document.createElement("img");

        // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
        imageProduct.src = product.imageUrl;
        imageProduct.alt = product.altTxr;
           
        // On rattache l’image à productImage (la balise div)
        sectionProduct.appendChild(imageProduct);   

        // Nom
        const nameProduct = document.getElementById("title");
        nameProduct.innerText = product.name;

        // Prix 
        const priceProduct = document.getElementById("price");
        priceProduct.innerHTML = JSON.stringify(product.price);  

        // Description
        const descProduct = document.getElementById("description");
        descProduct.innerText = product.description;

        // Options
        const optProduct = document.getElementById("colors");
        
        for (let j = 0; j < product.colors.length; j++) {
            const opt = document.createElement("option");
            opt.value = product.colors[j];
            opt.text  = product.colors[j];
            optProduct.add(opt);
        }

}

function recherche_parametre(vParam){
    var str = window.location.href;
    var url = new URL(str);
    var search_params = new URLSearchParams(url.search); 
    if(search_params.has(vParam)) {
        var name = search_params.get(vParam);
        return (name);
    }
}

recherche_product();

function addProduct(objJson){
    let objLinea = JSON.stringify(objJson);
    localStorage.setItem("cart",objLinea);
}


const buttonAjouter = document.getElementById("addToCart");
buttonAjouter.addEventListener("click", function () {

    // Panier et données qui vont être sauvé 
    var cartSave    = [];
    let vId         = recherche_parametre("id");
    let vColor      = document.getElementById("colors").value;
    let vQuantite   = document.getElementById("quantity").value;
    let vTrouve     = false;

    // Récupération du localstorage
    cartLs = JSON.parse(localStorage.getItem("cart"));

    // Si le panier existe, on regarde si l'article existe dans la même couleur
    if (cartLs != null) {
        cartSave = Object.values(cartLs);
        for (let i = 0; i < cartSave.length; i++){
            const contenuCart = cartSave[i];
            if (vId == contenuCart.productId && vColor == contenuCart.productColor){
                var a = parseInt(vQuantite);
                var b = parseInt(contenuCart.quantite);
                var c = a + b; 
                contenuCart.quantite = c;
                vTrouve = true;
            }
        }

    } 
    
    if (vTrouve == false){ 
        // Création de l’objet du nouvel avis.
        const cart = {
            quantite:     parseInt(vQuantite),
            productId:    vId,
            productColor: vColor,
        };
        cartSave.push(cart);
    }

    // Ajout dans le panier
    addProduct(cartSave);

});




