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
  const [genres, setGenres] = useState(apiParams.with_genres || '');
  const [includeAdultDef, setIncludeAdultDef] = useState<string | undefined>(
    apiParams?.include_adult === 'true' ? 'true' : undefined
  );
  const [sortByDef, setSortByDef] = useState<string>(
    apiParams.sort_by || sortByValues.popularityDesc.id
  );
  const [languageDef, setLanguageDef] = useState(
    apiParams['with_original_language'] || undefined
  );
  const [avgRatingFromDef, setAvgRatingFromDef] = useState<number | ''>(
    Number(apiParams['vote_average.gte']) || ''
  );
  const [avgRatingToDef, setAvgRatingToDef] = useState<number | ''>(
    Number(apiParams['vote_average.lte']) || ''
  );
  const [yearDef, setYearDef] = useState<number | ''>(
    Number(apiParams.year) || ''
  );
  const releaseDtGteDef = apiParams['primary_release_date.gte'];
  const releaseDtLteDef = apiParams['primary_release_date.lte'];

  const [dateFrom, setDateFrom] = useState(
    releaseDtGteDef ? new Date(releaseDtGteDef) : undefined
  );
  const [dateTo, setDateTo] = useState(
    releaseDtLteDef ? new Date(releaseDtLteDef) : undefined
  );
  const [needReset, setReset] = useState(false);
  const resetForm = () => {
    setIncludeAdultDef('false');
    setSortByDef(sortByValues.popularityDesc.id);
    setLanguageDef('');
    setAvgRatingFromDef('');
    setAvgRatingToDef('');
    setYearDef('');
    setDateFrom(undefined);
    setDateTo(undefined);
    setGenres('');
    setReset(true);
  };
  const classes = `${props.className} `;
  return (
    <>
      <button className="btn" onClick={resetForm}>
        reset
      </button>
      <Form method="post" action="/search" className={classes}>
        <SortByList
          options={sortByValues}
          label="Sort By"
          selectedValue={sortByDef}
          updateVal={(val) => {
            setSortByDef(val);
          }}
          name="sort_by"
        />

        <GenresList
          name="with_genres"
          withGenresDef={genres}
          needReset={needReset}
          updateReset={() => setReset(false)}
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
          // defaultValue={apiParams['with_original_language'] || undefined}
          name="with_original_language"
          value={languageDef}
          updateVal={(val) => {
            setLanguageDef(val);
          }}
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
          value={avgRatingFromDef}
          onChange={(e) => setAvgRatingFromDef(Number(e.target.value))}
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
          value={avgRatingToDef}
          onChange={(e) => setAvgRatingToDef(Number(e.target.value))}
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
          value={yearDef}
          onChange={(e) => setYearDef(Number(e.target.value))}
        />

        <DateInputField
          id="releaseDtGte"
          label="Release Date From"
          name="primary_release_date.gte"
          value={dateFrom || undefined}
          updateVal={(d) => setDateFrom(d)}
        />
        <DateInputField
          id="releaseDtLte"
          label="To"
          name="primary_release_date.lte"
          value={dateTo || undefined}
          updateVal={(d) => setDateTo(d)}
          //updateVal={(d) => console.log(d)}
        />

        <button
          type="submit"
          data-bs-dismiss="offcanvas"
          className="btn btn-dark w-100 mt-3"
        >
          OK
        </button>
      </Form>
    </>
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
