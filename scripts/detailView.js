/**
* Initialises the opening of the detail page for a specific Pokemon
* @param {number} id - ID of the Pokemon for which the detailview should be displayed
*/
async function openDetailDialog(id) {
    toggleClass('d_none', 'detailView');
    toggleClass('overflowHidden', 'body');
    loadNextPokemon(id);
}

/**
* Plays the sound of a Pokemon
* @param {number} id - ID of the Pokemon for which the sound should be played
*/
function playCrie(id) {
    let crie = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`);
    crie.volume = 0.01;
    crie.play();
}

/**
* Renders the Detailview of a Pokemon
* @param {object} pokemon - Pokemon object for which the view should be rendered
* @param {object} pokemonSpecies - Species object of the Pokemon for which the view should be rendered
* @param {string} descriptionText - Description Text of the Pokemon for which the view should be rendered
*/
function renderDetailView(pokemon, pokemonSpecies, descriptionText) {
    let detailView__ContentRef = document.getElementById('detailView__Content');
    detailView__ContentRef.innerHTML = "";
    detailView__ContentRef.innerHTML = getHTMLForDetailView(pokemon, pokemonSpecies, descriptionText);
}

/**
* Loads the next OR previous Pokemon within the Deatailview
* @param {number} id - ID of the Pokemon which should be loadet5
*/
async function loadNextPokemon(id) {
    id = checkPokemonId(id);
    if (!(id == 9999999999)) {
        let pokemon = await getPokemonById(id);
        let pokemonSpecies = await getPokemonSpecies(pokemon);
        let descriptionText = getFlavorText(pokemonSpecies);
        renderDetailView(pokemon, pokemonSpecies, descriptionText);
        initBackgroundcolorSetting(pokemon);
        playCrie(id);
        runmove();
        //TODO: POKEMON CHAIN (Ideas in the Next Line's)
        // let evolutionChain = await getEvolutionChain(pokemonSpecies)
        // console.log(evolutionChain);
        // let pokemonsInEvolutionChain = getNamesOfEvolutionChain(evolutionChain);
        // console.log(pokemonsInEvolutionChain);
    }
}

/**
* Returns the first found "en" description text of the species object
* @param {object} pokemonSpecies - Species Details of the Pokemon
*/
function getFlavorText(pokemonSpecies) {
    for (let i = 0; i < pokemonSpecies.flavor_text_entries.length; i++) {
        if (pokemonSpecies.flavor_text_entries[i].language.name == "en") {
            return pokemonSpecies.flavor_text_entries[i].flavor_text.replace("", " ");
        }
    }
}

/**
* Initialises the type-dependent setting of the backgroundcolor of the detail view
* @param {object} pokemon - Pokemon for which the backgroundcolor of the detail view should be set
*/
function initBackgroundcolorSetting(pokemon) {
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
}

/**
* Sets the type-dependent backgroundcolor of the detail view
* @param {(number|Array)} arrayOfTypeIds - List of Type Id's matching the Pokemon
*/
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

/**
* Checks the limits of Pokemon ID. If a limit is exceeded, an error ID (9999999999) or a more suitable ID is returned
* @param {number} id - Unsafe ID of the Pokemon
* @returns {number} Safe ID of the Pokemon
*/
function checkPokemonId(id) {
    switch (id) {
        case 0:
            return 9999999999;
        case 1026:
            return 10001;
        case 10000:
            return 1025;
        case 10278:
            return 9999999999;
        default:
            return id;
    }
}

//TODO: POKEMON CHAIN (only Ideas so far)
/*
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
*/