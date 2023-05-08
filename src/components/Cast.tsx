import { CastProps } from '../helpers/api';
import CastCard from './CastCard';

interface Props {
  cast: CastProps[];
}

const Cast: React.FC<Props> = (props) => {
  return (
    <>
      {props.cast.length > 0 &&
        props.cast.map((el) => <CastCard cast={el} key={el.credit_id} />)}
    </>
  );
};

export default Cast;
