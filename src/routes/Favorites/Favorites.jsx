// favorite componenV

// importing react components
import { useState, useEffect } from 'react';

// importing the context
import { usePokemonContext } from '../../context/PokemonContext';

// importing link from react-router
import { Link } from 'react-router-dom';

// components
import Header from '../../components/blocks/Header/Header';

const Favorites = () => {
  // states from useContext
  const { favorites, setFavorites } = usePokemonContext();

  // specific state for the route
  const [filtered, setFiltered] = useState([]);

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

    // Update the filtered state by filtering out the removed Pokémon
    const updatedFiltered = filtered.filter((pokemon) => pokemon.name !== pokemonName);
    setFiltered(updatedFiltered);
  };

  // function to save the favorite pokémon into localStorage
  const saveFavoritesToLocalStorage = (favorites) => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  };

  // useEffect to fetch the allPokemon data from localStorage
  useEffect(() => {
    // Function to fetch data from localStorage
    const getSavedDataFromLocalStorage = () => {
      try {
        // get all pokemons from local storage
        const allPokemonsFromLocalstorage = JSON.parse(localStorage.getItem('allPokemons'));

        console.log('allPokemonsFromLocalstorage is:', allPokemonsFromLocalstorage);

        // getting all favorites from local storage
        const savedFavorites = localStorage.getItem('favorites');

        // if both stores exists
        if (savedFavorites !== null && allPokemonsFromLocalstorage !== null) {
          console.log('favorites data in storage:', JSON.parse(savedFavorites));

          // save the pokemon data into the favorites state
          const filteredPokemons = allPokemonsFromLocalstorage.filter((pokemon) =>
            savedFavorites.includes(pokemon.name),
          );

          // printing the result
          console.log('filtered from the favorites storage:', filteredPokemons);

          // populating the state
          setFiltered(filteredPokemons);
        } else {
          // populate the state
        }
      } catch (error) {
        console.error('Error retrieving data from localStorage:', error);
      }
    };

    // Fetch data from localStorage when the component mounts
    getSavedDataFromLocalStorage();
  }, []);

  return (
    <>
      <Header />
      <div className='text-center text-4xl pb-5'>
        <p className='text-bold text-blue-500 font-bold'>Favorites</p>
      </div>
      {filtered.length !== 0 ? (
        <>
          <div className='list-pokemon'>
            <ul className='grid p-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4 place-items-stretch'>
              {filtered.map((pokemon, index) => (
                <li className='card h-full' key={'num' + index}>
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
                      <div className='grid grid-cols-2'>
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
                              ? 'text-white h-full ml-2 bg-red-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:be-green-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                              : 'text-white h-full ml-2 bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(pokemon.name);
                          }}
                        >
                          {favorites.includes(pokemon.name) ? 'Remove Favorite' : 'Add Favorite'}
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className='resultSearch text-center p-14 text-4xl font-bold text-white bg-red-400'>
            No Favorites Stored.
          </div>
        </>
      )}
    </>
  );
};

export default Favorites;
