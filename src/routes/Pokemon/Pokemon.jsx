// pokemon single component

// importing router Outlet
import { Outlet } from 'react-router-dom';

const Pokemon = () => {
  return (
    <div>
      <p>Single pokemon</p>
      <Outlet />
    </div>
  );
};

export default Pokemon;
