import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
  static PropTypes = {
    shelfType: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

	render () {
		const { shelfType, books, updateShelf } = this.props

		return (
      <div className="bookshelf">
        <div className ="shelfType">
          {shelfType === "currentlyReading" && (
            <h2 className="bookshelf-title">Currently Reading</h2>
          )}
          {shelfType === "wantToRead" && (
            <h2 className="bookshelf-title">Want to Read</h2>
          )}
          {shelfType === "read" && (
            <h2 className="bookshelf-title">Read</h2>
          )}
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  updateShelf={updateShelf}
                  />
              </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
		)
	}
}

export default Bookshelf