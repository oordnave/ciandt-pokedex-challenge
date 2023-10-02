// compare component
import { Link } from 'react-router-dom';

// components
import Header from '../../components/blocks/Header/Header';

const Compare = () => {
  return (
    <>
      <Header />
      <div>Compare</div>
      <Link to={`/`}>Return to home</Link>
    </>
  );
};

export default Compare;
