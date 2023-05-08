import CardsHolder from './CardsHolder';
import MovieCard from '../MovieCard';
import { MovieCardProp } from '../../helpers/api';

interface Props {
  header: string;
  movies: MovieCardProp[];
}

const MoviesList: React.FC<Props> = (props) => {
  return (
    <>
      <h2 className="my-4 text-center text-secondary">{props.header}</h2>
      <CardsHolder>
        {props.movies.map((m) => (
          <MovieCard movieData={m} key={m.id} isList={true} />
        ))}
      </CardsHolder>
    </>
  );
};

export default MoviesList;
