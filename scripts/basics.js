/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/
/*================================================
    for BASIC FEATURE ==> go To Top
/*================================================*/
const refGoTopBtn = document.getElementById("goTopBtn");

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
    for BASIC FEATURE ==> toggleClass
/*================================================*/

function toggleClass(className, identifier) {
    let element = document.getElementById(identifier);
    element.classList.toggle(className);
}

/**
* Loads the basket from the Local storage. If it is found, the current basket is replaced by this one 
*/
function stopPropagation(event) {
    event.stopPropagation();
}




