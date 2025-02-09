const pokemonsNames = document.querySelector('.pokemonName');
const pokemonsNumbers = document.querySelector('.pokemonNumber')
const pokemonsImagens = document.querySelector('.pokemonImage')

const form = document.querySelector('.form')
const input = document.querySelector('.inputSearch')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {

    pokemonsNames.innerHTML = "Loading ..";
    pokemonsNumbers.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonsImagens.style.display = "block";
        pokemonsNames.innerHTML = data.name;
        pokemonsNumbers.innerHTML = data.id;
        pokemonsImagens.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = "";
        searchPokemon = data.id
    } else{
        pokemonsNames.innerHTML = "Not Found :(";
        pokemonsNumbers.innerHTML = "";
        pokemonsImagens.style.display = "none";
        input.value = "";
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    };

});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon)