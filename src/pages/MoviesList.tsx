import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getMovies, MovieCardProp } from '../helpers/api';
import { parseSearchParams } from '../helpers/constants';
import MovieCard from '../components/MovieCard';
import { SearchSummaryProps } from '../helpers/searchConstants';
import SearchSummary from '../components/SearchSummary';

import { PaginationControl } from 'react-bootstrap-pagination-control';

const MoviesList = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<MovieCardProp[]>([]);
  const [searchSummary, setSearchSummary] = useState<SearchSummaryProps>({
    total: 0,
    pages: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const apiParams = parseSearchParams(searchParams);

    console.log(apiParams);
    getMovies(apiParams, true).then((res) => {
      console.log(res.data);
      setMovies(res.data.results);
      setSearchSummary({
        pages: res.data.total_pages,
        total: res.data.total_results,
      });
    });
  }, [searchParams]);
  return (
    <>
      <SearchSummary pages={searchSummary.pages} total={searchSummary.total} />
      {movies && movies.length > 0 ? (
        <ul className="row px-5 list-unstyled">
          {movies.map((movie) => (
            <li
              key={movie.id as React.Key}
              className="col-lg-3 col-md-4 col-sm-6 p-4"
            >
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
      <PaginationControl
        page={Number(searchParams.get('page')) || 1}
        between={4}
        total={250}
        limit={20}
        changePage={(page) => {
          searchParams.set('page', String(page));
          navigate(`/search/movies?${searchParams.toString()}`);
        }}
        ellipsis={1}
      />
    </>
  );
};
export default MoviesList;
