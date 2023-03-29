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
    }
  });

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
