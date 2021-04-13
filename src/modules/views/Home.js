import React from 'react';
import { Link } from 'react-router-dom';
import { groupBy } from 'lodash';
import * as BooksAPI from '../../BooksAPI';
import BookShelf from '../components/BookShelf';

class Home extends React.Component {
  state = {
    books: [],
  }

  componentDidMount(){
  	this.fetchAllBooks();
  }

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


  fetchAllBooks = () => BooksAPI.getAll().then(allBooks => this.setState({ books: allBooks }));

  render(){
    const { books } = this.state;
    const bookShelves = groupBy(books, 'shelf');
	const sortedShelvesNames = Object.keys(bookShelves).sort();
    return <div className="list-books">
            <div className="list-books-title">
              <h1>MyReadsApp</h1>
            </div>
            <div className="list-books-content">
				{sortedShelvesNames.map((shelfName, index) => {
                	return <BookShelf
                  		key={index}
                  		title={shelfName}
                  		books={bookShelves[shelfName]}
						updateHandler={this.handleBookUpdate}
                  	/>
                })}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
  }
}

export default Home;