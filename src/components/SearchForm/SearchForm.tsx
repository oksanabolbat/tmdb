import GenresList from './GenresList';
import SortByList from './SortByList';
import {
  sortByValues,
  formatDateToSearchParam,
} from '../../helpers/searchConstants';
import DateInputField from '../UI/DateInputField';
import LanguagesList from './LanguageList';
import {
  Form,
  redirect,
  useLoaderData,
  useSearchParams,
} from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import { convertSearchParams } from '../../helpers/api';
import { useEffect } from 'react';

const SearchForm = () => {
  const avgRatingFromDef = '5';
  const avgRatingToDef = '8';

  return (
    <Form method="post" action="/search">
      <GenresList name="genres" filterGenres={() => {}} />
      <SortByList
        options={sortByValues}
        label="Sort By"
        selectedValue={sortByValues.popularityDesc.id}
        updateVal={() => {}}
        name="sort_by"
      />
      <label className="form-check-label" htmlFor="adult">
        Adults Only
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        defaultChecked
        id="adult"
        name="adult"
      />

      <LanguagesList name="language" />

      <label htmlFor="avgRatingFrom">Average Rating From</label>
      <input
        id="avgRatingFrom"
        type="number"
        max={10}
        min={0}
        step={0.01}
        name="vote_average.gte"
        defaultValue={Number(avgRatingFromDef) || ''}
      />

      <label htmlFor="avgRatingTo">Average Rating To</label>
      <input
        id="avgRatingTo"
        type="number"
        max={10}
        min={0}
        step={0.01}
        name="vote_average.lte"
        defaultValue={Number(avgRatingToDef) || ''}
      />

      <label htmlFor="releaseYear">Release Year</label>
      <input
        id="releaseYear"
        type="number"
        max={2045}
        min={1900}
        step={1}
        name="year"
      />

      <DateInputField
        id="releaseDtGte"
        label="Release Date From"
        name="release_date.gte"
      />
      <DateInputField id="releaseDtLte" label="To" name="release_date.lte" />

      <button type="submit">ok</button>
    </Form>
  );
};

export default SearchForm;

export async function loader({
  request,
  params,
}: {
  request: any;
  params: any;
}) {
  let avgRatingFromDef: string | null = '';
  let avgRatingToDef: string | null = '';
  console.log(new URL(request.url).searchParams.get('page'));
  if (request.url) {
    // avgRatingFromDef = request.url.get('vote_average.gte');
    // avgRatingToDef = request.url.get('vote_average.lte');
    console.log(request.url);
  }

  return { avgRatingFromDef, avgRatingToDef };
}

export async function action({
  request,
  params,
}: {
  request: any;
  params: any;
}) {
  const data = await request.formData();
  console.log(data, request);
  let paramsObj = Object.fromEntries(data);

  paramsObj.adult = 'true' ? paramsObj.adult === 'on' : 'false';
  //

  if (paramsObj['release_date.gte']) {
    paramsObj['release_date.gte'] = formatDateToSearchParam(
      paramsObj['release_date.gte']
    );
  }

  if (paramsObj['release_date.lte']) {
    paramsObj['release_date.lte'] = formatDateToSearchParam(
      paramsObj['release_date.lte']
    );
  }

  console.log(paramsObj);
  paramsObj = convertSearchParams(paramsObj);

  return redirect(
    `/search/movies?${new URLSearchParams(paramsObj).toString()}`
  );
}
