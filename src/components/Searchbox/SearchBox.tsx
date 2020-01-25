import * as React from 'react';

interface SearchBoxProps {
  searchHandler: (e: string) => void;
}
export const SearchBox = (props: SearchBoxProps) => {
  const { searchHandler } = props;
  return (
    <input
      aria-label="searchInput"
      type="search"
      className="search-box"
      placeholder="Search Movies"
      // tslint:disable-next-line: jsx-no-lambda
      onChange={(e: any) => {
        searchHandler(e.target.value);
      }}
      data-testid="appSearchBox"
    />
  );
};
