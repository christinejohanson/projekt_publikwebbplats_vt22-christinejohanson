"use strict";var url2="https://studenter.miun.se/~chjo2104/writeable/projekt_webservice_vt22-christinejohanson/bookingapi.php",bookingnameInput=document.getElementById("bookingname"),emailInput=document.getElementById("email"),dateInput=document.getElementById("date"),timeInput=document.getElementById("time"),personsInput=document.getElementById("persons"),submitBtn=document.getElementById("submit");function init(){getBooking()}function getBooking(){fetch(url2).then((function(t){if(200==t.status)return t.json().catch((function(t){return console.log(t)}))}))}function createBooking(t){t.preventDefault();var e=bookingnameInput.value,n=emailInput.value,o=dateInput.value,c=timeInput.value,u=personsInput.value,i=JSON.stringify({name:e,email:n,date:o,time:c,persons:u});fetch(url2,{method:"POST",headers:{"content-type":"application/json"},body:i}).then((function(t){return t.json()})).then((function(t){return eraseForm()})).catch((function(t){return console.log(t)}))}function eraseForm(){bookingnameInput.value="",emailInput.value="",dateInput.value="",timeInput.value="",personsInput.value="",getBooking()}submitBtn&&submitBtn.addEventListener("click",createBooking),window.onload=init;var url="https://studenter.miun.se/~chjo2104/writeable/projekt_webservice_vt22-christinejohanson/menuapi.php";function init(){getMenu()}function getMenu(){fetch(url).then((function(t){if(200==t.status)return t.json().then((function(t){return writeMenu(t)})).catch((function(t){return console.log(t)}))}))}function writeMenu(t){var e=document.getElementById("courseList2"),n=document.getElementById("courseList3"),o=document.getElementById("courseList4");e&&t.forEach((function(t){if("Huvudrätt"==="".concat(t.category)){e.innerHTML+='<td class="courses">'.concat(t.name," </td><td>").concat(t.description," </td><td>").concat(t.price," </td>");document.getElementsByClassName("courses")}if("Efterrätt"==="".concat(t.category)){n.innerHTML+='<td class="courses">'.concat(t.name," </td><td>").concat(t.description," </td><td>").concat(t.price," </td>");document.getElementsByClassName("courses")}if("Dryck"==="".concat(t.category)){o.innerHTML+='<td class="courses">'.concat(t.name," </td><td>").concat(t.description," </td><td>").concat(t.price," </td>");document.getElementsByClassName("courses")}}))}function theFunction(){var t=document.getElementById("small_nav");"block"===t.style.display?t.style.display="none":t.style.display="block"}window.onload=init;