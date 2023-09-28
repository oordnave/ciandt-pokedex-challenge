// Search component
const Search = ({ searchPokemon: searchEvent, search: value, handlerSearch: handlerSearch }) => {
  return (
    <div className='search'>
      <form action='' onSubmit={searchEvent}>
        <input type='text' value={value} onChange={handlerSearch} />
      </form>
    </div>
  );
};

export default Search;
