import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/home-page';

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    path: '/',
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <Navigate to='/' replace />,
      },
    ],
  },
]);
