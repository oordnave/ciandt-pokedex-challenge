// favorite component
import { Link } from 'react-router-dom';

// components
import Header from '../../components/blocks/Header/Header';

const Favorites = () => {
  return (
    <>
      <Header />
      <div>Favorites</div>
      <Link to={`/`}>Return to home</Link>
    </>
  );
};

export default Favorites;
