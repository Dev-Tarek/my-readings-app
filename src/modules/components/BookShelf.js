import React from 'react'
import Book from './Book';
import { bookShelvesValues } from '../../helpers';

const BookShelf = props => {
  const { title, books, updateHandler } = props;
  return <div className="bookshelf">
                  <h2 className="bookshelf-title">{bookShelvesValues[title]}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.map((book, index) => <li key={index}>
                        <Book
							book={book}
							inShelf={book.shelf}
							updateHandler={updateHandler}
						/>
                      </li>)}
                    </ol>
                  </div>
                </div>
}

export default BookShelf;