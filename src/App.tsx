import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Search from './pages/Search';
import RootLayout from './pages/Root';
import {
  action as searchAction,
  loader as searchLoader,
} from './components/SearchForm/SearchForm';
import MoviesList from './pages/MoviesList';
import MoviePage, { loader as moviePageLoader } from './pages/MoviePage';

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
          {
            path: 'movies',
            element: <MoviesList />,
          },
        ],
      },
      {
        path: '/movie/:movieId',
        element: <MoviePage />,
        loader: moviePageLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
