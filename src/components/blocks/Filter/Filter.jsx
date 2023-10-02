// component filter

// importing prop-types
import PropTypes from 'prop-types';

const Filter = ({ filter, handleFilter }) => {
  return (
    <div className='text-center p-4'>
      <div className='text-center text-xl pb-5'>
        <p className='text-bold text-blue-500 font-bold'>Or find Pokémon by Type</p>
      </div>
      <div className='buttons'>
        {filter.map((filter, index) => (
          <button
            key={'num' + index}
            type='button'
            value={filter.name}
            onClick={(e) => handleFilter(e.target.value)}
            className='capitalize text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 m-1 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// verifying types
Filter.propTypes = {
  filter: PropTypes.array,
  handleFilter: PropTypes.func,
};

export default Filter;
