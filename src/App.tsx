import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Search from './pages/Search';
import Main from './pages/Main';
import RootLayout from './pages/Root';
import { action as searchAction } from './components/SearchForm/SearchForm';
import SearchMoviesList from './pages/SearchMoviesList';
import MoviePage, { loader as moviePageLoader } from './pages/MoviePage';
import PersonPage, { loader as personLoader } from './pages/PersonPage';
import ErrorPage from './pages/ErrorPage';
import { loader as mainLoader } from './pages/Main';
import { loader as trendingLoader } from './components/Trending';
import Trending from './components/Trending';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <Main />, loader: mainLoader },
      {
        path: 'search',
        element: <Search />,
        action: searchAction,

        children: [
          { path: '', element: <Trending />, loader: trendingLoader },
          {
            path: 'movies',
            element: <SearchMoviesList />,
          },
        ],
      },
      {
        path: '/movie/:movieId',
        element: <MoviePage />,
        loader: moviePageLoader,
      },
      {
        path: '/person/:personId',
        element: <PersonPage />,
        loader: personLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
