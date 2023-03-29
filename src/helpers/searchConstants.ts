import { URLSearchParams } from 'url';
import { apiKey } from './api';

const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

export interface SearchParams {
  apiKey?: string;
  language?: string;
  sortBy?: string;
  year?: number;
  releaseDtGte?: string;
  releaseDtLte?: string;
  voteAvgGte?: string;
  voteAvgLte?: string;
  genres?: string;
  withLanguage?: string;
  incAdults?: boolean;
  page?: number;
}

export const getDefaultSearchParams = (): SearchParams => ({
  apiKey: apiKey,
});

export const sortByValues = {
  popularityAsc: { id: 'popularity.asc', name: 'Popularity ⬆' },
  popularityDesc: { id: 'popularity.desc', name: 'Popularity ⬇' },
  releaseDateAsc: { id: 'release_date.asc', name: 'Release Date ⬆' },
  releaseDateDesc: { id: 'release_date.desc', name: 'Release Date ⬇' },
  revenueAsc: { id: 'revenue.asc', name: 'Revenue ⬆' },
  revenueDesc: { id: 'revenue.desc', name: 'Revenue ⬇' },
  primaryReleaseDateAsc: {
    id: 'primary_release_date.asc',
    name: 'Primary Release Date ⬆',
  },
  primaryReleaseDateDesc: {
    id: 'primary_release_date.desc',
    name: 'Primary Release Date ⬇',
  },
  originalTitltAZ: { id: 'origanal_title.asc', name: 'Original Title (A-Z)' },
  originalTitltZA: { id: 'origanal_title.desc', name: 'Original Title (Z-A)' },
  voteAvgAsc: { id: 'vote_average.asc', name: 'Vote Average ⬆' },
  voteAvgDesc: { id: 'vote_average.desc', name: 'Vote Average ⬇' },
  voteCountAsc: { id: 'vote_count.asc', name: 'Vote Count ⬆' },
  voteCountDesc: { id: 'vote_count.desc', name: 'Vote Average ⬇' },
};

export type SortByValues = typeof sortByValues;

export const formatDateToSearchParam = (d: string) => {
  //return d ? String(d.getDate()) + d.getMonth() + d.getFullYear() : '';
  return d.replaceAll('.', '');
  // ? (d.getDate() > 9 ? String(d.getDate()) : '0' + String(d.getDate())) +
  //     months[d.getMonth()] +
  //     d.getFullYear()
  // : '';
};

export const convertSearchString = (searchParams: URLSearchParams) => {
  const apiParams: { [key: string]: string | number | boolean | null } = {};
  const keys = searchParams.keys();

  for (const k of keys) {
    let val = searchParams.get(k);
    if (val && val !== null) {
      apiParams[k] = val;
    }
  }

  return apiParams;
};
