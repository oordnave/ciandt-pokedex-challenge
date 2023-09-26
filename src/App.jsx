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
      console.log(result)
    } else {
      console.log('pokémon not found in stored cache');
      getPokemons(POKE_URL_SEARCH, true, search)
      let teste = searchResult;
      console.log(teste)
    }
    // let result = pokemons.find(pokemon => pokemon.name === search)
    // console.log(result)



    // verify if the search exists in the current pokemon state
    // pokemons.find(pokemon => {
    //   pokemon.name === event.
    // })
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

        // if search is false, get pokémon data from start
        // the concat method was used, because it is the first rule in the react - not mutating directly the data
        isSearch !== true ? setPokemons(pokemons.concat(data.results)) : setSearchResult(searchResult.concat(data.results))

      } catch (err) {
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
          <ul>
            {pokemons.map((pokemon, index) => <li key={index}>{index} {pokemon.name}</li>)}
          </ul>
        </div>
        {searchResult.length}
      </section>
      <footer></footer>
   </>
  )
}

export default App
