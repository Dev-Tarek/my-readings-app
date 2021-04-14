import React from 'react';
import { bookShelvesValues, noImageURL } from '../../helpers';

const Book = props => {
  	const { book, inShelf, updateHandler } = props;
  
  	const title = book.title;
  	const authors = Array.isArray(book.authors) ? book.authors.join(', ').trim(', ') : book.authors ? book.authors : 'No author data';
  	const imageURL = book.imageLinks && book.imageLinks.thumbnail? book.imageLinks.thumbnail : noImageURL;
  	const width = props.width || 128;
  	const height = props.height || 193;
  
	return <div className="book">
		<div className="book-top">
			<div className="book-cover" style={{ width: width, height: height, backgroundImage: `url(${imageURL})` }}></div>
            <div className="book-shelf-changer">
                <select onChange={event => updateHandler(event.target.value, book)}>
                    <option disabled>Move to...</option>
                    <option value="" style={{display: 'none'}}></option>
                    {Object.keys(bookShelvesValues).map((key, index) => <option key={index} value={key}>
						{inShelf && inShelf === key? "✔" : '\u2000'} {!inShelf && key === 'none' && "✔"} {bookShelvesValues[key]} {'\u2000'}
                    </option>)}
                </select>
            </div>
		</div>
		<div className="book-title">{title}</div>
		<div className="book-authors">{authors}</div>
	</div>
}

export default Book;