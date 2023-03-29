import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { getMovieDetails, MoviePageProps } from '../helpers/api';

const MoviePage = () => {
  const movieData = useLoaderData() as MoviePageProps;
  console.log('move id from the movie page ', movieData);
  return <div>{movieData.title}</div>;
};
export default MoviePage;

export const loader = ({ params }: LoaderFunctionArgs) => {
  console.log(params.movieId);
  return getMovieDetails(params.movieId);
};
