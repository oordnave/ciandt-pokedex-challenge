// Pokemon context provider
// This was created because we have the necessity to store the state
// from the app in a way to be accessed while navigating and passing
// the state for the routes

// importing functionalities
import { createContext, useContext, useState, useEffect } from 'react';

// creating context
const PokemonContext = createContext();

/// Declaring AppProvider
const AppProvider = ({ children }) => {
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

  // defining effects

  // effects
  // using to get the pokemon data
  // useEffect(getPokemonsWhileScroll, []);
  useEffect(getPokemonFromSearch, []);

  // fetching the data and updating the states
  const fetchData = async () => {
    setLoading(true);
    setMessage('loading');
    const response = await getAllPokemons(1);
    setAllPokemons(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
  }, [allPokemons]);

  // defining state constant
  const state = {
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
  };

  // returning passing a child prop to the component
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

// Declaring useAppContext
const usePokemonContext = () => {
  return useContext(PokemonContext);
};

// Exporting
export default AppProvider;
export { usePokemonContext as useAppContext };
