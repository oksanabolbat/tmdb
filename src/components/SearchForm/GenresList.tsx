import { getGenres, Genres } from '../../helpers/api';
import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';

interface Props {
  filterGenres: (a: String[]) => void;
  name: string;
}

const GenresList: React.FC<Props> = (props) => {
  const [genres, setGenres] = useState<Genres[]>();
  const [selectedGenres, setSelectedGenres] = useState<String[]>([]);

  useEffect(() => {
    getGenres().then((res) => setGenres(res));
  }, []);

  const genderBtnHandler = (event: React.MouseEvent) => {
    event.currentTarget.classList.toggle('btn-light');
    event.currentTarget.classList.toggle('btn-primary');
    const clickedGender = event.currentTarget.id;

    const updatedGenres = selectedGenres.includes(clickedGender)
      ? selectedGenres.filter((el) => el !== clickedGender)
      : [...selectedGenres, clickedGender];

    setSelectedGenres(updatedGenres);
    console.log('selected genres', selectedGenres, 'clicked ', clickedGender);
    //  props.filterGenres(updatedGenres);
  };

  return (
    // <select name={props.name} multiple className="mw-80">
    //   {genres?.map((genre) => (
    //     <option
    //       key={genre.id}
    //       className="btn btn-light"
    //       // onClick={genderBtnHandler}
    //       id={String(genre.id)}
    //     >
    //       {genre.name}
    //     </option>
    //   ))}
    // </select>
    <>
      <ul className="px-0 text-center">
        {genres?.map((genre) => (
          <li
            key={genre.id}
            className="btn btn-light"
            onClick={genderBtnHandler}
            id={String(genre.id)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
      <input
        type={'hidden'}
        name={props.name}
        id={props.name}
        value={selectedGenres.join(',')}
      />
    </>
  );
};

export default GenresList;
