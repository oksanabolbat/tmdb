interface Props {
  val: any;
  valName: string;
  currency?: boolean;
}

const MovieDetail: React.FC<Props> = (props) => {
  if (props.currency && props.val === '0') return <></>;
  return props.val ? (
    <p>
      <strong>{props.valName} </strong> {props.currency ? '$' : ''}
      {props.val}{' '}
    </p>
  ) : (
    <></>
  );
};

export default MovieDetail;
