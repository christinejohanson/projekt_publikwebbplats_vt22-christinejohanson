"use strict"

//Christine Johanson chjo2104  Miun Webbutveckling III - Projektuppgift 2022
//sökvägen till webbtjänst för att göra tillgänglig från alla metoder
let url2 = "https://studenter.miun.se/~chjo2104/writeable/projekt_webservice_vt22-christinejohanson/bookingapi.php";
// LOCAL HOST
//let url2 = "http://localhost/projekt_webservice_vt22-christinejohanson/bookingapi.php";


//variabler på alla för bokning
const bookingnameInput = document.getElementById("bookingname");
const emailInput = document.getElementById("email");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const personsInput = document.getElementById("persons");
const submitBtn = document.getElementById("submit");

//TESTAR HÄR - felmeddelandet
//var messageEl = document.getElementById("message");

//FUNKAR EJ! händelsehanterare
/*kontrollera inputfältet
bookingnameInput.addEventListener("keyup", checkInput);
emailInput.addEventListener("keyup", checkInput);
dateInput.addEventListener("keyup", checkInput);
personsInput.addEventListener("keyup", checkInput);*/

/*if sats o eventlistener på knappen skapa bokning */
if (submitBtn) {
    submitBtn.addEventListener("click", createBooking);
}

/*kör funktion när sidan blivit laddad */
window.onload = init;
//funktionen som körs
function init() {
    //läsa in bokning
    getBooking();
}

/* TESTA ATT KONTROLLERA INPUT-FÄLT. 
FUNKAR EJ!!
function checkInput() {
    console.log("kontrollerar inputten");
    //kollar längden på inmatning
    let input = bookingnameInput.value;
    let emailinput = emailInput.value;
    let dateinput = dateInput.value;
    let personsinput = personsInput.value; 

    /*if (input == "" && emailinput == "" && personsinput == "") {
        messageEl.innerHTML = "Du måste fylla i alla fält!"
    } else if (input == "" ){
        messageEl.innerHTML = "Du måste fylla i namn"
    } else if (emailinput == "" ) {
        messageEl.innerHTML = " Du måste fylla i epost"
    } else if (personsinput == "") {
        messageEl.innerHTML = "Du måste fylla i personer"
    }
        messageEl.innerHTML = "Det där gick ju bra!"
    }*/
/* TEST AV INPUT. FUNKAR EJ! 
if (input.length > 3) {
    messageEl.innerHTML = "";

    if (emailinput.length > 4) {
        messageEl.innerHTML = "";
        if (personsinput.value > 0 && personsinput.value < 10) {
            messageEl.innerHTML = "";
        } else {
            messageEl.innerHTML = "Man kan boka via webben för max 9 personer."
        }
    } else {
        messageEl.innerHTML = "Du måste fylla i epostadress."
    }
} else {
    messageEl.innerHTML = "Du måste fylla i namn ju. "
}
}*/

/*functions för bokning osv */
//läsa in bokningar från webbtjänst
function getBooking() {
    fetch(url2)
        //kolla så ok svar 200 från restwebbtjänst
        .then(response => {
            if (response.status != 200) {
                //om det inte är 200 så stannar det här. kod fortsätter ej köras
                return
            }
            //200 i respons
            return response.json()
                //skapa funktion för att skriva ut på skärm
                //.then(data => writeBookings(data))
                .catch(err => console.log(err))
        })
}

//skriva ut bokningar med lista.
/*ANVÄNDS EJ
function writeBookings(bookings) {
    //vart den ska skrivas ut
    const ulEl = document.getElementById("bookingList");
    ulEl.innerHTML = "";
    //vilken array som ska loopas igenom(bookings) o vad elementet ska heta
    bookings.forEach(booking => {
        ulEl.innerHTML += `<li class="bookings" id="${booking.id}">${booking.name} ${booking.email} ${booking.date} ${booking.time} ${booking.persons}</li>`
    });
    //läs in alla
    let liEl = document.getElementsByClassName("bookings");
    //loopa igenom alla med for-loop
    for (let i = 0; i < liEl.length; i++) {
        liEl[i].addEventListener("click", deleteBooking);
    }
} */

//radera en bokning ANVÄNDS EJ!
/*function deleteBooking(event) {
    //lagra i en variabel
    let id = event.target.id;
    //fetch anrop till webbtjänst med get parameter.
    fetch(url2 + "?id=" + id, {
        //måste skicka med metoden delete istälelt för get som är default
        "method": "DELETE"
    })
        .then(response => response.json())
        //anropa kurserna på nytt för att få listan uppdaterad. 
        .then(data => getBooking())
        .catch(err => console.log(err))
}*/

//lägga till en bokning
function createBooking(event) {
    //hindra standardbeteende o sidan laddas om
    event.preventDefault();

    //lagrar i nya variabler
    let name = bookingnameInput.value;
    let email = emailInput.value;
    let date = dateInput.value;
    let time = timeInput.value;
    let persons = personsInput.value;
    //nytt js objekt som vi kan konvertera till json
    let jsonStr = JSON.stringify({
        name: name,
        email: email,
        date: date,
        time: time,
        persons: persons
    });

    //fetchanrop med inställningar
    fetch(url2, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: jsonStr
    })
        //svaret från webbtjänst o gör till js objekt
        .then(response => response.json())
        //.then(data => eraseForm())  
        .then(data => eraseForm())    
        .catch(err => console.log(err))
        
    }

    /*skriva ut felmeddelande FUNKAR EJ!*/
    /*function writeMessage(data) {
        //kollar så det funkar i consolelog
        console.log(data)
        //vart den ska skrivas ut    
        var messageEl = document.getElementById("message");
        
        let fix = JSONstringify(data);
        messageEl.innerHTML = `${data["message"]}`;
    eraseForm();
       // messageEl.innerHTML = (fixet);
    } */

    //radera formuläret
    function eraseForm() {
        bookingnameInput.value = "";
        emailInput.value = "";
        dateInput.value = "";
        timeInput.value = "";
        personsInput.value = "";
        //anropa för att ladda igen
        getBooking()
    }
