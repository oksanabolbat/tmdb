import { useLoaderData, useSearchParams } from 'react-router-dom';
import { MovieCardProp } from '../helpers/api';

import MoviesList from './UI/MoviesList';
import { getMoviesList } from '../helpers/api';

const Trending = () => {
  const [trendingWeek, trendingDay] = useLoaderData() as [
    MovieCardProp[],
    MovieCardProp[]
  ];
  return (
    <div>
      {trendingDay.length > 0 && (
        <MoviesList header="Trending Today" movies={trendingDay} />
      )}
      {trendingWeek.length > 0 && (
        <MoviesList header="Trending This Week" movies={trendingWeek} />
      )}
    </div>
  );
};

export default Trending;

export const loader = () => {
  const trendingWeek = getMoviesList('trending/movie/week').then(
    (res) => res.results
  );
  const trendingDay = getMoviesList('trending/movie/day').then(
    (res) => res.results
  );

  return Promise.all([trendingDay, trendingWeek]).then((values) => values);
};
