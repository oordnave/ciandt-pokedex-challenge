// pokemon info component
import { useState, useEffect } from 'react';
// import useParams
import { useParams } from 'react-router-dom';

// importing context``
import { usePokemonContext } from '../../context/PokemonContext';

// components
import Header from '../../components/blocks/Header/Header';
import { getPokemonFromApiById } from '../../api/api';

const PokemonInfo = () => {
  const { favorites, setFavorites } = usePokemonContext();

  // get the params from the url
  const { pokemonId } = useParams();

  // create state purely for this component
  const [pokemonData, setPokemonData] = useState(null); // State to store fetched Pokemon data

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

  // useEffect to make a request, and retrieve the pokémon
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // get response from api
        const response = await getPokemonFromApiById(pokemonId);

        // Set the fetched data into the state
        setPokemonData(response);

        // error handling
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        throw error;
      }
    };

    fetchPokemon();
  }, [pokemonId, setPokemonData]);

  return (
    <>
      <Header />
      <div className='text-center text-4xl pb-5'>
        <p className='text-bold text-blue-500 font-bold'>Pokémon Info</p>
      </div>
      {pokemonData ? (
        <>
          {console.log(`pokémonData is:`, pokemonData)}
          <div className='grid place-items-center'>
            {pokemonData.map((pokemon, index) => (
              <div className='card h-full' key={'num' + index}>
                <div className='w-full max-w-sm bg-white border border-gray-50 rounded-lg shadow dark:bg-gray-50 dark:border-gray-200'>
                  <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                  />
                  <div className='px-5 pb-5'>
                    <h1 className='text-6xl font-semibold tracking-tight text-gray-900 dark:text-black pb-4'>
                      <p className='capitalize'>{pokemon.name}</p>
                    </h1>
                    <div className='attributes text-black pb-4'>
                      {pokemon.stats.map((attribute, index) => (
                        <p key={'num' + index}>
                          {attribute.base_stat} {attribute.stat.name}
                        </p>
                      ))}
                    </div>
                    <div className='grid grid-cols-1 place-items-center'>
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
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default PokemonInfo;
