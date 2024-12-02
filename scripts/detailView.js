
async function openDetailDialog(id) {
    toggleClass('d_none', 'detailView');
    loadNextPokemon(id);

}

function playCrie(id) {
    let crie = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`);
    crie.volume = 0.005;
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
    playCrie(id);
    runmove();

    console.log(pokemon);
    console.log(pokemonSpecies);
    console.log(pokemonSpecies.evolution_chain.url); // needs to be called for chaininfo
    console.log(pokemonSpecies.flavor_text_entries[0].flavor_text); // description => NEEDS TO BE CHECKES. SEEMS THAT IT IS NOT ALWAYS [0]





    //TODO: fetch URL_POKEMONSPECIES for more details
    //TODO: getHTMLForDetail(pokemon, species)
    //TODO: HTMLT with Bootstrap 
    // => https://getbootstrap.com/docs/5.3/components/accordion/
    // => https://getbootstrap.com/docs/5.3/components/close-button/
    // => https://getbootstrap.com/docs/5.3/components/progress/
    // => https://getbootstrap.com/docs/5.3/components/spinners/


}

//gibt den ersten "en" Beschreibungstext aller flavor_text_entries zurück
function getFlavorText(pokemonSpecies) {
    for (let i = 0; i < pokemonSpecies.flavor_text_entries.length; i++) {
        if (pokemonSpecies.flavor_text_entries[i].language.name == "en") {
            return pokemonSpecies.flavor_text_entries[i].flavor_text.replace("", " ");
        }
    }
}