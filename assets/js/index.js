//Récupération des éléments DOM
let searchInput = document.querySelector("#inputSearch");
let displayResult = document.querySelector("#displayMeteo");

//Ajout de l'attribut value afin d'obtenir la valeur dans l'input
searchInput.setAttribute("value", "");

/**
 * Fonction qui permet d'obtenir les données météorologiques
*/
const askMeteo = (city) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c029f5d78266d4521660999861fe8ad`)
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
    })
    .then(function(value){
        console.log(value);
    })
    .catch(function(error){
        console.log(error);
    })
}

//événement qui écoute le click du bouton afin de rechercher une ville
btnAddTask.addEventListener('click', (event) => {
    event.preventDefault();
    askMeteo(searchInput.value)
    event.stopPropagation();
})