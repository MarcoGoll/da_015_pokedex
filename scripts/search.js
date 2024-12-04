/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/
let searchInputRef = document.getElementById('searchInput');
let searchBtnRef = document.getElementById('searchBtn');

/*====================================================================================================
    FUNCTIONS
====================================================================================================*/
async function initSearchPokemon() {
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
        renderCards_Ids(await searchPokemon(searchInputRef.value));
        searchMode = true;
    } else {
        searchInputRef.classList.add("inputInvalide");
        searchInputRef.classList.remove("inputValide");
        searchBtnRef.classList.add("inputInvalideBtn");
        searchBtnRef.classList.remove("inputValideBtn");
    }
}

async function searchPokemon(searchString) {
    let searchedResult = [];
    for (let i = 0; i < allPokemons.length; i++) {
        if (allPokemons[i].name.includes(searchString.toLowerCase())) {
            let pokemon = await getPokemonByName(allPokemons[i].name);
            searchedResult.push(pokemon.id);
        }
    }
    return searchedResult;
}