let moveBtnRef = document.getElementById("detailView__Img");
let className = "move";

/**
* Inititalises the start of the move effect AND set an timeout (how long the animation should run) 
*/
function runmove() {
    startmove();
    setTimeout(() => {
        endmove();
    }, 300);
}

/**
* Starts of the move effect
*/
function startmove() {
    moveBtnRef.classList.add(className);
}

/**
* Ends of the move effect
*/
function endmove() {
    moveBtnRef.classList.remove(className);
}

