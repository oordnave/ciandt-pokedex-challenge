// Section element

// import prop types
import PropTypes from 'prop-types';

const SectionElement = ({ children }) => {
  return <section>{children}</section>;
};

// validaing props
SectionElement.propTypes = {
  children: PropTypes.node,
};

export default SectionElement;
