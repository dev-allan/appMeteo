//Récupération des éléments DOM
let searchInput = document.querySelector("#inputSearch");
let displayResult = document.querySelector("#displayMeteo");

//Ajout de l'attribut value afin d'obtenir la valeur dans l'input
searchInput.setAttribute("value", "");

let arrayData = [];

/**
 * Fonction qui permet d'obtenir les données météorologiques
*/
const askMeteo = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7c029f5d78266d4521660999861fe8ad`)
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
    })
    .then(function(value){
        for(let i = 0; i < value.list.length; i++){
            const div = document.createElement("div");
            displayResult.appendChild(div);
            div.setAttribute('id', 'card')
            div.innerHTML = `<p>humidité = ${value.list[i].main.humidity}</p>`
        }
    })
    .catch(function(error){
        console.log(error);
    })
}

console.log(arrayData);

//événement qui écoute le click du bouton afin de rechercher une ville
btnAddTask.addEventListener('click', (event) => {
    if(document.getElementById('card') !== null){
        document.getElementById('card').remove()
    }
    event.preventDefault();
    askMeteo(searchInput.value)
    event.stopPropagation();
})