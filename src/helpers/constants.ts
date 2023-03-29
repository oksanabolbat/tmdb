export const apiKeyTest = '33fb98c7645b470068638e684f61aee9';

export interface MovieData {
  id: string;
  adult: boolean;
  genres: number[];
  origLang: string;
  origTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  voteAvg: number;
  voteCount: number;
}
export interface MovieDataFromApi {
  id: string;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

interface ApiData {
  results: MovieDataFromApi[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Parameters {
  [key: string]: string | number | boolean | null;
}

export const convertMovies = (obj: ApiData) => {
  const moviesArr: MovieData[] = [];
  obj.results.map((el) =>
    moviesArr.push({
      adult: el.adult,
      id: String(el.id),
      genres: el.genre_ids,
      origLang: el.original_language,
      origTitle: el.original_title,
      overview: el.overview,
      popularity: el.popularity,
      posterPath: el.poster_path,
      releaseDate: el.release_date,
      title: el.title,
      voteAvg: el.vote_average,
      voteCount: el.vote_count,
    })
  );
  return moviesArr;
};
