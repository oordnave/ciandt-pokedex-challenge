// API calls

// declaring constants
const POKE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const POKE_URL_TYPES = 'https://pokeapi.co/api/v2/type/';

// get all the pokemon data
const getAllPokemons = async (length) => {
  // defining an empty array to store the promises
  const promiseArray = [];

  // populate the array with promises
  // this time, we make the requests for the api based on the id from the pokemon
  // the try-catch block is insde the foreach, to verify if the first request is succeed or not
  // if not, throw an error and stops the loop, passing the message to the statee
  for (let i = length; i < length + 20; i++) {
    try {
      // push into the state array
      promiseArray.push((await fetch(POKE_URL + `${i}`)).json());
      // error caching
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // wait for the promise array to resolve
  const allPokemonData = await Promise.all(promiseArray);

  // return the data from each pokemon
  return allPokemonData.map((pokemon) => {
    return {
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      artwork: pokemon.sprites.other['official-artwork'].front_default,
      stats: pokemon.stats,
      types: pokemon.types,
    };
  });
};
//

// get the pokemon from the search
const getPokemonFromApi = async (pokemonName) => {
  // try-catch block
  try {
    // make the request for the api by pokemon name
    let promise = await fetch(POKE_URL + pokemonName);

    // waiting the promise to be fullfilled
    let result = await promise.json();

    // printing the result
    console.log(result);

    let resultArray = [
      {
        name: result.name,
        sprite: result.sprites.front_default,
        artwork: result.sprites.other['official-artwork'].front_default,
        stats: result.stats,
      },
    ];

    console.log('Array from resultArray is:', resultArray);

    return resultArray;
    // handling errors
  } catch (error) {
    // error message
    console.log(error.message);
    throw error;
  }
};

// get pokemon from the single page, passing the id
const getPokemonFromApiById = async (pokemonId) => {
  try {
    // Make the request for the API by Pokemon ID
    let promise = await fetch(POKE_URL + pokemonId);

    // Check if the response status is OK (200)
    if (!promise.ok) {
      throw new Error(`Failed to fetch Pokémon with ID ${pokemonId}`);
    }

    // Waiting for the promise to be fulfilled
    let result = await promise.json();

    // returning the result
    return [result];
  } catch (error) {
    // Error message
    console.error(error.message);
    throw error;
  }
};

// get the pokemon from the search
const getPokemonTypes = async () => {
  // try-catch block
  try {
    // make the request for the api by pokemon name
    let promise = await fetch(POKE_URL_TYPES);

    // waiting the promise to be fullfilled
    let result = await promise.json();

    // passing the results array
    let resultArray = result.results;

    // printing the result
    // console.log('the result from resultArray:', resultArray);

    return resultArray;
    // handling errors
  } catch (error) {
    // error message
    console.log(error.message);
    throw error;
  }
};

export { getAllPokemons, getPokemonFromApi, getPokemonFromApiById, getPokemonTypes };
