import React from 'react';
import { Link } from 'react-router-dom';
import { groupBy } from 'lodash';
import AppBar from '../components/AppBar';
import BookShelf from '../components/BookShelf';

const Home = props => {
    const { books, updateHandler } = props;
    const bookShelves = groupBy(books, 'shelf');
	const sortedShelfNames = Object.keys(bookShelves).filter(key => key !== 'none').sort();
    return <div className="list-books">
            <AppBar title="devtarek's BooksApp" />
            {books && <div className="list-books-content">
				{sortedShelfNames.map((shelfName, index) => {
                	return <BookShelf
                  		key={index}
                  		title={shelfName}
                  		books={bookShelves[shelfName]}
						updateHandler={updateHandler}
                  	/>
                })}
            </div>}
            <div className="open-search">
            	<Link to="/search">Add a book</Link>
            </div>
          </div>
}

export default Home;