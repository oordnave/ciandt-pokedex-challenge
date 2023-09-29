// make the imports
import { useState, useEffect } from 'react';
import Header from './components/blocks/Header/Header';
import Search from './components/blocks/Search/Search';
import InfiniteScroll from './components/blocks/InfiniteScroll/InfiniteScroll';

// declaring constants
const POKE_URL = 'https://pokeapi.co/api/v2/pokemon/';

// App component
function App() {
  // states
  // state for all the pokémons
  const [allPokemons, setAllPokemons] = useState([]);

  // state for the search query
  const [search, setSearch] = useState('');

  // state for the search result
  const [searchResult, setSearchResult] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');

  // state for the infinite scroll
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(true);

  // handlers
  // handler to the search input
  const handleSearch = (event) => {
    let term = event.target.value;
    setSearch(term);
  };

  // handler to clear the search input
  const handleClear = () => {
    setSearch('');
    console.log('clear');
  };

  // handler to perform a search
  const searchPokemon = (event) => {
    // preventing the default behaviour from the form
    event.preventDefault();

    // first, verify in the pokemons state if the pokemon exists
    let result = allPokemons.find((pokemon) => pokemon.name.toLowerCase() === search.toLowerCase());

    // conditionals if result exists, if not search in the API
    if (result) {
      console.log('pokemon found in the state: ', result);

      let resultArray = [];

      resultArray.push(result);

      console.log(resultArray);

      setSearchResult(resultArray);
    } else {
      console.log('pokémon not found in stored cache, making request for the api');
      getPokemonFromSearch(search.toLowerCase());
    }
  };

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
        setMessage(error.message);
        break;
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
      };
    });
  };

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

      console.log('Array is: ', resultArray);

      return resultArray;
      // handling errors
    } catch (error) {
      // error message
      console.log(error.message);
      throw error;
    }
  };

  // defining the function to be passed into the useEffect hook
  const getPokemonsWhileScroll = () => {
    // fetching the data and updating the states
    const fetchData = async () => {
      setLoading(true);
      setMessage('loading');
      const response = await getAllPokemons(1);
      setAllPokemons(response);
      setLoading(false);
    };

    fetchData();
  };

  const getPokemonFromSearch = (pokemonName) => {
    if (pokemonName) {
      // fetching the data and updating the states
      const fetchData = async () => {
        try {
          const response = await getPokemonFromApi(pokemonName);
          setSearchResult(response);
        } catch (err) {
          console.log(err);
          setSearchResult([]);
          setSearchMessage('Pokémon not found!');
          throw err;
        }
      };

      fetchData();
    }
  };

  // effects
  // using to get the pokemon data
  useEffect(getPokemonsWhileScroll, []);
  useEffect(getPokemonFromSearch, []);

  // Using the onscroll property
  // To verify the offset from the user, and make the API call while scrolling
  window.onscroll = () => {
    if (allPokemons.length > 70) {
      setMessage('Reached end of the list!!');
      return;
    }
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setMessage('Loading...');
      setLoading(true);
      // the getPokemonData method is adding one, because it was duplicating the data
      // the array starts at zero, because of that we need to add one
      // to prevent mutating the array directly, we use the spread operator
      getAllPokemons(allPokemons.length + 1).then((newPokemons) => {
        setAllPokemons([...allPokemons, ...newPokemons]);
        setLoading(false);
      });
    }
  };

  return (
    <>
      <Header />
      <section>
        <Search
          searchPokemon={searchPokemon}
          value={search}
          handleSearch={handleSearch}
          handleClear={handleClear}
        />
        <div className='search-result'>
          <h1>Show the result from search</h1>
          <p>Search Result: {searchResult.length !== 0 ? searchResult[0].name : searchMessage}</p>
          <>
            {searchResult.map((pokemon, index) => {
              return (
                <div className='card' key={'num' + index}>
                  <h1 className='pokemonName'> {pokemon.name}</h1>
                  <img src={pokemon.artwork} alt={pokemon.name} />
                  {pokemon.stats.map((attribute, index) => (
                    <p key={'num' + index}>
                      {attribute.base_stat} {attribute.stat.name}
                    </p>
                  ))}
                </div>
              );
            })}
          </>
        </div>
        <InfiniteScroll
          allPokemons={allPokemons}
          searchResult={searchResult}
          isLoading={isLoading}
          message={message}
        />
      </section>
      <footer></footer>
    </>
  );
}

export default App;
