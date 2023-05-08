import { useLoaderData } from 'react-router-dom';

import { getMoviesList } from '../helpers/api';
import { DiscoverMoviesProps } from '../helpers/api';
import MoviesList from '../components/UI/MoviesList';

const Main = () => {
  const movies = useLoaderData() as DiscoverMoviesProps;

  return (
    <div className="container mt-5 pb-5">
      {movies.popular?.length > 0 && (
        <MoviesList header="Popular Movies" movies={movies.popular} />
      )}
      {movies.latest?.length > 0 && (
        <MoviesList header="Latest Movies" movies={movies.latest} />
      )}
      {movies.nowPlaying?.length > 0 && (
        <MoviesList header="Now playing" movies={movies.nowPlaying} />
      )}
      {movies.topRated?.length > 0 && (
        <MoviesList header="Top Rated Movies" movies={movies.topRated} />
      )}
      {movies.upcoming?.length > 0 && (
        <MoviesList header="Upcoming Movies" movies={movies.upcoming} />
      )}
    </div>
  );
};

export default Main;

export const loader = () => {
  const popular = getMoviesList('movie/popular')
    .then((res) => res)
    .catch(() => []);

  const latest = getMoviesList('movie/latest')
    .then((res) => res)
    .catch(() => []);

  const nowPlaying = getMoviesList('movie/now_playing')
    .then((res) => res)
    .catch(() => []);

  const topRated = getMoviesList('movie/top_rated')
    .then((res) => res)
    .catch(() => []);
  const upcoming = getMoviesList('movie/upcoming')
    .then((res) => res)
    .catch(() => []);

  return Promise.all([popular, latest, nowPlaying, topRated, upcoming]).then(
    (values) => {
      return {
        popular: values[0].results || [],
        latest: values[1].results || [],
        nowPlaying: values[2].results || [],
        topRated: values[3].results || [],
        upcoming: values[4].results || [],
      };
    }
  );
};
