import GenresList from './GenresList';
import SortByList from './SortByList';
import { sortByValues } from '../../helpers/searchConstants';
import DateInputField from '../UI/DateInputField';
import LanguagesList from './LanguageList';
import { Form, redirect, useSearchParams } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import { convertSearchParams } from '../../helpers/api';
import { parseSearchParams } from '../../helpers/constants';
import { useState } from 'react';

interface Props {
  className: string;
}

const SearchForm: React.FC<Props> = (props) => {
  const [searchParams] = useSearchParams();
  const apiParams = parseSearchParams(searchParams);
  const [includeAdultDef, setIncludeAdultDef] = useState<string | undefined>(
    apiParams?.include_adult === 'true' ? 'true' : undefined
  );

  console.log('yo ', apiParams);
  const releaseDtGteDef = apiParams['release_date.gte'];
  const releaseDtLteDef = apiParams['release_date.lte'];

  console.log(includeAdultDef);
  const classes = `${props.className} `;
  return (
    <Form method="post" action="/search" className={classes}>
      <SortByList
        options={sortByValues}
        label="Sort By"
        selectedValue={apiParams.sort_by || sortByValues.popularityDesc.id}
        updateVal={() => {}}
        name="sort_by"
      />

      <GenresList
        name="with_genres"
        filterGenres={() => {}}
        withGenresDef={apiParams.with_genres || undefined}
      />

      <br />
      <div className="form-check my-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="adult"
          name="include_adult"
          checked={includeAdultDef === 'true'}
          onChange={(e) =>
            setIncludeAdultDef(e.target.checked ? 'true' : 'false')
          }
        />
        <label className="form-check-label" htmlFor="adult">
          Adults Only
        </label>
      </div>

      <LanguagesList
        defaultValue={apiParams['with_original_language'] || undefined}
        name="with_original_language"
      />

      <label htmlFor="avgRatingFrom" className="form-label">
        Average Rating From
      </label>
      <input
        id="avgRatingFrom"
        className="form-control"
        type="number"
        max={10}
        min={0}
        step={0.01}
        name="vote_average.gte"
        defaultValue={Number(apiParams['vote_average.gte']) || undefined}
      />

      <label htmlFor="avgRatingTo" className="form-label">
        Average Rating To
      </label>
      <input
        id="avgRatingTo"
        className="form-control"
        type="number"
        max={10}
        min={0}
        step={0.01}
        name="vote_average.lte"
        defaultValue={Number(apiParams['vote_average.lte']) || undefined}
      />

      <label htmlFor="releaseYear" className="form-label">
        Release Year
      </label>
      <input
        id="releaseYear"
        className="form-control mb-3"
        type="number"
        max={2045}
        min={1900}
        step={1}
        name="year"
        defaultValue={Number(apiParams.year) || undefined}
      />

      <DateInputField
        id="releaseDtGte"
        label="Release Date From"
        name="release_date.gte"
        defaultValue={
          releaseDtGteDef
            ? new Date(
                `${releaseDtGteDef.substring(2, 4)}-${releaseDtGteDef.substring(
                  0,
                  2
                )}-${releaseDtGteDef.substring(4)}`
              )
            : undefined
        }
      />
      <DateInputField
        id="releaseDtLte"
        label="To"
        name="release_date.lte"
        defaultValue={
          releaseDtLteDef
            ? new Date(
                `${releaseDtLteDef.substring(2, 4)}-${releaseDtLteDef.substring(
                  0,
                  2
                )}-${releaseDtLteDef.substring(4)}`
              )
            : undefined
        }
      />

      <button
        type="submit"
        data-bs-dismiss="offcanvas"
        className="btn btn-dark w-100 mt-3"
      >
        OK
      </button>
    </Form>
  );
};

export default SearchForm;

export async function action({ request }: { request: any; params: any }) {
  const data = await request.formData();
  console.log(data, request);
  let paramsObj = Object.fromEntries(data);
  console.log(paramsObj);

  paramsObj = convertSearchParams(paramsObj);

  return redirect(
    `/search/movies?${new URLSearchParams(paramsObj).toString()}`
  );
}
