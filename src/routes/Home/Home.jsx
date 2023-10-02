// make the imports
import { useEffect, useCallback } from 'react';

// importing the context
import { usePokemonContext } from '../../context/PokemonContext';
// components
import Header from '../../components/blocks/Header/Header';
import Search from '../../components/blocks/Search/Search';
import Filter from '../../components/blocks/Filter/Filter';
import InfiniteScroll from '../../components/blocks/InfiniteScroll/InfiniteScroll';

// api calls
import { getAllPokemons, getPokemonFromApi, getPokemonTypes } from '../../api/api';

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
    favorites,
    setFavorites,
    isError,
    setError,
    filter,
    setFilter,
    setTermToFilter,
    filteredResult,
    setFilteredResult,
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
      setError(false);
    }
  };

  // handler to clear the search input
  const handleClear = () => {
    setSearch('');
    setSearchResult([]);
    setError(false);
  };

  const handleFilter = (filterTerm) => {
    setTermToFilter(filterTerm); // Store the filter term in state
    filterPokemonsByType(filterTerm); // Call the filter function with the filter term
  };

  const filterPokemonsByType = (typeToFilter) => {
    const filteredResults = allPokemons.filter((pokemon) => {
      // Check if the typeToFilter exists in the types array of the pokemon
      return pokemon.types.some((type) => type.type.name === typeToFilter);
    });

    // Update the filteredPokemons state with the filtered results
    setFilteredResult(filteredResults);
  };

  // Function to add/remove a Pokemon from favorites
  const toggleFavorite = (pokemonName) => {
    // declaring the variable
    let updatedFavorites;

    // verifies if the storage already have the data
    if (favorites.includes(pokemonName)) {
      // Remove from favorites
      updatedFavorites = favorites.filter((name) => name !== pokemonName);
      setFavorites(updatedFavorites);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, pokemonName];
      setFavorites(updatedFavorites);
    }

    // Save updated favorites to localStorage
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  // function to save the favorite pokémon into localStorage
  const saveFavoritesToLocalStorage = (favorites) => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
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
        let resultArray = [];

        resultArray.push(result);

        setMessage('Pokemon found!');
        setError(false);
      } else {
        setLoading(true);
        fetchPokemonData(search.toLowerCase());
      }
    } else {
      setSearchResult([]);
      setMessage('Type something to show in search!');
      setSearchMessage('Type something to show in search!');
      setLoading(true);
    }
  };

  // effects
  // fetching the data and updating the states
  // useCallback was used to persist the fuction between renders
  const fetchPokemonData = useCallback(
    async (pokemonName) => {
      // if name exists, try to find the pokemon in the api
      if (pokemonName) {
        try {
          const response = await getPokemonFromApi(pokemonName);
          setSearchResult(response);
          setMessage('Pokémon found!');
          setSearchMessage('Pokémon found!');
          setError(false);
        } catch (err) {
          // if not, updates the state and throw error
          setSearchResult([]);
          setMessage('Pokémon not found!');
          setSearchMessage('Pokémon not found!');
          setError(true);
          throw err;
        }
      } else {
        // if name is empty, get all pokemons
        setLoading(true);
        setMessage('Loading');
        const response = await getAllPokemons(1);
        setAllPokemons(response);
        setLoading(false);
      }
    },
    [setAllPokemons, setSearchResult, setSearchMessage, setLoading, setMessage, setError],
  );

  // function to fetch pokemon types
  const fetchPokemonType = useCallback(async () => {
    const response = await getPokemonTypes();
    setFilter(response);
  }, [setFilter]);

  // useEffect which verifies the length of the state.
  // if empty, fetch the data
  useEffect(() => {
    if (allPokemons.length === 0) {
      fetchPokemonData();
      fetchPokemonType();
    }
  }, [allPokemons, fetchPokemonData, fetchPokemonType]);

  // useEffect to fetch the allPokemon data from localStorage
  useEffect(() => {
    // Function to fetch data from localStorage
    const getSavedDataFromLocalStorage = () => {
      const savedData = localStorage.getItem('allPokemons');
      if (savedData !== null) {
        setAllPokemons(JSON.parse(savedData));
      }
    };

    // Fetch data from localStorage when the component mounts
    getSavedDataFromLocalStorage();
  }, [setAllPokemons]);

  // Initialize favorites state from localStorage when the component mounts
  useEffect(() => {
    // Retrieve favorites from localStorage
    const favoritesFromLocalStorage = localStorage.getItem('favorites');
    if (favoritesFromLocalStorage) {
      setFavorites(JSON.parse(favoritesFromLocalStorage));
    }
  }, [setFavorites]);

  // useEffect to handle the scroll event for the user
  useEffect(() => {
    const handleScroll = () => {
      // for testing purpouses, verify if the length is 100
      // this code should be removed if we want the list to work properly
      if (allPokemons.length >= 99) {
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
      // Save allPokemons to localStorage whenever it changes
      try {
        localStorage.setItem('allPokemons', JSON.stringify(allPokemons));
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
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
        searchMessage={searchMessage}
        isError={isError}
      />
      <Filter filter={filter} handleFilter={handleFilter} />
      <section>
        <InfiniteScroll
          allPokemons={allPokemons}
          searchResult={searchResult}
          isLoading={isLoading}
          message={message}
          searchMessage={searchMessage}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          filteredResult={filteredResult}
        />
      </section>
      <footer></footer>
    </>
  );
};

export default Home;
