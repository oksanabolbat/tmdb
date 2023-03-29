import { useEffect, useState } from 'react';
import { getLanguages } from '../../helpers/api';

interface Props {
  name: string;
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

  return (
    <select
      className="form-select"
      aria-label="Original language"
      defaultValue={undefined}
      name={props.name}
    >
      {languages?.map((l) => (
        <option value={l.iso_639_1} key={l.iso_639_1}>
          {/* {l.name.length > 1 ? l.name : l.english_name} */}
          {l.english_name}
        </option>
      ))}
      <option value={''} key={undefined}>
        {}
      </option>
    </select>
  );
};

export default LanguagesList;
