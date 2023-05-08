import { getGenres, Genres } from '../../helpers/api';
import React, { useState, useEffect } from 'react';

interface Props {
  name: string;
  withGenresDef: string;
  needReset: boolean;
  updateReset: () => void;
}

const GenresList: React.FC<Props> = (props) => {
  const [genres, setGenres] = useState<Genres[]>();
  const [selectedGenres, setSelectedGenres] = useState<String[]>(
    props.withGenresDef?.split(',') || []
  );

  useEffect(() => {
    getGenres().then((res) => setGenres(res));
  }, []);

  useEffect(() => {
    if (props.needReset) {
      const genresOptions = document.getElementsByClassName('genre');
      for (let i = 0; i < genresOptions.length; i++) {
        if (genresOptions[i].matches('btn-secondary'))
          genresOptions[i].classList.replace('btn-secondary', 'btn-light');
      }
      setSelectedGenres([]);
      props.updateReset();
    }
  }, [props]);

  const genderBtnHandler = (event: React.MouseEvent) => {
    event.currentTarget.classList.toggle('btn-light');
    event.currentTarget.classList.toggle('btn-secondary');
    const clickedGender = event.currentTarget.id;

    const updatedGenres = selectedGenres.includes(clickedGender)
      ? selectedGenres.filter((el) => el !== clickedGender)
      : [...selectedGenres, clickedGender];

    setSelectedGenres(updatedGenres);
  };

  return (
    <>
      <ul className="px-0 text-center">
        {genres?.map((genre) => (
          <li
            key={genre.id}
            className={
              selectedGenres.includes(String(genre.id))
                ? 'btn genre btn-secondary '
                : 'btn genre btn-light'
            }
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
        onChange={() => {}}
      />
    </>
  );
};

export default GenresList;
