// Header component

// importing routing
import { Link } from 'react-router-dom';

// importing the header, logo components
import HeaderElement from '../../elements/HeaderElement';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <HeaderElement>
      <div className='buttons flex justify-end'>
        <div className='return-home p-2'>
          <Link to={`/`}>Return to Home</Link>
        </div>
        <div className='favorites p-2'>
          <Link to={`/favorites`}>Favorites</Link>
        </div>
        <div className='compare p-2'>
          <Link to={`/compare`}>Compare</Link>
        </div>
      </div>
      <Logo />
    </HeaderElement>
  );
};

export default Header;
