// importing react route
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// importing components
import Home from './Home/Home';
import Favorites from './Favorites/Favorites';
import PokemonInfo from './PokemonInfo/PokemonInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
  {
    path: '/compare',
    element: <Navigate to='/' />,
  },
  {
    path: '/pokemon',
    element: <Navigate to='/' />,
  },
  {
    path: '/pokemon/:pokemonId',
    element: <PokemonInfo />,
  },
]);

// Routes component
const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
