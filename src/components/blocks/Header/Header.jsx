// Header component

// importing the header, logo components
import HeaderElement from '../../elements/HeaderElement';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <HeaderElement>
      <div className='buttons flex justify-end'>
        <div className='favorites p-2'>
          <a href=''>Favorites</a>
        </div>
        <div className='compare p-2'>
          <a href='' className=''>
            Compare
          </a>
        </div>
      </div>
      <Logo />
    </HeaderElement>
  );
};

export default Header;
