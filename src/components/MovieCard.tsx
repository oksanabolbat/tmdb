interface Props {
  id: string;
}

const MovieCard: React.FC<Props> = (props) => {
  return <div>{props.id}</div>;
};
export default MovieCard;
