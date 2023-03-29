import SearchForm from '../components/SearchForm/SearchForm';
import { Outlet } from 'react-router-dom';

const Search = () => {
  return (
    <>
      Search
      <SearchForm />
      <Outlet />
    </>
  );
};

export default Search;
