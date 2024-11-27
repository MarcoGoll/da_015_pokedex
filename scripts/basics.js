/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/
/*================================================
    for BASIC FEATURE ==> go To Top
/*================================================*/
const refGoTopBtn = document.getElementById("goTopBtn");


/*================================================
    for BASIC FEATURE ==> toogle dark mode
/*================================================*/
const refBody = document.getElementById('body');
const refbtnDarkmode = document.getElementById('btnDarkmode');


/*====================================================================================================
    FUNCTIONS
====================================================================================================*/
/*================================================
    for BASIC FEATURE ==> go to top
/*================================================*/
/*
* Initialise scrollFunction() at window event onscroll
*/
window.onscroll = function () { scrollFunction() };


/*
* When the user scrolls down 20px from the top of the document, show the button
*/
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        refGoTopBtn.style.display = "block";
    } else {
        refGoTopBtn.style.display = "none";
    }
}


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


/*================================================
    for BASIC FEATURE ==> toogle dark mode
/*================================================*/
/*
* Switch zwischen Darkmode and Lightmode
*/
function switchDarkmode() {
    if (refBody.classList.contains("darkmode")) {
        //add here properties for lightmode
        refBody.classList.remove("darkmode");
        refbtnDarkmode.innerHTML = "<img src='./assets/icons/googleFontsIcons/moon.svg' alt='Moon'>";

    } else {
        //add here properties for darkmodemode
        refBody.classList.add("darkmode");
        refbtnDarkmode.innerHTML = "<img src='./assets/icons/googleFontsIcons/sun.svg' alt='Sun'>";
    }
}




