/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/ 
const URL_TYPE19STELLAR = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/19.png";
const URL_TYPE10001UNKNOWN = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iv/platinum/10001.png";
const URL_ALLPOKEMON = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100000";
const URL_POKEMONVIAID = "https://pokeapi.co/api/v2/pokemon/";
const URL_TYPEIMG = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/";
const ERROR_FETCHCATCH = "Schnittstellen-Aufruf ist fehlgeschlagen. Bitte versuchen Sie es Später wieder.";
const LIGHTOPACITY = "0.6";
const DARKOPACITY = "1";
const LOADAMOUNT = 30;
const TYPES = [
    {
        "typeName": "normal",
        "id" : 1,
        "lightColorCode" : `rgba(153,153,153,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(153,153,153,${DARKOPACITY})`
    },
    {
        "typeName": "fighting",
        "id" : 2,
        "lightColorCode" : `rgba(255,162,2,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(255,162,2,${DARKOPACITY})`
    },
    {
        "typeName": "flying",
        "id" : 3,
        "lightColorCode" : `rgba(149,201,255${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(149,201,255${DARKOPACITY})`
    },
    {
        "typeName": "poison",
        "id" : 4,
        "lightColorCode" : `rgba(153,77,207,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(153,77,207,${DARKOPACITY})`
    },
    {
        "typeName": "ground",
        "id" : 5,
        "lightColorCode" : `rgba(171,121,57,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(171,121,57,${DARKOPACITY})`
    },
    {
        "typeName": "rock",
        "id" : 6,
        "lightColorCode" : `rgba(188,184,137,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(188,184,137,${DARKOPACITY})`
    },
    {
        "typeName": "bug",
        "id" : 7,
        "lightColorCode" : `rgba(159,164,36,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(159,164,36,${DARKOPACITY})`
    },
    {
        "typeName": "ghost",
        "id" : 8,
        "lightColorCode" : `rgba(113,71,113,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(113,71,113,${DARKOPACITY})`
    },
    {
        "typeName": "steel",
        "id" : 9,
        "lightColorCode" : `rgba(106,174,211,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(106,174,211,${DARKOPACITY})`
    },
    {
        "typeName": "fire",
        "id" : 10,
        "lightColorCode" : `rgba(255,97,44,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(255,97,44,${DARKOPACITY})`
    },
    {
        "typeName": "water",
        "id" : 11,
        "lightColorCode" : `rgba(41,146,255,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(41,146,255,${DARKOPACITY})`
    },
    {
        "typeName": "grass",
        "id" : 12,
        "lightColorCode" : `rgba(66,191,36,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(66,191,36,${DARKOPACITY})`
    },
    {
        "typeName": "electric",
        "id" : 13,
        "lightColorCode" : `rgba(255,219,0,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(255,219,0,${DARKOPACITY})`
    },
    {
        "typeName": "psychic",
        "id" : 14,
        "lightColorCode" : `rgba(255,99,127,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(255,99,127,${DARKOPACITY})`
    },
    {
        "typeName": "ice",
        "id" : 15,
        "lightColorCode" : `rgba(66,191,255,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(66,191,255,${DARKOPACITY})`
    },
    {
        "typeName": "dragon",
        "id" : 16,
        "lightColorCode" : `rgba(84,98,214,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(84,98,214,${DARKOPACITY})`
    },
    {
        "typeName": "dark",
        "id" : 17,
        "lightColorCode" : `rgba(79,71,71,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(79,71,71,${DARKOPACITY})`
    },
    {
        "typeName": "fairy",
        "id" : 18,
        "lightColorCode" : `rgba(255,177,255,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(255,177,255,${DARKOPACITY})`
    },
    {
        "typeName": "stellar",
        "id" : 19,
        "lightColorCode" : `rgba(0,0,0,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(0,0,0,${DARKOPACITY})`
    },
    {
        "typeName": "unknown",
        "id" : 10001,
        "lightColorCode" : `rgba(0,0,0,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(0,0,0,${DARKOPACITY})`
    },
    {
        "typeName": "myUnknown",
        "id" : 99999,
        "lightColorCode" : `rgba(0,0,0,${LIGHTOPACITY})`,
        "darkColorCode" : `rgba(0,0,0,${DARKOPACITY})`
    }
];

