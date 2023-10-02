// Infinite scroll component

// Importing Link from routes
import { Link } from 'react-router-dom';

// Importing prop-types for prop validation
import PropTypes from 'prop-types';

const InfiniteScroll = ({
  allPokemons,
  searchResult,
  isLoading,
  message,
  toggleFavorite,
  favorites,
}) => {
  // empty array to populate with the conditional
  let pokemonList = [];

  // conditional to switch between states
  searchResult.length !== 0 ? (pokemonList = searchResult) : (pokemonList = allPokemons);

  return (
    <div className='list-pokemon'>
      <ul className='grid p-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {pokemonList.map((pokemon, index) => (
          <li className='card' key={'num' + index}>
            <div className='w-full max-w-sm bg-white border border-gray-50 rounded-lg shadow dark:bg-gray-50 dark:border-gray-200'>
              <Link
                to={`pokemon/${index + 1}`}
                className='transition-opacity duration:1500 ease-out hover:opacity-80'
              >
                <img src={pokemon.artwork} alt={pokemon.name} />
              </Link>
              <div className='px-5 pb-5'>
                <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-black pb-4'>
                  <Link to={`pokemon/${index + 1}`} className='capitalize'>
                    {pokemon.name}
                  </Link>
                </h5>
                <div className='attributes text-black pb-4'>
                  {pokemon.stats.map((attribute, index) => (
                    <p key={'num' + index}>
                      {attribute.base_stat} {attribute.stat.name}
                    </p>
                  ))}
                </div>
                <div className='flex items-center justify-between'>
                  <Link
                    to={`pokemon/${index + 1}`}
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Link to the pokemon
                  </Link>
                  <a
                    href=''
                    className={
                      favorites.includes(pokemon.name)
                        ? 'text-white ml-2 bg-red-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:be-green-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        : 'text-white ml-2 bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(pokemon.name);
                    }}
                  >
                    {favorites.includes(pokemon.name)
                      ? 'Remove from Favorites'
                      : 'Add to Favorites'}
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isLoading ? <p>{message}</p> : <p>{message}</p>}
      <div
        className={
          isLoading
            ? 'pokemonName text-center p-14 text-4xl font-bold text-white bg-green-400'
            : 'pokemonName text-center p-14 text-4xl font-bold text-white bg-red-400'
        }
      >
        {message}
      </div>
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
  toggleFavorite: PropTypes.func,
  favorites: PropTypes.array,
};

export default InfiniteScroll;
