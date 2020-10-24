import React from 'react';

import './search-panel.css';

const SearchPanel = ({onSearchText}) => {
  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="type to search"
      onChange={onSearchText}
    />
  );
};

export default SearchPanel;
