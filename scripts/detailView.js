
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

    let evolutionChain = await getEvolutionChain(pokemonSpecies)
    console.log(evolutionChain);
    //TODO: let pokemonsInEvolutionChain = getNamesOfEvolutionChain(evolutionChain);
    // console.log(pokemonsInEvolutionChain);
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

//TODO: TBD 
function getNamesOfEvolutionChain(evolutionChain) {
    let pokemoninChain = [];

    // first Pokemon (alwais the same)
    pokemoninChain.push(evolutionChain.chain.species.name);

    //Try 3 Evolve-Steps
    // Sublevel 1
    if (evolutionChain.chain.evolves_to.length > 0) {
        // all second Pokemons (could be more than one)
        for (let i = 0; i < evolutionChain.chain.evolves_to.length; i++) {
            pokemoninChain.push(evolutionChain.chain.evolves_to[i].species.name);

            // Sublevel 2
            // all third Pokemen (could be more than one)
            if (evolutionChain.chain.evolves_to[i].evolves_to.length > 0) {
                for (let j = 0; j < evolutionChain.chain.evolves_to[i].evolves_to.length; j++) {
                    pokemoninChain.push(evolutionChain.chain.evolves_to[i].evolves_to[j].species.name);
                }
            } else { return pokemoninChain; }
        }
    }
    else {
        return pokemoninChain;
    }

    //pokemoninChain.push(evolutionChain.chain.evolves_to[0].species.name);


    // third Pokemon (could be not there)
    //pokemoninChain.push(evolutionChain.chain.evolves_to[0].evolves_to[0].species.name)
    // fourth Pokemon (could be  i dont know an example)
    //pokemoninChain.push(evolutionChain.chain.evolves_to[0].evolves_to[0].evolves_to[0].species.name)
    return pokemoninChain;
}