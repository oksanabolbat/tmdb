import SearchForm from '../components/SearchForm/SearchForm';

import { Outlet } from 'react-router-dom';

const Search = () => {
  return (
    <div className="container pb-5">
      <h2 className="my-3 text-center">Find some movies for yourself 😻</h2>
      <div className="row p-4">
        <div className="col">
          <button
            className="btn btn-dark w-25 text-uppercase ms-5"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasLeft"
            aria-controls="offcanvasLeft"
          >
            search
          </button>

          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id="offcanvasLeft"
            aria-labelledby="offcanvasLeftLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasLeftLabel">
                Please enter parameters
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <SearchForm className="my-3" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
