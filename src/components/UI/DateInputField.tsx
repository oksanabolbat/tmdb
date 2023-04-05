import React from 'react';
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
  const onChangeHandler = (d: Date) => {
    props.updateVal(d || undefined);
  };

  return (
    <div className="col-6">
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
    </div>
  );
};

export default DateInputField;
