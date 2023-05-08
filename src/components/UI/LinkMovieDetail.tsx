interface Props {
  val: any;
  valName: string;
  linkAddress: string | null;
}

const LinkMovieDetail: React.FC<Props> = (props) => {
  return props.linkAddress ? (
    <p>
      <strong>{props.valName} </strong>{' '}
      <a
        className="
               text-muted text-decoration-none"
        href={props.linkAddress}
        target="_blank"
      >
        {props.val}
      </a>
    </p>
  ) : (
    <></>
  );
};

export default LinkMovieDetail;
