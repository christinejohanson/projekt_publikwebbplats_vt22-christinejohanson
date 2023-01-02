"use strict"
//Christine Johanson chjo2104  Miun Webbutveckling III - Projektuppgift 2022
//sökvägen till webbtjänst för att göra tillgänglig från alla metoder
let url = "https://studenter.miun.se/~chjo2104/writeable/projekt_webservice_vt22-christinejohanson/menuapi.php";
//LOCAL HOST
//let url = "http://localhost/projekt_webservice_vt22-christinejohanson/menuapi.php";


/*kör funktion när sidan blivit laddad */
window.onload = init;
//funktionen som körs
function init() {
    //läsa in menu
    getMenu();
}

//läsa in menu från webbtjänst
function getMenu() {
    fetch(url)
        //kolla så ok svar 200 från restwebbtjänst
        .then(response => {
            if (response.status != 200) {
                //om det inte är 200 så stannar det här. kod fortsätter ej köras
                return
            }
            //200 i respons
            return response.json()
                //skapa funktion för att skriva ut på skärm
                .then(data => writeMenu(data))
                .catch(err => console.log(err))
        })
}

//skriva ut menu
function writeMenu(menus) {
    //vart menu ska skrivas ut
    const trEl = document.getElementById("courseList2");
    const trEl3 = document.getElementById("courseList3");
    const trEl4 = document.getElementById("courseList4");
    /* tar bort innerhtml rensning. behöver nog ej 
    trEl.innerHTML = ""; */
    //kolla om det finns ett element där meny ska skrivas ut
    if(trEl){
    //vilken array som ska loopas igenom(menus) o vad elementet ska heta
    menus.forEach(menu => {
        //if-sats för att skriva ut huvudrätter
        if (`${menu.category}` === "Huvudrätt") {
            trEl.innerHTML += `<td class="courses">${menu.name} </td><td>${menu.description} </td><td>${menu.price} </td>`
            //läs in alla
            let tdEl = document.getElementsByClassName("courses");
        }
        //if-sats för efterrätt
        if (`${menu.category}` === "Efterrätt") {
            trEl3.innerHTML += `<td class="courses">${menu.name} </td><td>${menu.description} </td><td>${menu.price} </td>`
            //läs in alla
            let tdEl = document.getElementsByClassName("courses");
        }
        //if-sats för dryck
        if (`${menu.category}` === "Dryck") {
            trEl4.innerHTML += `<td class="courses">${menu.name} </td><td>${menu.description} </td><td>${menu.price} </td>`
            //läs in alla
            let tdEl = document.getElementsByClassName("courses");
        }

    })
}
}

/*function for showing smaller menu */
function theFunction() {
    var x = document.getElementById("small_nav");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

