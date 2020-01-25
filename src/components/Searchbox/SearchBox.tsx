import * as React from 'react';

interface SearchBoxProps {
  searchInput: string;
  searchHandler: (e: string) => void;
}
export const SearchBox = (props: SearchBoxProps) => {
  const { searchInput, searchHandler } = props;
  return (
    <input
      aria-label="searchInput"
      type="search"
      className="search-box"
      placeholder="Search Movies"
      value={searchInput}
      // tslint:disable-next-line: jsx-no-lambda
      onChange={(e: any) => {
        searchHandler(e.target.value);
      }}
      data-testid="appSearchBox"
    />
  );
};
