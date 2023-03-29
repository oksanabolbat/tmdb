import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Search from './pages/Search';
import RootLayout from './pages/Root';
import {
  action as searchAction,
  loader as searchLoader,
} from './components/SearchForm/SearchForm';
import MoviesList, { loader as loaderMoviesList } from './pages/MoviesList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <p>Main</p> },
      {
        path: 'search',
        element: <Search />,
        action: searchAction,
        loader: searchLoader,
        children: [
          { path: 'movies', element: <MoviesList />, loader: loaderMoviesList },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
