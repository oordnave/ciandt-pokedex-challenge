// Logo component

// import image from assets
import logoPokedex from '../../../assets/pokedex-logo.png';

const Logo = () => {
  return (
    <div className='logo flex justify-center max-w mx-auto pb-10'>
      <img src={logoPokedex} alt='Pokédex' />
    </div>
  );
};

export default Logo;
