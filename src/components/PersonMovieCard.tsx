import { Link } from 'react-router-dom';
import { imgSrc, PersonKnownAsProps } from '../helpers/api';
import { defaultNoPosterMovieSrc } from '../helpers/constants';
interface Props {
  movie: PersonKnownAsProps;
}
const PersonMovieCard: React.FC<Props> = (props) => {
  const about = `${props.movie.title}, ${props.movie.release_date}`;
  return (
    <Link
      to={`/movie/${props.movie.id}`}
      className=" min-vw-25 m-3 text-decoration-none link-dark text-center"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={about}
    >
      <img
        src={
          `${imgSrc}/w220_and_h330_face/${props.movie.poster_path}` ||
          defaultNoPosterMovieSrc
        }
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={about}
      />

      <div className="card-body">
        <h5 className="card-title">{props.movie.title}</h5>
        <p className="card-text">{props.movie.release_date}</p>
        <p className="card-text">popularity: {props.movie.popularity}</p>
      </div>
    </Link>
  );
};

export default PersonMovieCard;
