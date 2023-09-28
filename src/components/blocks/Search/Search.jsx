// Search component

const Search = ({ searchPokemon, value, handleSearch, handleClear }) => {
  return (
    <div className='search flex justify-center'>
      <form action='' onSubmit={searchPokemon} className='w-full max-w-lg relative'>
        <input
          type='text'
          value={value}
          onChange={handleSearch}
          placeholder='Search for...'
          className='w-full border rounded text-lg px-5 py-2.5'
        />
        {value.length > 0 && (
          <button
            type='button'
            onClick={handleClear}
            class='absolute right-2 top-1.5 inline-flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                fill='white'
                d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z'
              />
            </svg>
            Clear search
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
