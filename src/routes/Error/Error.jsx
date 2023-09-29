// error component

// importing router error from react router
import { useRouteError } from 'react-router-dom';

const Error = () => {
  // defining constant to capture the error
  const error = useRouteError();
  console.log(error);

  return (
    <div id='error-page'>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default Error;
