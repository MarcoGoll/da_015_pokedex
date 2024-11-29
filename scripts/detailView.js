
async function openDetailDialog(id) {
    toggleClass('d_none', 'detailView');
    let pokemon = await getPokemonById(id);
    let pokemonSpecies = await getPokemonSpeciesById(id);
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