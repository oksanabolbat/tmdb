import { CrewProps } from '../helpers/api';
import CrewCard from './CrewCard';

interface Props {
  crew: CrewProps[];
}

const Crew: React.FC<Props> = (props) => {
  return (
    <>
      {props.crew.length > 0 &&
        props.crew.map((el) => <CrewCard crew={el} key={el.credit_id} />)}
    </>
  );
};

export default Crew;
