import { Link } from 'react-router-dom';
import { imgSrc, CrewProps } from '../helpers/api';
interface Props {
  crew: CrewProps;
}
const CrewCard: React.FC<Props> = (props) => {
  const about = `${props.crew.original_name} popularity: ${props.crew.popularity}`;
  return (
    <Link
      to={`/person/${props.crew.id}`}
      className=" min-vw-25 m-1 text-decoration-none link-dark text-center"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={about}
    >
      <img
        src={
          props.crew.profile_path
            ? `${imgSrc}w138_and_h175_face/${props.crew.profile_path}`
            : 'https://i.pinimg.com/474x/ee/cf/13/eecf132f812bdf4ca87b339563f1ffa5.jpg'
        }
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={about}
        alt={about}
        style={{ width: 138, height: 175 }}
      />

      <div className="card-body">
        <h5 className="card-title">{props.crew.name}</h5>
        <p className="card-text">{props.crew.departament}</p>
        <p className="card-text">{props.crew.job}</p>
      </div>
    </Link>
  );
};

export default CrewCard;
