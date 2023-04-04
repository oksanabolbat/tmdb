import { useEffect, useState } from 'react';
import { getLanguages } from '../../helpers/api';

interface Props {
  name: string;
  value: string | undefined;
  selectedValue?: string;
  updateVal: (paramValue: string | undefined) => void;
}

interface LanguageProps {
  iso_639_1: string;
  english_name: string;
  name: string;
}

const LanguagesList: React.FC<Props> = (props) => {
  const [languages, setLanguages] = useState<LanguageProps[]>();
  useEffect(() => {
    getLanguages().then((res) => setLanguages(res.data));
  }, []);
  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.updateVal(event.target.value);
  };
  return (
    <>
      <label className="form-label">Original language</label>
      <select
        className="form-select mb-3"
        aria-label="Original language"
        value={props.value}
        name={props.name}
        onChange={onChangeHandler}
      >
        {languages?.map((l) => (
          <option value={l.iso_639_1} key={l.iso_639_1}>
            {l.english_name}
          </option>
        ))}

        <option value={''} key={undefined}>
          {}
        </option>
      </select>
    </>
  );
};

export default LanguagesList;
