// make the imports
import { useEffect, useCallback } from 'react';

// importing the context
import { usePokemonContext } from '../../context/PokemonContext';
// components
import Header from '../../components/blocks/Header/Header';
import Search from '../../components/blocks/Search/Search';
import InfiniteScroll from '../../components/blocks/InfiniteScroll/InfiniteScroll';

// api calls
import { getAllPokemons, getPokemonFromApi } from '../../api/api';

// App component
const Home = () => {
  // states from useContext
  const {
    allPokemons,
    setAllPokemons,
    search,
    setSearch,
    searchResult,
    setSearchResult,
    searchMessage,
    setSearchMessage,
    message,
    setMessage,
    isLoading,
    setLoading,
  } = usePokemonContext();

  // handlers
  // handler to the search input
  const handleSearch = (event) => {
    let term = event.target.value;
    if (term) {
      setSearch(term);
    } else {
      setSearch('');
      setSearchResult([]);
    }
  };

  // handler to clear the search input
  const handleClear = () => {
    setSearch('');
    setSearchResult([]);
    console.log('clear');
  };

  // handler to perform a search
  const searchPokemon = (event) => {
    // preventing the default behaviour from the form
    event.preventDefault();

    if (search.length > 0) {
      // first, verify in the pokemons state if the pokemon exists
      let result = allPokemons.find(
        (pokemon) => pokemon.name.toLowerCase() === search.toLowerCase(),
      );

      // conditionals if result exists, if not search in the API
      if (result) {
        console.log('pokemon found in the state: ', result);
        setSearchMessage('pokemon found in the state');

        let resultArray = [];

        resultArray.push(result);

        console.log(resultArray);

        setSearchResult(resultArray);
      } else {
        console.log('pokémon not found in stored cache, making request for the api');
        setSearchMessage('pokémon not found in stored cache, making request for the api');
        setLoading(true);
        fetchPokemonData(search.toLowerCase());
      }
    } else {
      setSearchResult([]);
      setSearchMessage('type something to show in search!');
      setLoading(true);
    }
  };

  // effects
  // fetching the data and updating the states
  const fetchPokemonData = useCallback(
    async (pokemonName) => {
      if (pokemonName) {
        try {
          const response = await getPokemonFromApi(pokemonName);
          setSearchResult(response);
        } catch (err) {
          console.log(err);
          setSearchResult([]);
          setSearchMessage('Pokémon not found!');
          throw err;
        }
      } else {
        setLoading(true);
        setMessage('loading');
        const response = await getAllPokemons(1);
        setAllPokemons(response);
        setLoading(false);
      }
    },
    [setAllPokemons, setSearchResult, setSearchMessage, setLoading, setMessage],
  );

  // useEffect to fetch the data for all the pokemons
  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  // useEffect to handle the scroll event for the user
  useEffect(() => {
    const handleScroll = () => {
      // verifying if scroll event is fired
      console.log('event fired!');

      // for testing purpouses, verify if the length is 70
      if (allPokemons.length > 70) {
        setMessage('Reached the end of the list!!');
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [allPokemons, setAllPokemons, setLoading, setMessage]);

  return (
    <>
      <Header />
      <Search
        searchPokemon={searchPokemon}
        value={search}
        handleSearch={handleSearch}
        handleClear={handleClear}
      />
      <section>
        <InfiniteScroll
          allPokemons={allPokemons}
          searchResult={searchResult}
          isLoading={isLoading}
          message={message}
          searchMessage={searchMessage}
        />
      </section>
      <footer></footer>
    </>
  );
};

export default Home;
