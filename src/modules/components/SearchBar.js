import React from 'react';
import { Link } from 'react-router-dom';

const SearchBar = props => {
  const { query, onChange, loadingHandler } = props;
  return <div className="search-books-bar">
              <Link className="close-search" to="/" onClick={() => loadingHandler(true)}>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={query} onChange={onChange} placeholder="Search by title or author"/>
              </div>
            </div> 
}

export default SearchBar;