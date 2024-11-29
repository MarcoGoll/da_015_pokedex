/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/
let searchInputRef = document.getElementById('searchInput');
let searchBtnRef = document.getElementById('searchBtn');

/*====================================================================================================
    FUNCTIONS
====================================================================================================*/
function initSearchPokemon() {
    if (searchInputRef.value.length == "") {
        searchInputRef.classList.remove("inputInvalide");
        searchBtnRef.classList.remove("inputInvalideBtn");
        searchInputRef.classList.remove("inputValide")
        searchBtnRef.classList.remove("inputValideBtn");
        reset();
        renderCards_Amount(currentlyRendertCounter, LOADAMOUNT);
    }
    else if (searchInputRef.value.length >= 3) {
        searchInputRef.classList.add("inputValide");
        searchInputRef.classList.remove("inputInvalide");
        searchBtnRef.classList.add("inputValideBtn");
        searchBtnRef.classList.remove("inputInvalideBtn");
        //TODO: next two lines in separate function onclick searchBTN
        renderCards_Ids(searchPokemon(searchInputRef.value));
        searchMode = true;
    } else {
        searchInputRef.classList.add("inputInvalide");
        searchInputRef.classList.remove("inputValide");
        searchBtnRef.classList.add("inputInvalideBtn");
        searchBtnRef.classList.remove("inputValideBtn");
    }
}

function searchPokemon(searchString) {
    let searchedResult = [];
    for (let i = 0; i < allPokemons.length; i++) {
        if (allPokemons[i].name.includes(searchString)) {
            searchedResult.push(i);
            //TODO: Geht nicht immer mit i, da manche Pokemon hier abweicheungen haben z.B. "https://pokeapi.co/api/v2/pokemon/10043/"
            // Wir müssen anstatt dem index die ID ins array pushen
        }
    }
    return searchedResult;
}