import { Link } from 'react-router-dom';
import { MovieCardProp } from '../helpers/api';
interface Props {
  movieData: MovieCardProp;
}

const MovieCard: React.FC<Props> = (props) => {
  const movieId = props.movieData.id;
  const movie = props.movieData;

  return (
    <div className="card">
      <Link to={`/movie/${movieId}`}>
        <img
          src={
            movie.poster_path?.length
              ? `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`
              : 'https://i.pinimg.com/564x/bf/d6/cb/bfd6cb06db7f1597d663cf87d314e241.jpg'
          }
          alt={`${movie.title}`}
          className="card-img-top"
          data-toggle="tooltip"
          data-placement="bottom"
          title={movie.overview || undefined}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">{movie?.release_date}</p>
      </div>
    </div>
  );
};
export default MovieCard;
