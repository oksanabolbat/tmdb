import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { getMovieDetails, MoviePageProps } from '../helpers/api';

const MoviePage = () => {
  const movieData = useLoaderData() as MoviePageProps;

  return (
    <div className="card">
      <img
        src={`${movieData.poster_path}`}
        alt={`${movieData.title}`}
        className="card-img-top"
      />

      <div className="card-body">
        <h5 className="card-title">{movieData.title}</h5>
        <p className="card-text">{movieData.overview}</p>
      </div>
    </div>
  );
};
export default MoviePage;

export const loader = ({ params }: LoaderFunctionArgs) => {
  console.log(params.movieId);
  return getMovieDetails(params.movieId);
};
