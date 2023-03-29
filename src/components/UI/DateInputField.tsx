import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  id: string;
  label: string;
  name: string;
}

const DateInputField: React.FC<Props> = (props) => {
  const [dateValue, setDateValue] = useState<Date | null>();
  const onChangeHandler = (d: Date) => {
    console.log(d);

    setDateValue(d);
  };
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <ReactDatePicker
        dateFormat={'dd.MM.yyyy'}
        id={props.id}
        onChange={onChangeHandler}
        selected={dateValue}
        name={props.name}
      />
    </>
  );
};

export default DateInputField;
