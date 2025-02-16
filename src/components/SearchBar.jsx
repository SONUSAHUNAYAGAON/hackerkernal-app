const SearchBar = (props) => {
  return (
    <>
      <input
        className="block w-full border  border-gray-300 p-2.5 text-sm rounded-lg"
        id="searchbar"
        type="text"
        name="searchbar"
        placeholder="Search by product & price"
        onChange={props.onChange}
        required
      />
    </>
  );
};

export default SearchBar;
