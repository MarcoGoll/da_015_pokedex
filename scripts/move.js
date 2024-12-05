/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/
let className = "move";

/*====================================================================================================
    FUNCTIONS
====================================================================================================*/
/**
* Inititalises the start of the move effect AND set an timeout (how long the animation should run) 
*/
function runmove() {
    let movingElementRef = document.getElementById('detailView__Img');
    startmove(movingElementRef);
    setTimeout(() => {
        endmove(movingElementRef);
    }, 300);
}

/**
* Starts of the move effect
* @param {HTMLElement} - Element which should be moving
*/
function startmove(movingElementRef) {
    movingElementRef.classList.add(className);
}

/**
* Ends of the move effect
* @param {HTMLElement} - Element which should be moving
*/
function endmove(movingElementRef) {
    movingElementRef.classList.remove(className);
}

