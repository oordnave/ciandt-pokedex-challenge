// Pokemon context provider
// This was created because we have the necessity to store the state
// from the app in a way to be accessed while navigating and passing
// the state for the routes

// importing prop types
import PropTypes from 'prop-types';

// importing functionalities
import { createContext, useContext, useState } from 'react';

// creating context
const PokemonContext = createContext();

/// Declaring AppProvider
const PokemonProvider = ({ children }) => {
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

  // state for favorites
  const [favorites, setFavorites] = useState([]);
  const [isError, setError] = useState(false);

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
    favorites,
    setFavorites,
    isError,
    setError,
  };

  // returning passing a child prop to the component
  return <PokemonContext.Provider value={state}>{children}</PokemonContext.Provider>;
};

// Declaring useAppContext
const usePokemonContext = () => {
  return useContext(PokemonContext);
};

// prop types validation
PokemonProvider.propTypes = {
  children: PropTypes.node,
};

// Exporting
export default PokemonProvider;
export { usePokemonContext };
