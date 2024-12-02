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

