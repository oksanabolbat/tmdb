interface Props {
  heading: string;
  info?: string | null;
}

const PersonPersonalDetail: React.FC<Props> = (props) => {
  return props.info ? (
    <li className="list-group-item">
      <h5>{props.heading}</h5>
      {props.info}
    </li>
  ) : (
    <></>
  );
};

export default PersonPersonalDetail;
