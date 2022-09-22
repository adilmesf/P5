
// Récupération du localstorage
cartSaved = JSON.parse(localStorage.getItem("cart"));

function modifyQuantity(){
    const zoneQuantite = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < zoneQuantite.length; i++){
        zoneQuantite[i].addEventListener("change", (event) => {

        const closest = zoneQuantite[i].closest(".cart__item");
        console.log(zoneQuantite[i].value);

        for (let i = 0; i < cartSaved.length; i++){
            const contenuCart = cartSaved[i];
            if (closest.dataset.id == contenuCart.productId && closest.dataset.color == contenuCart.productColor){
                contenuCart.quantite = parseInt(zoneQuantite[i].value);
                
                // Ajout dans le panier
                addProduct(cartSaved);
            }
        }        

            
            })
    };
}

function deleteProduct(){
    const linkDelete = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < linkDelete.length; i++){
        linkDelete[i].addEventListener("click", (event) => {
        const closest = linkDelete[i].closest(".cart__item");

            /* Recherche de l'index */
            const index = cartSaved.findIndex(indexCart => indexCart.productId === closest.dataset.id && closest.dataset.color == indexCart.productColor);
 
            if (index > -1) {
                cartSaved.splice(index, 1);
                addProduct(cartSaved);
            }
            const sectionProduct = document.getElementById("cart__items");
            sectionProduct.innerHTML = "";
            retournerCart();
            })
    };
}

function addProduct(objJson){
    let objLinea = JSON.stringify(objJson);
    localStorage.setItem("cart",objLinea);
}

async function retournerCart(){

    let nbArticles = 0;
    let totalCart  = 0.0;

    for (let i = 0; i < cartSaved.length; i++) {

        const reponse = await fetch("http://localhost:3000/api/products/" + cartSaved[i].productId);
        const product = await reponse.json();

        const sectionProduct = document.getElementById("cart__items");
        
        const productElement = document.createElement("article");
        productElement.className = "cart__item";
        productElement.dataset.id = cartSaved[i].productId;
        productElement.dataset.color = cartSaved[i].productColor;

            const productImage     = document.createElement("div");
            productImage.className = "cart__item__img";

                const imageProduct     = document.createElement("img");
                imageProduct.src       = product.imageUrl;
                imageProduct.alt       = product.altTxt;

                // On rattache l'image au Parent (DIV)
                productImage.appendChild(imageProduct);

            // On rattache l'image au Parent (DIV)
            productElement.appendChild(productImage);            
            

            // Contenu
            const productContent = document.createElement("div");
            productContent.className = "cart__item__content";

                // Description
                const productDescription = document.createElement("div");
                productDescription.className = "cart__item__content__description";  

                    const productName = document.createElement("h2");
                    productName.innerHTML = product.name;

                    // On rattache le H2 au Parent (DIV)
                    productDescription.appendChild(productName);

                    // Couleur
                    const productColor = document.createElement("p");
                    productColor.innerHTML = cartSaved[i].productColor;

                    // On rattache le P au Parent (DIV)
                    productDescription.appendChild(productColor);

                    // Prix
                    const productPrice = document.createElement("p");
                    productPrice.innerHTML = product.price + "€";

                    // On rattache le H2 au Parent (DIV)
                    productDescription.appendChild(productPrice);
                    
                // On rattache la description au Parent (DIV)
                productContent.appendChild(productDescription);


                // Settings
                const productSettings = document.createElement("div");
                productSettings.className = "cart__item__content__settings";  

                    // Quantité
                    const productQuantity = document.createElement("div");
                    productQuantity.className = "cart__item__content__settings__quantity";  

                        // Quantité
                        const quantityLib = document.createElement("p");
                        quantityLib.innerHTML = "Qté : ";

                        productQuantity.appendChild(quantityLib);

                        const quantityNumber = document.createElement("input");
                        quantityNumber.className = "itemQuantity";
                        quantityNumber.name      = "itemQuantity";
                        quantityNumber.min       = "1";
                        quantityNumber.max       = "100";
                        quantityNumber.value     = cartSaved[i].quantite;

                        // Calculer le nombre d'articles
                        nbArticles += cartSaved[i].quantite;
                        totalCart += (cartSaved[i].quantite * product.price); 

                        productQuantity.appendChild(quantityNumber);

                    productSettings.appendChild(productQuantity);

                    // Quantité
                    const productDelete = document.createElement("div");
                    productDelete.className = "cart__item__content__settings__delete"; 

                        const supprimer = document.createElement("p");
                        supprimer.className = "deleteItem";
                        supprimer.innerHTML = "Supprimer";

                        productDelete.appendChild(supprimer);
                    
                    productSettings.appendChild(productDelete);

                // On rattache les settings au Parent (DIV)
                productContent.appendChild(productSettings);

            productElement.appendChild(productContent);
        
        sectionProduct.appendChild(productElement);

    }

    const articleTotal = document.getElementById("totalQuantity");
    articleTotal.innerHTML = nbArticles;

    const prixTotal = document.getElementById("totalPrice");
    prixTotal.innerHTML = totalCart;
    modifyQuantity();
    deleteProduct();
}

retournerCart();

const prenom    = document.getElementById("firstName");
const nom       = document.getElementById("lastName");
const ville     = document.getElementById("city");
const adresse   = document.getElementById("address");
const mail      = document.getElementById("email");

// email
const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
  const regexMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexMail.test(mail) == false) {
    return false;
  } else {
    emailErrorMsg.innerHTML = null;
    return true;
  }
}

const regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;

// first name
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
  if (regexName.test(prenom) == false || prenom == "") {
    return false;
  } else {
    firstNameErrorMsg.innerHTML = null;
    return true;
  }
}

// last name
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
  if (regexName.test(nom) == false || nom == "") {
    return false;
  } else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
}

// city
const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity(ville) {
  if (regexName.test(ville) == false || ville == "") {
    return false;
  } else {
    cityErrorMsg.innerHTML = null;
    return true;
  }
}

const postUrl = "http://localhost:3000/api/products/order";
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
  e.preventDefault(); 

  let email = validateEmail(mail.value);
  let firstName = validateFirstName(prenom.value);
  let lastName = validateLastName(nom.value);
  let city = validateCity(ville.value);
  

  if (email == false || firstName == false || lastName == false || city == false || adresse.value == "" ) {
    if (email == false ) {
      emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide.";
    }
    if (firstName == false) {
      firstNameErrorMsg.innerHTML = "Entrez un prénom valide sans chiffre.";
    }
    if (lastName == false) {
      lastNameErrorMsg.innerHTML = "Entrez un nom valide sans chiffre.";
    }
    if (city == false) {
      cityErrorMsg.innerHTML = "Entrez une commune valide sans chiffre.";
    }
    if (adresse.value == "") {
        addressErrorMsg.innerHTML = "Entrez une adresse valide.";
      }
    return;
  }

  // Création de l’objet du nouvel avis.
    const contact = {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: mail.value,
    };

    // Création de la charge utile au format JSON
    //const objectContact = JSON.stringify(contact);

    let products = new Array();

    for (let i=0; i < cartSaved.length; i++){
        const contenuCart = cartSaved[i];
        products.push(contenuCart.productId);
    }
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify({contact,products});

    // Appel de la fonction fetch avec toutes les informations nécessaires
    fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    })
    .then((res) => res.json())
    // to check res.ok status in the network
    .then((data) => {
      localStorage.clear();
      let confirmationUrl = "./confirmation.html?id=" + data.orderId;
      window.location.href = confirmationUrl;
    });
})

