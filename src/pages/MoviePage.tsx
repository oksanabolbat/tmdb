import { json, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import {
  getMovieDetails,
  MoviePageProps,
  CreditsProps,
  imgSrc,
} from '../helpers/api';
import Cast from '../components/Cast';
import BtnBack from '../components/UI/BtnBack';
import CardsHolder from '../components/UI/CardsHolder';
import Crew from '../components/Crew';
import MovieInfo from '../components/MovieInfo';

const MoviePage = () => {
  const movieData = useLoaderData() as [MoviePageProps, CreditsProps];

  const [movieDetails, credits] = movieData;

  const style = {
    backgroundImage:
      'url(' +
      imgSrc +
      'w1920_and_h800_multi_faces/' +
      movieDetails.backdrop_path +
      ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    paddingBottom: '0',
  };
  const shadowTextStyle = {
    textShadow: '1px 1px 1px #000, 0 0 1em #000, 0 0 0.2em #000',
    color: '#fff',
  };
  return (
    <div style={style}>
      <div style={{ backdropFilter: 'blur(10px)' }} className="w-100">
        <div className="container pb-5">
          <div className="row p-2 position-relative">
            <div className="col-3">
              <img
                src={`${imgSrc}w500/${movieDetails.poster_path}`}
                alt={`${movieDetails.title}`}
                className="img-fluid"
              />
            </div>
            <div className="col" style={shadowTextStyle}>
              <h1 className="bg-white bg-opacity-10 p-2">
                {movieDetails.title}
              </h1>
              <p>{movieDetails.tagline && <i>{movieDetails.tagline}</i>}</p>

              <MovieInfo movieDetails={movieDetails} />
            </div>
          </div>
          <div className="w-75 mx-auto">
            <p style={shadowTextStyle}>{movieDetails.overview}</p>
          </div>
          <h3 className="ms-5 mt-4" style={shadowTextStyle}>
            Cast
          </h3>
          <CardsHolder>
            <Cast cast={credits.cast} />
          </CardsHolder>
          <h3 className="ms-5 mt-4" style={shadowTextStyle}>
            Crew
          </h3>
          <CardsHolder>
            <Crew crew={credits.crew} />
          </CardsHolder>
          <BtnBack />
        </div>
      </div>
    </div>
  );
};
export default MoviePage;

export const loader = ({ params }: LoaderFunctionArgs) => {
  const movieData = getMovieDetails(params.movieId)
    .then((movieData) => movieData)
    .catch((err) => {
      throw json(
        { message: 'Something is incorrect', title: 'Error occured' },

        {
          status: 505,
        }
      );
    });

  return movieData;
};
