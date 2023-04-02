import { SearchSummaryProps } from '../helpers/searchConstants';

const SearchSummary: React.FC<SearchSummaryProps> = (props) => {
  return (
    <div className="row">
      <p className="px-5 opacity-75 col-11 text-end">
        {props.total > 0
          ? ` Found ${props.total} movies on ${props.pages} pages for You 😎`
          : 'Sorry, no movies found. Please try again!'}
      </p>
    </div>
  );
};

export default SearchSummary;
