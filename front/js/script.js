async function ajoutProducts() {
    const reponse = await fetch("http://localhost:3000/api/products/");
    const product = await reponse.json();

    for (let i = 0; i < product.length; i++) {
        const sectionProduct = document.querySelector(".items");
        const productElement = document.createElement("a");
        productElement.href = "./product.html?id=" + product[i]._id;


            const productThumb = document.createElement("article");

                // On crée l’élément img.
                const imageProduct = document.createElement("img");

                // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
                imageProduct.src = product[i].imageUrl;
                imageProduct.alt = product[i].altTxt;
            
                // On rattache l’image à productImage (la balise div)
                productThumb.appendChild(imageProduct);

                // On créé la div contenu
                const productName = document.createElement("h3");
                productName.className = "productName";
                productName.innerHTML = product[i].name;

                // On rattache l’image à productImage (la balise div)
                productThumb.appendChild(productName);

                // On créé la div contenu
                const productDesc = document.createElement("p");
                productDesc.className = "productDescription";
                productDesc.innerHTML = product[i].description;

                // On rattache l’image à productImage (la balise div)
                productThumb.appendChild(productDesc);

            // ---------------------- FIN ------------------------
            // On rattache la div content à la balise article
            productElement.appendChild(productThumb);
        // On rattache la balise article à la balise div principale
        sectionProduct.appendChild(productElement);
    }
}

ajoutProducts();


