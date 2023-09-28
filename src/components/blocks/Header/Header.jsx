// Header component
import HeaderElement from '../../elements/HeaderElement';

const Header = () => {
  return (
    <HeaderElement>
      <div className='buttons'>
        <div className='favorites'>
          <a href=''>Favorites</a>
        </div>
        <div className='compare'>
          <a href='' className='text-3xl'>
            Compare
          </a>
        </div>
      </div>
      <div className='logo'>
        <img src='' alt='' />
        <p>Pokédex</p>
      </div>
    </HeaderElement>
  );
};

export default Header;
