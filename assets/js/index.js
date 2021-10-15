//Récupération des éléments DOM
let header = document.querySelector('header');
let searchInput = document.querySelector("#inputSearch");
let body = document.querySelector("body");

//Ajout de l'attribut value afin d'obtenir la valeur dans l'input
searchInput.setAttribute("value", "");

/**
 * Fonction de formatage de la date
 * @param {*} value 
 * @returns {retourne une date avec la date du jour et l'heure}
 */
const formattedDate = (dateValue) => {
    //Objet permettant d'afficher les jours en français pour le formatage de la date
    let dataDay = {
        "0" : "dimanche",
        "1" : "lundi",
        "2" : "mardi",
        "3" : "mercredi",
        "4" : "jeudi",
        "5" : "vendredi",
        "6" : "samedi"
    }
    let date = new Date(dateValue)
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    
    return dataDay[day] + " à " + hours + 'h' + minutes.substr(-2);
}

/**
 * Block html permettant d'afficher les valeurs des datas obtenues via openWeather
 * @param {*} city 
 * @param {*} icon 
 * @param {*} date 
 * @param {*} meteo 
 * @param {*} humidity 
 * @param {*} temp 
 * @returns 
 */
const blockHtml = (city, icon, date, meteo, humidity, temp) => {
    //JSON permettant de traduire les data obtenu de openWeather
    let dataMeteoTraduction = {
        "Clouds" : "Nuageux",
        "Clear" : "Dégagé",
        "Rain" : "Pluie",
        "Snow" : "Neige",
        "Drizzle" : "Bruine",
        "Thunderstorm" : "Orage"
    };
    
    return `<div class="cardHeader">
            <h3>${city}</h3>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Icone météo">
            </div>
            <p>Date : ${formattedDate(date)}</p>
            <p>Météo : ${dataMeteoTraduction[meteo]}</p>
            <p>Humidité : ${humidity} %</p>
            <p>Température : ${Math.round(temp - 273.15)}°C</p>`
}

/**
 * Fonction qui permet d'obtenir les données météorologiques
 * @param {*} city 
 */
const askMeteo = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7c029f5d78266d4521660999861fe8ad`)
    .then(function(response) {
        console.log(response)
        if(response.ok) {
            return response.json();
        } else if(response.status === 404){
            let error = document.createElement('p');
            error.setAttribute("id", "error");
            header.appendChild(error);
            error.innerHTML=`La ville de ${searchInput.value} n'existe pas`;
        }
    })
    .then(function(value){
        let error = document.createElement('p');
        error.setAttribute("id", "error");
        header.appendChild(error);
        error.innerHTML=``
        const displayR = document.createElement("section");
        displayR.setAttribute("id", "displayMeteo");
        body.appendChild(displayR);
        for(let i = 0; i < value.list.length; i++){
            const div = document.createElement("div");
            displayR.appendChild(div);
            div.setAttribute('class', 'card');
            let city = value.city.name;
            let icon = value.list[i].weather[0].icon;
            let date = value.list[i].dt_txt;
            let meteo = value.list[i].weather[0].main
            let humidity = value.list[i].main.humidity
            let temp = value.list[i].main.temp
            div.innerHTML = blockHtml(city, icon, date, meteo, humidity, temp)
        }
    })
    .catch(function(error){
        console.log(error);
    })
}

//événement qui écoute le click du bouton afin de rechercher une ville
btnSearchMeteo.addEventListener('click', (event) => {
    event.preventDefault();
    let removeBlockDisplayMeteo = document.querySelector("#displayMeteo");
    let removeError = document.querySelector("#error");
    //On supprime le block displayMeteo afin d'effacer les résultats précédents
    removeError.remove();
    removeBlockDisplayMeteo.remove();
    askMeteo(searchInput.value)
    event.stopPropagation();
})