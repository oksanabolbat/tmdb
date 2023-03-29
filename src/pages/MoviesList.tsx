import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getMovies, MovieCardProp } from '../helpers/api';
import { Parameters } from '../helpers/constants';
import MovieCard from '../components/MovieCard';

const MoviesList = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<MovieCardProp[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const apiParams: Parameters = {};
    const keys = searchParams.keys();
    console.log('loader movie list');
    for (const k of keys) {
      let val = searchParams.get(k);
      if (val && val !== null) {
        apiParams[k] = val;
      }
    }
    console.log(apiParams);
    getMovies(apiParams, true).then((res) =>
      //console.log(res.data)
      setMovies(res.data.results)
    );
  }, [searchParams]);
  console.log(movies);
  return (
    <>
      {movies && movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id as React.Key}>
              <MovieCard movieData={movie} />
            </li>
          ))}
        </ul>
      ) : (
        'This is test'
      )}
      Thi is test
      <br />
      <button
        onClick={() => {
          searchParams.set('page', '22');
          console.log(searchParams.get('page'));
          console.log(`/search/movies?${searchParams.toString()}`);
          navigate(`/search/movies?${searchParams.toString()}`);
        }}
      >
        next page
      </button>
    </>
  );
};
export default MoviesList;
