import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/pages/Home.jsx';
import Venues from './components/pages/Venues.jsx';
import VenueDetails from './components/pages/VenueDetails.jsx';
import Search from './components/pages/Search.jsx';
import Profile from './components/pages/Profile.jsx';
import CreateVenue from './components/pages/CreateVenue.jsx';
import ErrorPage from './components/shared/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/venues',
        element: <Venues />,
      },
      {
        path: 'venues/venue-details/:id',
        element: <VenueDetails />,
      },
      {
        path: '/search/:value',
        element: <Search />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/create-venue',
        element: <CreateVenue />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
