import axios from 'axios';

import { Parameters } from './constants';

export const apiKey = '33fb98c7645b470068638e684f61aee9';
const apiLink = 'https://api.themoviedb.org/3/';
export const imgSrc = 'https://image.tmdb.org/t/p/';
export const language = 'en-US';
export interface Genres {
  id: number;
  name: string;
}
export const getGenres = (): Promise<Genres[]> => {
  return axios
    .get(`${apiLink}genre/movie/list`, {
      params: {
        api_key: apiKey,
        language,
      },
    })
    .then((response) => response.data.genres);
};

export const getLanguages = () => {
  return axios.get(`${apiLink}configuration/languages`, {
    params: {
      api_key: apiKey,
    },
  });
};

export const convertSearchParams = (
  enteredParams: Parameters,
  needApi?: boolean
) => {
  let apiParams: Parameters = {};
  if (needApi) apiParams.api_key = apiKey;

  Object.keys(enteredParams).forEach((key) => {
    if (enteredParams[key]) {
      apiParams[key] = enteredParams[key];
    }
  });
  if (apiParams.include_adult === 'on') apiParams.include_adult = 'true';
  return apiParams;
};

export const getMovies = (searchParams: Parameters, apiKeyNeeded?: boolean) => {
  if (apiKeyNeeded) {
    searchParams.api_key = apiKey;
  }
  return axios.get(`${apiLink}discover/movie`, {
    params: searchParams,
  });
};

export const getMoviesList = (
  searchPath: string,
  additionalParams?: Object
) => {
  const params = { ...additionalParams, api_key: apiKey };

  return axios

    .get(`${apiLink}${searchPath}`, { params: params })
    .then((res) => res.data);
};
export interface MovieCardProp {
  id: string;
  title: string;
  adult?: boolean;
  genre_ids?: number[];
  original_language?: string;
  original_title?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface MoviePageProps {
  id: string;
  title: string;
  adult: boolean;
  backdrop_path: string | null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  ibdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string;
  production_companies: {
    name: string;
    id: number;
    logo_path: string | null;
    orig_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  spoken_languages: { iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}
export interface CastProps {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  genger: number | null;
  id: number;
  known_for_departament: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface CrewProps {
  adult: boolean;
  credit_id: number;
  departament: string;
  genger: number | null;
  id: number;
  job: string;
  known_for_departament: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}
export interface CreditsProps {
  cast: CastProps[];
  crew: CrewProps[];
}
export interface DiscoverMoviesProps {
  popular: MovieCardProp[];
  latest: MovieCardProp[];
  nowPlaying: MovieCardProp[];
  topRated: MovieCardProp[];
  upcoming: MovieCardProp[];
}
export const getMovieDetails = (movieId: string | undefined) => {
  if (movieId) {
    const movieDetails = axios
      .get(`${apiLink}movie/${movieId}`, {
        params: {
          api_key: apiKey,
        },
      })
      .then((res) => res.data);

    const credits = axios
      .get(`${apiLink}movie/${movieId}/credits`, {
        params: { api_key: apiKey },
      })
      .then((res) => res.data);

    return Promise.all([movieDetails, credits]).then(
      ([movieDetails, credits]) => [movieDetails, credits]
    );
  }
  return Promise.resolve(null);
};
export interface PersonKnownAsProps {
  adult: boolean;
  poster_path: string | null;
  release_date: string;
  genre_ids: number[];
  id: number;
  title: string;
  popularity: number;
}
export interface PersonProps {
  birthday: string | null;
  known_for_department: string;
  deathday: null | string;
  id: number;
  name: string;
  genger: number;
  biography: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: string;
  homepage: string | null;
  also_known_as?: string[];
  known_as?: PersonKnownAsProps[];
}

export const getPersonData = async (personId: number): Promise<PersonProps> => {
  const personDataPromise = await axios.get(`${apiLink}person/${personId}`, {
    params: {
      api_key: apiKey,
    },
  });
  const personData: PersonProps = personDataPromise.data;

  let personDataImdbResponse;
  if (personData.imdb_id) {
    personDataImdbResponse = await axios.get(
      `${apiLink}find/${personData.imdb_id}`,
      {
        params: {
          api_key: apiKey,
          external_source: 'imdb_id',
        },
      }
    );
    personData.known_as =
      personDataImdbResponse.data.person_results[0].known_for;
  }
  return personData;
};
