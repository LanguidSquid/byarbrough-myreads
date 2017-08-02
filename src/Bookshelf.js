import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
    static PropTypes = {
      shelfType: PropTypes.string.isRequired,
      books: PropTypes.array.isRequired,
      onShelfChange: PropTypes.func.isRequired
    }

  componentDidMount() {
    console.log(this.props);
  }

	render () {
		const { shelfType, books, onShelfChange } = this.props

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
              <li>
                <Book
                  book={book}
                  onShelfChange={(event, book) => (
                    this.onShelfChange(event, book)
                    )}
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