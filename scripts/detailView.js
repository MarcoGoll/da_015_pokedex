
async function openDetailDialog(id) {
    toggleClass('d_none', 'detailView');
    toggleClass('overflowHidden', 'body');
    loadNextPokemon(id);

}

function playCrie(id) {
    let crie = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`);
    crie.volume = 0.003;
    crie.play();
}

function renderDetailView(pokemon, pokemonSpecies, descriptionText) {
    let detailView__ContentRef = document.getElementById('detailView__Content');
    detailView__ContentRef.innerHTML = "";
    detailView__ContentRef.innerHTML = getHTMLForDetailView(pokemon, pokemonSpecies, descriptionText);
}

async function loadNextPokemon(id) {
    let pokemon = await getPokemonById(id);
    let pokemonSpecies = await getPokemonSpeciesById(id);
    let descriptionText = getFlavorText(pokemonSpecies);
    renderDetailView(pokemon, pokemonSpecies, descriptionText);
    let arrayOfTypeIds = getTypeIds(pokemon);
    let typesDetailviewRef = document.getElementById('typesDetailview');
    typesDetailviewRef.innerHTML = '';
    if (arrayOfTypeIds.length > 1) {
        typesDetailviewRef.innerHTML = renderDetailViewTwoTypes(pokemon, URL_TYPEIMG + arrayOfTypeIds[0] + ".png", URL_TYPEIMG + arrayOfTypeIds[1] + ".png")
        setBackGroundColorDetailView(arrayOfTypeIds);
    } else {
        typesDetailviewRef.innerHTML = renderDetailViewOneType(pokemon, URL_TYPEIMG + arrayOfTypeIds[0] + ".png")
        setBackGroundColorDetailView(arrayOfTypeIds);
    }
    playCrie(id);
    runmove();

    console.log(pokemon);
    console.log(pokemonSpecies);
    console.log(pokemonSpecies.evolution_chain.url); // needs to be called for chaininfo
    console.log(pokemonSpecies.flavor_text_entries[0].flavor_text); // description => NEEDS TO BE CHECKES. SEEMS THAT IT IS NOT ALWAYS [0]
    console.log(await getEvolutionChain(pokemonSpecies));
}

//gibt den ersten "en" Beschreibungstext aller flavor_text_entries zurück
function getFlavorText(pokemonSpecies) {
    for (let i = 0; i < pokemonSpecies.flavor_text_entries.length; i++) {
        if (pokemonSpecies.flavor_text_entries[i].language.name == "en") {
            return pokemonSpecies.flavor_text_entries[i].flavor_text.replace("", " ");
        }
    }
}

function setBackGroundColorDetailView(arrayOfTypeIds) {
    let detailViewRef = document.getElementById("detailView");
    if (arrayOfTypeIds.length > 1) {
        //TwoBackground
        detailViewRef.style.background = `linear-gradient(160deg, ${TYPES[arrayOfTypeIds[0] - 1].lightColorCode} 0%, ${TYPES[arrayOfTypeIds[0] - 1].darkColorCode} 50%, ${TYPES[arrayOfTypeIds[1] - 1].lightColorCode} 65%, ${TYPES[arrayOfTypeIds[1] - 1].darkColorCode} 100%)`;

    } else {
        //OneBackground
        detailViewRef.style.background = `linear-gradient(120deg, ${TYPES[arrayOfTypeIds[0] - 1].lightColorCode} 0%, ${TYPES[arrayOfTypeIds[0] - 1].darkColorCode} 100%)`;
    }
}

async function getEvolutionChain(pokemonSpecies) {
    try {
        let evolutionChain = await fetch(pokemonSpecies.evolution_chain.url);
        let evolutionChainAsJson = await evolutionChain.json();
        return evolutionChainAsJson;
    } catch (error) {
        console.error(ERROR_FETCHCATCH);
    }
}