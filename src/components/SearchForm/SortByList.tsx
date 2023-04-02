import React from 'react';
import { SortByValues, SearchParams } from '../../helpers/searchConstants';

interface Props {
  options: SortByValues;
  label: string;
  name: string;

  selectedValue?: string;
  updateVal: (
    paramName: keyof SearchParams,
    paramValue: string | number
  ) => void;
}

const SortByList: React.FC<Props> = (props) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.updateVal('sortBy', event.target.value);
  };
  return (
    <>
      <label className="form-label">{props.label}</label>
      <select
        className="form-select mb-3"
        aria-label={props.label}
        defaultValue={props.selectedValue}
        onChange={onChangeHandler}
        name={props.name}
      >
        {Object.entries(props.options).map(([k, v]) => {
          return (
            <option value={v.id} key={v.id}>
              {v.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SortByList;
