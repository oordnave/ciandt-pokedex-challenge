// make the imports
import { useState, useEffect } from 'react'

// declaring constants
const POKE_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=20'
const POKE_URL_SEARCH = 'https://pokeapi.co/api/v2/pokemon/'

// App component
function App() {
  // states
  // states for all the pokémons
  const [pokemons, setPokemons] = useState([])

  // state for the search query
  const [search, setSearch] = useState('')

  // state for the search result
  const [searchResult, setSearchResult] = useState([])

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
    let result = pokemons.find(pokemon => pokemon.name.toLowerCase() === search.toLowerCase())

    if(result) {
      console.log('pokemon found in the state: ', result)
    } else {
      console.log('pokémon not found in stored cache, making request for the api');
      getPokemons(POKE_URL_SEARCH, true, search)
    }
  }

  // make the request for the API
  // defines the default url as POKE_URL constant
  const getPokemons = (url = POKE_URL, isSearch = false, term = '') => {
    async function fetchData() {
      try {
        // make the request for the api, with limit of 20
        const response = await fetch(url + term.toLowerCase())
        
        console.log("url: ", url, "term: ", term)

        // convert the data to a json type
        const data = await response.json()

        console.log('the data is', data);

        // the concat method will be used later, when the user scroll the page
        if(isSearch) {
          // update state for the search result
          setSearchResult(data)
          // update state for the input
          setSearch('')
        } else {
          // to prevent mutate the array, spread operator was used
          setPokemons([...data.results])
        }

      } catch (err) {
        // change state for the search result, to show error in the search
        setSearchResult([]);

        // error handling
         console.log(err)
      }
    }

    // execute the function
    fetchData()
  }

  // effects
  // using to sync with external systems - such as API calls
  useEffect(getPokemons, [])

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
          <p>pokémon list</p>
          <ul>
            {pokemons.map((pokemon, index) => <li key={index}>{index} {pokemon.name}</li>)}
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
