// importing react route
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// importing components
import Home from './Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

// Routes component
const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
