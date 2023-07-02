import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom';
import BtnBack from '../components/UI/BtnBack';
import { getPersonData, PersonProps, imgSrc } from '../helpers/api';
import PersonPersonalDetail from '../components/UI/PersonPersonalDetail';
import CardsHolder from '../components/UI/CardsHolder';
import PersonMovieCard from '../components/PersonMovieCard';
import { defaultNoProfileImgSrc } from '../helpers/constants';

const PersonPage = () => {
  const personData = useLoaderData() as PersonProps;

  const homepage = personData.homepage ? (
    <>
      <h5 className="mt-3">HomePage</h5>
      <p>
        <a href={personData.homepage}>{personData.homepage}</a>
      </p>
    </>
  ) : (
    <></>
  );

  const biography = personData.biography ? (
    <>
      {' '}
      <h3>Biography</h3>
      <p>{personData?.biography}</p>
    </>
  ) : (
    <></>
  );

  const alsoKnownAsJsx: JSX.Element =
    personData.also_known_as && personData.also_known_as.length > 0 ? (
      <>
        <h5>Also Known As</h5>
        {personData.also_known_as.map((name) => (
          <span key={name}>{`${name}\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0`}</span>
        ))}
      </>
    ) : (
      <></>
    );

  const knownAsJSX: JSX.Element =
    personData.known_as && personData.known_as.length > 0 ? (
      <>
        <h3 className="my-4">Known for</h3>

        <CardsHolder>
          {personData.known_as?.map((el) => (
            <PersonMovieCard movie={el} key={el.id} />
          ))}
        </CardsHolder>
      </>
    ) : (
      <></>
    );
  return (
    <div className="container pb-5">
      <div className="row">
        <div className="col-3">
          <img
            src={
              personData.profile_path
                ? `${imgSrc}/w300_and_h450_bestv2${personData.profile_path}`
                : defaultNoProfileImgSrc
            }
            alt={personData.name}
            className="img-fluid mb-3"
          />
          <h3>Personal Info</h3>
          <ul className="list-group list-group-flush">
            <PersonPersonalDetail
              heading="Known For"
              info={personData.known_for_department}
              key="knownfor"
            />
            <PersonPersonalDetail
              heading="Gender"
              info={personData.genger === 1 ? 'Male' : 'Female'}
              key="gender"
            />
            <PersonPersonalDetail
              heading="Birthday"
              info={personData.birthday}
              key="birthday"
            />
            <PersonPersonalDetail
              heading="Place of Birth"
              info={personData.place_of_birth}
              key="placeofbirth"
            />
            <PersonPersonalDetail
              heading="Popularity"
              info={String(personData.popularity)}
              key="popularity"
            />
          </ul>
        </div>
        <div className="col">
          <h1>{personData.name}</h1>
          {biography}

          {alsoKnownAsJsx}
          {homepage}

          {knownAsJSX}
        </div>
      </div>

      <BtnBack />
    </div>
  );
};

export default PersonPage;

export const loader = ({ params }: LoaderFunctionArgs) => {
  return getPersonData(Number(params.personId)).then(
    (personData) => personData
  );
};
