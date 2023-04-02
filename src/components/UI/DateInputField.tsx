import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  id: string;
  label: string;
  name: string;
  defaultValue?: Date;
}

const DateInputField: React.FC<Props> = (props) => {
  const [dateValue, setDateValue] = useState<Date | null>(
    props.defaultValue || null
  );
  const onChangeHandler = (d: Date) => {
    setDateValue(d);
  };
  return (
    <>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <ReactDatePicker
        dateFormat={'yyyy-MM-dd'}
        className="form-control"
        id={props.id}
        onChange={onChangeHandler}
        selected={dateValue}
        name={props.name}
      />
    </>
  );
};

export default DateInputField;
