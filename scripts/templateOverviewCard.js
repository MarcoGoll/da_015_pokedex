//Bether Images but not for all pokemon available => loadetPokemon.sprites.other.dream_world.front_default

function getHTMLForCardWithOneType(loadetPokemon, index, typeURL) {
    return `
                    <div class="card" id="card${index}">
                        <img src="${loadetPokemon.sprites.other['official-artwork'].front_default}"
                            alt="" class="card__Img" id="card__Img${index}">
                        <p class="card__No" id="card__No1">No #${loadetPokemon.id}</p>
                        <p class="card__Name" id="card__Name${index}">${loadetPokemon.name}</p>
                        <div class="card__Types" id="card__Types${index}">
                            <div class="card__type">
                                <img src="${typeURL}"
                                    alt="" class="type__Img" id="type__Img${index}1">
                            </div>
                        </div>
                    </div>
    `
}

function getHTMLForCardWithTwoTypes(loadetPokemon, index, type1URL, type2URL) {
    return `
                    <div class="card" id="card${index}">
                        <img src="${loadetPokemon.sprites.other['official-artwork'].front_default}"
                            alt="" class="card__Img" id="card__Img${index}">
                        <p class="card__No" id="card__No1">No #${loadetPokemon.id}</p>
                        <p class="card__Name" id="card__Name${index}">${loadetPokemon.name}</p>
                        <div class="card__Types" id="card__Types${index}">
                            <div class="card__type">
                                <img src="${type1URL}"
                                    alt="" class="type__Img" id="type__Img${index}1">
                            </div>
                            <div class="card__type">
                                <img src="${type2URL}"
                                    alt="" class="type__Img" id="type__Img${index}2">
                            </div>
                        </div>
                    </div>
    `
}

