import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, json } from 'react-router-dom';

import { getMovies, MovieCardProp } from '../helpers/api';
import { parseSearchParams } from '../helpers/constants';
import MovieCard from '../components/MovieCard';
import { SearchSummaryProps } from '../helpers/searchConstants';
import SearchSummary from '../components/SearchSummary';

import { PaginationControl } from 'react-bootstrap-pagination-control';

const SearchMoviesList = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<MovieCardProp[]>([]);
  const [searchSummary, setSearchSummary] = useState<SearchSummaryProps>({
    total: 0,
    pages: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const apiParams = parseSearchParams(searchParams);

    getMovies(apiParams, true)
      .then((res) => {
        if (res) {
          setMovies(res.data.results);
          setSearchSummary({
            pages: res.data.total_pages < 500 ? res.data.total_pages : 500,
            total:
              res.data.total_results < 10000 ? res.data.total_results : 10000,
          });
        } else {
          console.log(res, 'res');
        }
      })
      .catch((err) => {
        throw json(
          { message: 'Could not find movies' },
          {
            status: 500,
          }
        );
      });
  }, [searchParams]);

  return (
    <>
      {movies && movies.length > 0 ? (
        <>
          <SearchSummary
            pages={searchSummary.pages}
            total={searchSummary.total}
          />
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
          <br />
          <PaginationControl
            page={Number(searchParams.get('page')) || 1}
            between={4}
            total={searchSummary.total}
            limit={20}
            changePage={(page) => {
              searchParams.set('page', String(page));
              navigate(`/search/movies?${searchParams.toString()}`);
            }}
            ellipsis={1}
          />
        </>
      ) : (
        <p className="px-5 opacity-75 col-11">
          Cann't find movies with such parameters. Please check your search
          criterias 🤔
        </p>
      )}
    </>
  );
};
export default SearchMoviesList;
