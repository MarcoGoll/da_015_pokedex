/**
* Initialises the loading of all Pokemon into an array AND the rendering of a defined number of Pokemon
* @param {string} <variableName> Desription for the usage of a parameter
* @param {number} <variableName> Desription for the usage of a parameter
* @param {(string|Array)} <variableName> Desription for the usage of a parameter
* @param {(number|Array)} <variableName> Desription for the usage of a parameter
* @returns {(string|Array)} <variableName> Desription for the return variable/value
*/

let className = "move";


/**
* Inititalises the start of the move effect AND set an timeout (how long the animation should run) 
*/
function runmove() {
    let moveBtnRef = document.getElementById('detailView__Img');
    startmove(moveBtnRef);
    setTimeout(() => {
        endmove(moveBtnRef);
    }, 300);
}

/**
* Starts of the move effect
*/
function startmove(moveBtnRef) {
    moveBtnRef.classList.add(className);
}

/**
* Ends of the move effect
*/
function endmove(moveBtnRef) {
    moveBtnRef.classList.remove(className);
}

