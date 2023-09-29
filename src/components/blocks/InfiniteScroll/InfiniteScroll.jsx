// Infinite scroll component

// Importing Link from routes
import { Link } from 'react-router-dom';

// Importing prop-types for prop validation
import PropTypes from 'prop-types';

const InfiniteScroll = ({ allPokemons, searchResult, isLoading, message, searchMessage }) => {
  // empty array to populate with the conditional
  let pokemonList = [];

  // conditional to switch between states
  searchResult.length !== 0 ? (pokemonList = searchResult) : (pokemonList = allPokemons);

  return (
    <div className='list-pokemon'>
      <div>
        <h1>pokémon list with infinite scroll</h1>
        <p>Total Pokemons: {allPokemons.length}</p>
        <p>Search result length: {searchResult.length}</p>
        <p>Search result message: {searchMessage}</p>
        <p>Pokemon list length: {pokemonList.length}</p>
      </div>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li className='card' key={'num' + index}>
            <h1 className='pokemonName'> {pokemon.name}</h1>
            <p>Index is {index + 1}</p>
            <Link to={`pokemon/${index + 1}`}>Link to the pokemon</Link>
            <img src={pokemon.artwork} alt={pokemon.name} />
            {pokemon.stats.map((attribute, index) => (
              <p key={'num' + index}>
                {attribute.base_stat} {attribute.stat.name}
              </p>
            ))}
          </li>
        ))}
        {isLoading ? (
          <h1 className='pokemonName'>{message}</h1>
        ) : (
          <h1 className='pokemonName'>{message}</h1>
        )}
      </ul>
    </div>
  );
};

// Validating props
InfiniteScroll.propTypes = {
  allPokemons: PropTypes.array,
  searchResult: PropTypes.array,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  searchMessage: PropTypes.string,
};

export default InfiniteScroll;
