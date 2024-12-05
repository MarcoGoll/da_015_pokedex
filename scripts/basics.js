/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/
const refGoTopBtn = document.getElementById("goTopBtn");

/*====================================================================================================
    FUNCTIONS
====================================================================================================*/
/**
* Initialise scrollFunction() at window event onscroll
*/
window.onscroll = function () { scrollFunction() };

/**
* When the user scrolls down 20px from the top of the document, show the button
*/
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        refGoTopBtn.style.display = "block";
    } else {
        refGoTopBtn.style.display = "none";
    }
}

/**
* When the user clicks on the button, scroll to the top of the document
*/
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/**
* Toggled a class of an HTML element
* @param {string} className - Name of the class
* @param {number} identifier - Id of the HTML element
*/
function toggleClass(className, identifier) {
    let element = document.getElementById(identifier);
    element.classList.toggle(className);
}

/**
* Stops the propagation process (bubbling)
* @param {event} event - Event which was triggered
*/
function stopPropagation(event) {
    event.stopPropagation();
}




