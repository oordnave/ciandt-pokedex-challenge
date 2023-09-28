// Header component

// importing the header, logo components
import HeaderElement from '../../elements/HeaderElement';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <HeaderElement>
      <Logo />
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
    </HeaderElement>
  );
};

export default Header;
