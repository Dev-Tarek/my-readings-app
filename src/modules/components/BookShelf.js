import React from 'react'
import bookShelvesValues from '../../bookShelvesValues';

const BookShelf = props => {
  const { title, books, updateHandler } = props;
  return <div className="bookshelf">
                  <h2 className="bookshelf-title">{bookShelvesValues[title]}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.map((book, index) => <li key={index}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={event => updateHandler(event, book)}>
                                <option value="move" disabled>Move to...</option>
								<option value="" style={{display: 'none'}}>Move to...</option>
								{Object.keys(bookShelvesValues).map((key, index) => <option key={index} value={key}>
									 {book.shelf === key && '★'} {bookShelvesValues[key]}
								</option>)}
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors.join(', ').trim(', ')}</div>
                        </div>
                      </li>)}
                    </ol>
                  </div>
                </div>
}

export default BookShelf;