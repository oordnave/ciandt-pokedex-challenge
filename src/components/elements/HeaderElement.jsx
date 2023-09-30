// Header wrapper element

// importing prop types
import PropTypes from 'prop-types';

const HeaderElement = ({ children }) => {
  return <header>{children}</header>;
};

// validating prop types
HeaderElement.propTypes = {
  children: PropTypes.node,
};

export default HeaderElement;
