function App() {
  return (
    <>
      <header>
        <div className="buttons">
          <div className="favorites">
            <a href="">Favorites</a>
          </div>
          <div className="compare">
            <a href="">Compare</a>
          </div>
        </div>
        <div className="logo">
          <img src="" alt="" />
          <p>Pokédex</p>
        </div>
      </header>
      <section>
        <div className="search">
          <form action="">
            <input type="text" text="" />
          </form>
        </div>
        <div className="list-all-button">
          <button>
            List all Pokémons
          </button>
        </div>
        <div className="list-pokemon">
          <ul>
            <li></li>
          </ul>
        </div>
      </section>
      <footer></footer>
   </>
  )
}

export default App
