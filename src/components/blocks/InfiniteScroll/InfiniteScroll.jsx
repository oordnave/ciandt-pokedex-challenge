const InfiniteScroll = ({ allPokemons, isLoading, message }) => {
  return (
    <div className='list-pokemon'>
      <div>
        <h1>pokémon list with infinite scroll</h1>
        <p>Total Pokemons: {allPokemons.length}</p>
      </div>
      <ul>
        {allPokemons.map((pokemon, index) => (
          <li className='card' key={'num' + index}>
            <h1 className='pokemonName'> {pokemon.name}</h1>
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

export default InfiniteScroll;
