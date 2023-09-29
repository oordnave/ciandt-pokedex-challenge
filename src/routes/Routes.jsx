// importing react route
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// importing components
import Home from './Home/Home';
import Favorites from './Favorites/Favorites';
import Compare from './Compare/Compare';

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
    element: <Compare />,
  },
]);

// Routes component
const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
