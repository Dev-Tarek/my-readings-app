import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Loading from './modules/views/Loading';
import Home from './modules/views/Home';
import Search from './modules/views/Search';
import './App.css';

class BooksApp extends React.Component {
	state = {
		books: [],
      	loading: true,
    }

	componentDidMount(){
		this.fetchAllBooks();
	}

	setLoading = value => {
      if(value)
        this.fetchAllBooks();
      this.setState({ loading: value }) 
    };

	fetchAllBooks = () => BooksAPI.getAll().then(allBooks => {
      this.setState({ books: allBooks })
      this.setLoading(false);
    });

	handleBookUpdate = (shelf, book) => {
        if(book.shelf === shelf)
        	return;
        book.shelf = shelf;
        this.setState(currentState => ({
        	books: [...currentState.books.filter(prevBook => prevBook.id !== book.id), book]
        }));
        BooksAPI.update(book, shelf);
    }

	render(){
      	const { books, loading } = this.state;
		return <div className="app">
                <Loading loading={loading} />
                <Route exact path='/'>
                  <Home
                    books={books}
                    updateHandler={this.handleBookUpdate}
                  />
                </Route>
                <Route path='/search'>
                  <Search
                    books={books}
                    updateHandler={this.handleBookUpdate}
					loadingHandler={this.setLoading}
                  />
              </Route>
		</div>  
    }
}

export default BooksApp;