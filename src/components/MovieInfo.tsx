import MovieDetail from './UI/MovieDetail';
import LinkMovieDetail from './UI/LinkMovieDetail';
import { MoviePageProps } from '../helpers/api';

interface Props {
  movieDetails: MoviePageProps;
}

const MovieInfo: React.FC<Props> = (props) => {
  const movieDetails = props.movieDetails;
  return (
    <>
      <MovieDetail valName="Original Title" val={movieDetails.original_title} />
      <MovieDetail valName="Status" val={movieDetails.status} />
      <MovieDetail valName="Release Date " val={movieDetails.release_date} />
      {movieDetails.spoken_languages.length > 0 && (
        <p>
          <strong>Spoken languages </strong>
          {movieDetails.spoken_languages.map((el) => (
            <span key={el.iso_639_1}>{el.name} </span>
          ))}
        </p>
      )}

      <MovieDetail
        valName="Vote Average"
        val={
          movieDetails.vote_average !== 0
            ? movieDetails.vote_average.toPrecision(2)
            : undefined
        }
      />
      <MovieDetail
        valName="Vote Count"
        val={
          movieDetails.vote_count !== 0 ? movieDetails.vote_count : undefined
        }
      />
      <MovieDetail
        valName="Budget"
        val={movieDetails.budget.toLocaleString()}
        currency={true}
      />
      <MovieDetail
        valName="Revenue"
        val={movieDetails.revenue.toLocaleString()}
        currency={true}
      />

      <LinkMovieDetail
        valName="Homepage"
        val={movieDetails.title}
        linkAddress={movieDetails.homepage}
      />
      <MovieDetail valName="Imdb" val={movieDetails.ibdb_id} />
      {movieDetails.genres.length > 0 && (
        <p>
          <strong> Genres:</strong>{' '}
          {movieDetails.genres.map((g) => (
            <span key={g.id}>{g.name} </span>
          ))}
        </p>
      )}
    </>
  );
};

export default MovieInfo;
