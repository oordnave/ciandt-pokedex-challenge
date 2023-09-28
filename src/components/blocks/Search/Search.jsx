// Search component

const Search = ({ searchPokemon: searchEvent, search: value, handlerSearch: handlerSearch }) => {
  return (
    <div className='search flex justify-center'>
      <form action='' onSubmit={searchEvent} className='w-full max-w-lg'>
        <input
          type='text'
          value={value}
          onChange={handlerSearch}
          placeholder='Search for...'
          className='w-full border rounded text-lg px-5 py-2'
        />
      </form>
    </div>
  );
};

export default Search;
