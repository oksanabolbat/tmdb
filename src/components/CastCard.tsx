import { Link } from 'react-router-dom';
import { imgSrc, CastProps } from '../helpers/api';
import { defaultNoProfileImgSrc } from '../helpers/constants';
interface Props {
  cast: CastProps;
}
const CastCard: React.FC<Props> = (props) => {
  const about = `${props.cast.original_name} popularity: ${props.cast.popularity}`;
  return (
    <Link
      to={`/person/${props.cast.id}`}
      className=" min-vw-25 m-1 text-decoration-none link-dark text-center"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={about}
    >
      <img
        src={
          props.cast.profile_path
            ? `${imgSrc}w138_and_h175_face/${props.cast.profile_path}`
            : defaultNoProfileImgSrc
        }
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={about}
        alt={about}
        style={{ width: 138, height: 175 }}
      />

      <div className="card-body">
        <h5 className="card-title">{props.cast.name}</h5>
        <p className="card-text">{props.cast.character}</p>
      </div>
    </Link>
  );
};

export default CastCard;
