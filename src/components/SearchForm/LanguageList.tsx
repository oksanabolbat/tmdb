import { useEffect, useState } from 'react';
import { getLanguages } from '../../helpers/api';

interface Props {
  name: string;
  defaultValue?: string;
}

interface LanguageProps {
  iso_639_1: string;
  english_name: string;
  name: string;
}

const LanguagesList: React.FC<Props> = (props) => {
  const [languages, setLanguages] = useState<LanguageProps[]>();
  const [defLang, setDefLang] = useState<string | undefined>(
    props.defaultValue
  );
  useEffect(() => {
    getLanguages().then((res) => setLanguages(res.data));
  }, []);

  return (
    <>
      <label className="form-label">Original language</label>
      <select
        className="form-select mb-3"
        aria-label="Original language"
        value={defLang}
        name={props.name}
        onChange={(e) => setDefLang(e.target.value)}
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
