
function recherche_parametre(vParam){
    var str = window.location.href;
    var url = new URL(str);
    var search_params = new URLSearchParams(url.search); 
    if(search_params.has(vParam)) {
        var name = search_params.get(vParam);
        return (name);
    }
}

function afficherInfo(){
    let idCommande = recherche_parametre("id");
    let objCde = document.getElementById("orderId");
    objCde.innerHTML = idCommande;
}

afficherInfo();