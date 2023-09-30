// favorite component
import { Link } from 'react-router-dom';

const Favorites = () => {
  return (
    <>
      <div>Favorites</div>
      <Link to={`/`}>Back to home</Link>
    </>
  );
};

export default Favorites;
