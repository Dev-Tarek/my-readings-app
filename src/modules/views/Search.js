import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import bookShelvesValues from '../../bookShelvesValues';

class Search extends React.Component {
    state = {
      query: '',
      books: [],
      maxResults: 20,
      myBooks: [],
    }

	componentDidMount(){
      this.fetchAllBooks();
    }

	fetchAllBooks = () => BooksAPI.getAll().then(allBooks => this.setState({ myBooks: allBooks }));

    handleBookUpdate = (event, book) => {
      const shelf = event.target.value;
      if(book.shelf === shelf)
        return;
      book.shelf = shelf;
      this.setState(currentState => ({
          books: [...currentState.books.filter(prevBook => prevBook.id !== book.id), book]
      }));
      BooksAPI.update(book, shelf);
    }

	handleSearchInput = event => {
      const query = event.target.value;
      this.setState({ query: query });
      if(query.length > 1)
      	BooksAPI
			.search(query, this.state.maxResults)
          	.then(results => {
        		if(Array.isArray(results) && results.length)
                  this.setState({ books: results });
          		else
                  this.setState({ books: [] });
        	});
      else
        this.setState({ books: [] });
    }

	render(){
		const { books, myBooks } = this.state;

		return <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
              
                <input type="text" value={this.state.query} onChange={this.handleSearchInput} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              	<ol className="books-grid">
					{books.length? books.map((book, index) => <li key={index}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={event => this.handleBookUpdate(event, book)}>
                                <option value="move" disabled>Move to...</option>
								<option value="" style={{display: 'none'}}>Move to...</option>
								{Object.keys(bookShelvesValues).map((key, index) => <option key={index} value={key}>
									 {myBooks.filter(myBook => myBook.id === book.id).length?
										myBooks.filter(myBook => myBook.id === book.id)[0].shelf === key && '★' : ''} {bookShelvesValues[key]}
								</option>)}
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors.join(', ').trim(', ')}</div>
                        </div>
                      </li>)
					: <div> No Results </div>}

				</ol>
            </div>
          </div>
    }
}

export default Search;
