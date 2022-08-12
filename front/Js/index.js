/**
 * fonction displayKanap
 * 
 * Créer un objet Dom pour un kanap et l'intègre dans la balise section d'id items
 * 
 * @param {string} id id du kanap
 * @param {string} imgUrl url de l'image du kanap
 * @param {string} imgDescr description de l'image du kanap
 * @param {string} kanapName nom du kanap
 * @param {string} kanapDescr description du kanap
 */
function displayKanap(id, imgUrl, imgDescr, kanapName, kanapDescr) {
  let kanapAnchor = document.createElement('a');
  kanapAnchor.setAttribute('href', './product.html?id=' + id); //spec

  let kanap = document.createElement('article');
  kanap.setAttribute('id', id); //spec
  kanapAnchor.appendChild(kanap);

  let kanapImg = document.createElement('img');
  kanap.appendChild(kanapImg);
  kanapImg.setAttribute('src', imgUrl); //spec
  kanapImg.setAttribute('alt', imgDescr); //spec

  let kanapProductName = document.createElement('h3');
  kanap.appendChild(kanapProductName);
  kanapProductName.classList.add('productName');
  kanapProductName.innerHTML = kanapName; //spec

  let kanapDescription = document.createElement('p');
  kanap.appendChild(kanapDescription);
  kanapDescription.classList.add('productDescription');
  kanapDescription.innerHTML = kanapDescr; //spec

  let section = document.getElementById('items');
  section.appendChild(kanapAnchor);
}


/**
 * Fonction getKanapsList
 * 
 * Récupère la liste des kanap depuis l'api et les affiche dans Dom
 */
function getKanapsList() {
  // Intérogation de l'api pour récupérer l'ensemble des kanap au format json
  fetch('http://localhost:3000/api/products')
    .then((rawData) => rawData.json()) //données brutes envoyées par le serveur (en réponse au fetch)
    .then((jsonDataKanapList) => {
      //traitement des données au format json
      console.log(jsonDataKanapList);
      // Pour chaque élément "kanap"
      for (let i = 0; i < jsonDataKanapList.length; i++) {
        // L'élément kanap au format json
        let kanapData = jsonDataKanapList[i];
        // Récupération des différents informations du kanap
        let kanapId = kanapData._id;
        let kanapimgUrl= kanapData.imageUrl;
        let kanapAltTxt = kanapData.altTxt;
        let kanapName = kanapData.name;
        let kanapDescription = kanapData.description;
        // Affichage dans le Dom du kanap
        displayKanap(
          kanapId,
          kanapimgUrl,
          kanapAltTxt,
          kanapName,
          kanapDescription
        );
      }
    });
}

getKanapsList();
