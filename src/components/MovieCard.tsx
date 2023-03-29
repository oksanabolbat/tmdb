import { Link } from 'react-router-dom';

interface Props {
  movieData: { id: string; title: string };
}

const MovieCard: React.FC<Props> = (props) => {
  const movieLink = `/movie/${props.movieData.id}`;
  return (
    <div>
      <Link to={movieLink}>{props.movieData.title}</Link>
    </div>
  );
};
export default MovieCard;
