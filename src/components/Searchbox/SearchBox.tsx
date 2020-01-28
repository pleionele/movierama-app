import * as React from 'react';

interface SearchBoxProps {
  searchHandler: (e: string) => void;
}
export const SearchBox = (props: SearchBoxProps) => {
  const { searchHandler } = props;

  const searchTerm = (e: any) => {
    searchHandler(e.target.value);
  };
  return (
    <input
      aria-label="searchInput"
      type="search"
      className="search"
      placeholder="Search movies"
      onChange={searchTerm}
      data-testid="appSearchBox"
    />
  );
};
