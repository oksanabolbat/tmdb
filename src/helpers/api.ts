import axios from 'axios';

import { Parameters } from './constants';

export const apiKey = '33fb98c7645b470068638e684f61aee9';
const apiLink = 'https://api.themoviedb.org/3/';
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
      console.log('API ', apiParams);
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
  vote_average: number;
  vote_count: number;
}

export const getMovieDetails = (movieId: string | undefined) => {
  return movieId
    ? axios
        .get(`${apiLink}movie/${movieId}`, {
          params: {
            api_key: apiKey,
          },
        })
        .then((res) => res.data)
    : {};
};
