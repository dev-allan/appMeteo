//Récupération des éléments DOM
let searchInput = document.querySelector("#inputSearch");
let body = document.querySelector("body");

//Ajout de l'attribut value afin d'obtenir la valeur dans l'input
searchInput.setAttribute("value", "");

//JSON permettant de traduire les data obtenu de openWeather
let data = {
    "Clouds" : "Nuageux",
    "Clear" : "Dégagé",
    "Rain" : "Pluie",
    "Snow" : "Neige",
    "Drizzle" : "Bruine",
    "Thunderstorm" : "Orage"
};



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
        const displayR = document.createElement("section");
        displayR.setAttribute("id", "displayMeteo");
        body.appendChild(displayR);
        console.log(value);
        for(let i = 0; i < value.list.length; i++){
            const div = document.createElement("div");
            displayR.appendChild(div);
            div.setAttribute('class', 'card');
            let meteo = value.list[i].weather[0].main
            let icon = value.list[i].weather[0].icon
            div.innerHTML =     `
                                <div class="cardHeader">
                                    <h3>${value.city.name}</h3>
                                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Icone météo">
                                </div>
                                <p>Date : ${value.list[i].dt_txt}</p>
                                <p>Météo : ${data[meteo]}</p>
                                <p>Humidité : ${value.list[i].main.humidity}</p>
                                <p>Température : ${Math.round(value.list[i].main.temp - 273.15)}°</p>`
        }
    })
    .catch(function(error){
        console.log(error);
    })
}

//événement qui écoute le click du bouton afin de rechercher une ville
btnAddTask.addEventListener('click', (event) => {
    event.preventDefault();
    let removeBlockDisplayMeteo = document.querySelector("#displayMeteo");
    removeBlockDisplayMeteo.remove();
    askMeteo(searchInput.value)
    event.stopPropagation();
})