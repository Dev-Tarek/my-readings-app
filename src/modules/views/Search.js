import React from 'react';
import * as BooksAPI from '../../BooksAPI';
import Book from '../components/Book';
import SearchBar from '../components/SearchBar';

class Search extends React.Component {
    state = {
      query: '',
      results: [],
      maxResults: 20,
    }

    handleResultUpdate = (shelf, book) => {
      if(book.shelf === shelf)
        return;
      const { results } = this.state;
      const index = results.findIndex(result => result.id === book.id);
      results[index].shelf = shelf;
      this.setState({ results: results });
      BooksAPI.update(book, shelf);
    }

	handleSearchInput = event => {
      const query = event.target.value;
      this.setState({ query: query });
      if(query.length > 1)
      	this.search();
      else
        this.setState({ results: [] });
    }

	search = () => {
      	const { query } = this.state;
   		BooksAPI
			.search(query, this.state.maxResults)
          	.then(results => {
        		if(Array.isArray(results) && results.length)
                  this.setState({ results: results });
          		else
                  this.setState({ results: [] });
        	});
    }

	render(){
		const { results, query } = this.state;
		const { books, loadingHandler } = this.props;
		return <div className="search-books">
			<SearchBar query={query} onChange={this.handleSearchInput} loadingHandler={loadingHandler} />
            <div className="search-books-results">
              	<ol className="books-grid">
					{results.length? results.map((book, index) => <li key={index}>
                        <Book
							book={book}
							inShelf={book.shelf ? book.shelf
                                     : books.findIndex(myBook => myBook.id === book.id) > -1
									 ? books[books.findIndex(myBook => myBook.id === book.id)].shelf
									 : false }
							updateHandler={this.handleResultUpdate}
						/>
                      </li>)
					: <div> No Results </div>}
				</ol>
            </div>
          </div>
    }
}

export default Search;
