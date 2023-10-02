// pokemon info component
// import useParams
import { useParams } from 'react-router-dom';

// components
import Header from '../../components/blocks/Header/Header';

const PokemonInfo = () => {
  let { pokemonId } = useParams();

  console.log('the id from the route is:', { pokemonId });

  return (
    <>
      <Header />
      <div>Pokémon Exists! Id: {pokemonId}</div>
    </>
  );
};

export default PokemonInfo;
