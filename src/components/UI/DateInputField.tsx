import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  id: string;
  label: string;
  name: string;
  value: Date | undefined;
  updateVal: (paramValue: Date | undefined) => void;
}

const DateInputField: React.FC<Props> = (props) => {
  // const [dateValue, setDateValue] = useState<Date | null>(
  //   props.value || null
  // );
  const onChangeHandler = (d: Date) => {
    //setDateValue(d);

    props.updateVal(d || undefined);
  };

  console.log(props.value);
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
        selected={props.value || undefined}
        name={props.name}
      />
    </>
  );
};

export default DateInputField;
