// make the imports
import { useState, useEffect } from 'react'

// declaring constants
const POKE_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=20'
const POKE_URL_SEARCH = 'https://pokeapi.co/api/v2/pokemon/'

// App component
function App() {
  // states
  // state for all the pokémons
  const [allPokemons, setAllPokemons] = useState([])

  // state for the search query
  const [search, setSearch] = useState('')

  // state for the search result
  const [searchResult, setSearchResult] = useState([])

  // state for the infinite scroll
  const [message, setMessage] = useState("")
  const [isLoading, setLoading] = useState(true)

  // handlers
  // test handler to reference
  const testClick = () => console.log('working');

  // handler to the search input
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  // handler to perform a search
  const searchPokemon = (event) => {
    // preventing the default behaviour from the form
    event.preventDefault();

    // first, verify in the pokemons state if the pokemon exists
    let result = allPokemons.find(pokemon => pokemon.name.toLowerCase() === search.toLowerCase())

    // conditionals if result exists, if not search in the API
    if(result) {
      console.log('pokemon found in the state: ', result)
    } else {
      console.log('pokémon not found in stored cache, making request for the api');
      getPokemons(POKE_URL_SEARCH, true, search)
    }
  }

  // get all the pokemon data
  const getPokemonData = async (length) => {
    // defining an empty array to store the promises
    const promiseArray = [];

    // populate the array with promises
    // this time, we make the requests for the api based on the id from the pokemon
    for (let i = length; i < length + 20; i++) {
      // pushing the data to update the array for each offset
      promiseArray.push(
        (await fetch(POKE_URL_SEARCH + `${i}`)).json()
      )

    }

    // wait for the promise array to resolve
    const allPokemonData = await Promise.all(promiseArray);

    // return the data from each pokemon 
    return allPokemonData.map(pokemon => {
      return {
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
        stats: pokemon.stats
      }
    })

  }

  // defining the function to be passed into the useEffect hook
  const getPokemonsByScroll = () => {

    // fetching the data and updating the state
    const fetchData = async () => {
      setLoading(true)
      setMessage("loading")
      const response = await getPokemonData(1);
      setAllPokemons(response)
      setLoading(false)
    }

    fetchData()
  }

  // effects
  // using to get the pokemon data
  useEffect(getPokemonsByScroll, [])

  // Using the onscroll property
  // To verify the offset from the user, and make the API call while scrolling
  window.onscroll = () => {
    if (allPokemons.length > 70) {
      setMessage("Reached end of the list!!");
      return;
    }
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setMessage("Loading...");
      setLoading(true);
      getPokemonData(allPokemons.length).then((newPokemons) => {
        setAllPokemons([...allPokemons, ...newPokemons]);
        setLoading(false);
      });
    }
  };

  return (
    <>
      <header>
        <div className="buttons">
          <div className="favorites">
            <a href="">Favorites</a>
          </div>
          <div className="compare">
            <a href="" className="text-3xl">Compare</a>
          </div>
        </div>
        <div className="logo">
          <img src="" alt="" />
          <p>Pokédex</p>
        </div>
      </header>
      <section>
        <div className="search">
          <form action="" onSubmit={searchPokemon}>
            <input type="text" value={search} onChange={handleSearch} />
          </form>
        </div>
        <div className="list-all-button" onClick={testClick}>
          <button>
            List all Pokémons
          </button>
        </div>
        <div className="list-pokemon">
          <p>pokémon list with infinite scroll</p>
          <ul>
            {allPokemons.map((pokemon, index) => (
              <li className="card" key={"num" + index}>
                <img src={pokemon.sprite} alt={pokemon.name} />
                <h1 className="pokemonName"> {pokemon.name} </h1>
                {console.log(pokemon)}
                {pokemon.stats.map((attribute, index) => <p key={"num" + index}>{attribute.base_stat} {attribute.stat.name}</p>)}
              </li>
            ))}
            {isLoading && <h1 className="pokemonName">{message}</h1>}
          </ul>
        </div>
        <div className="search-result">
          <p>Search Result: {(searchResult.length !== 0 && searchResult) ? searchResult.name : 'empty result'}</p>
          {searchResult.length !== 0 ? console.log('the search result is', searchResult) : console.log('empty result state')}
        </div>
      </section>
      <footer></footer>
   </>
  )
}

export default App
