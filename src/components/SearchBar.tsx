interface PropsNavBar {
  onChangeSearchBar: { (x: string): void };
}

const SearchBar = (props: PropsNavBar) => {
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChangeSearchBar(e.currentTarget.value);
  };
  return (
    <div>
      <input
        type="text"
        onChange={HandleChange}
        className="form-control"
        placeholder="Recherche ta belle plante"
      />
    </div>
  );
};
export default SearchBar;