let allPokemons =[]; // {name, url}
let loadetPokemons = []; // detailinfos
let currentlyRendertCounter = 0;
let cardsContainerRef = document.getElementById('cardsContainer');
    

/*====================================================================================================
    FUNCTIONS
====================================================================================================*/ 
/**
* Description for the function
* @param {string} <variableName> Desription for the usage of a parameter
* @param {number} <variableName> Desription for the usage of a parameter
* @param {(string|Array)} <variableName> Desription for the usage of a parameter
* @param {(number|Array)} <variableName> Desription for the usage of a parameter
* @returns {(string|Array)} <variableName> Desription for the return variable/value
*/
async function init(){
    await setAllPokemons();
    cardsContainerRef.innerHTML="";
    renderCards_Amount(currentlyRendertCounter,LOADAMOUNT);
}

async function renderCards_Amount(start, amount){   
    await setPokemonDetails(start, amount);
    for (let i = start; i < (start+amount); i++){
        if(!(start+amount > allPokemons.length)){
            currentlyRendertCounter++;
            let arrayOfTypeIds = getTypeIds(loadetPokemons[i]);
            if (arrayOfTypeIds.length>1){
                cardsContainerRef.innerHTML += getHTMLForCardWithTwoTypes(loadetPokemons[i], i, URL_TYPEIMG + arrayOfTypeIds[0] + ".png", URL_TYPEIMG + arrayOfTypeIds[1] + ".png");
                setBackGroundColorCard(i, arrayOfTypeIds);
            }else{
                cardsContainerRef.innerHTML += getHTMLForCardWithOneType(loadetPokemons[i], i, URL_TYPEIMG + arrayOfTypeIds[0] + ".png");
                setBackGroundColorCard(i, arrayOfTypeIds);
            }
        }
    }
}

async function setAllPokemons(){
    try {
        let listOfAllPokemon = await fetch(URL_ALLPOKEMON);
        let allPokemonsResponse = await listOfAllPokemon.json();
        allPokemons = allPokemonsResponse.results;
    } catch (error) {
        console.error(ERROR_FETCHCATCH);
    }
}

async function setPokemonDetails(start, amount){
    for (let i = start; i < (start+amount); i++) {
        try {
            let detailsPokemonX = await fetch(URL_POKEMONVIAID+(i+1));
            loadetPokemons.push(await detailsPokemonX.json());
        } catch (error) {
            console.error(ERROR_FETCHCATCH); 
        }
    }
}

function getTypeIds(pokemon){
    let foundTypes = [];
    pokemon.types.forEach((type, i) => {
        foundTypes.push(pokemon.types[i].type.name)    
    });

    let foundIds = [];
    for (let i = 0; i < foundTypes.length; i++) {
         TYPES.forEach(type => {
            if(type.typeName == foundTypes[i]){
                foundIds.push(type.id);
            }
         });
    }
    return foundIds;
}

function setBackGroundColorCard(index, arrayOfTypeIds){
    let cardRef = document.getElementById("card"+index);
    if (arrayOfTypeIds.length>1){
        //TwoBackground
        cardRef.style.background = `linear-gradient(160deg, ${TYPES[arrayOfTypeIds[0]-1].lightColorCode} 0%, ${TYPES[arrayOfTypeIds[0]-1].darkColorCode} 50%, ${TYPES[arrayOfTypeIds[1]-1].lightColorCode} 65%, ${TYPES[arrayOfTypeIds[1]-1].darkColorCode} 100%)`;
        
    }else{
        //OneBackground
        cardRef.style.background = `linear-gradient(120deg, ${TYPES[arrayOfTypeIds[0]-1].lightColorCode} 0%, ${TYPES[arrayOfTypeIds[0]-1].darkColorCode} 100%)`;
    }
}

function loadNextPokemon(){
    renderCards_Amount(currentlyRendertCounter,LOADAMOUNT)
}

// TODO: für Suche
function renderCards_Ids(array){
}

function reset(){
    currentlyRendertCounter=0;
}

/*====================================================================================================
    EVENT LISTENERS
====================================================================================================*/ 
// Add eventlistenders here



