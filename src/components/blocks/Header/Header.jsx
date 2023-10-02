// Header component

// importing routing
import { Link, useLocation } from 'react-router-dom';

// importing the header, logo components
import HeaderElement from '../../elements/HeaderElement';
import Logo from '../Logo/Logo';

const Header = () => {
  // get the current location
  const currentRoute = useLocation();

  // console.log(
  //   `the current path is:`,
  //   currentRoute.pathname,
  //   '\nthe current search query is:',
  //   currentRoute.search,
  //   `\nthe current hash is:`,
  //   currentRoute.hash,
  // );

  return (
    <HeaderElement>
      <div className='buttons flex justify-end'>
        {currentRoute.pathname !== `/` ? (
          <div className='return-home p-2'>
            <Link to={`/`}>Return to Home</Link>
          </div>
        ) : (
          ''
        )}
        {currentRoute.pathname !== `/favorites` ? (
          <div className='favorites p-2'>
            <Link to={`/`}>Favorites</Link>
          </div>
        ) : (
          ''
        )}
        {currentRoute.pathname !== `/` ? (
          <div className='compare p-2'>
            <Link to={`/`}>Compare</Link>
          </div>
        ) : (
          ''
        )}
      </div>
      <Logo />
    </HeaderElement>
  );
};

export default Header;
