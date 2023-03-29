import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getMovies } from '../helpers/api';
import { SearchParams } from '../helpers/searchConstants';

const MoviesList = () => {
  const [searchParams] = useSearchParams();
  console.log('type ', typeof searchParams);
  console.log(searchParams.get('vote_average.lte'));

  const navigate = useNavigate();

  useEffect(() => {
    const apiParams: { [key: string]: string | number | boolean | null } = {};
    const keys = searchParams.keys();
    console.log('loader movie list');
    for (const k of keys) {
      let val = searchParams.get(k);
      if (val && val !== null) {
        apiParams[k] = val;
      }
    }
    console.log(apiParams);
    getMovies(apiParams, true).then((res) => console.log(res.data));
  }, [searchParams]);

  return (
    <>
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

export async function loader({
  request,
  params,
}: {
  request: any;
  params: SearchParams;
}) {
  console.log('request ', request.url);
  console.log('params', params);
  console.log(window.location.search);

  return null;

  //     const apiParams: { [key: string]: string | number | boolean } = {};

  //   const keys = params && params.keys();
  //   for (const k of keys) {
  //     let val = params?.get(k);
  //     if (val && val !== null) {
  //       apiParams[k] = val;
  //     }
  //   }
  //   console.log(apiParams);
  //   getMovies(apiParams, true).then((res) => {
  //     console.log(res.data);
  //     return res;
  //   });
}
