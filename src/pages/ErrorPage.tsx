import MainNavigation from '../components/MainNavigation';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import BtnBack from '../components/UI/BtnBack';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(isRouteErrorResponse(error));
  let errorTitle = 'Something went wrong ...';
  let errorMessage = 'Something is incorrect, please try again!';
  if (isRouteErrorResponse(error)) {
    console.log(error.statusText);
    if (error.status > 500) {
      errorTitle = error.data.title;
      errorMessage = error.data.message;
    }
    if (error.status === 404) {
      errorMessage = 'Incorrect path, please check it!';
    }
  }

  return (
    <div className="container">
      <MainNavigation />
      <div className="container">
        <h3>{errorTitle}</h3>
        <p>{errorMessage}🤷</p>
      </div>
      <BtnBack />
    </div>
  );
};

export default ErrorPage;
