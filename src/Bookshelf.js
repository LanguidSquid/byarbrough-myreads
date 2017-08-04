import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
  static PropTypes = {
    shelfType: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  state = {
    "shelfType": "",
    "books": []
  }

  componentDidMount() {
    console.log('Bookshelf - didMount')
    this.setState({
      shelfType: this.props.shelfType,
      books: this.props.books
    });
  }

	render () {
		const { shelfType, books } = this.props

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
                  updateShelf={this.props.updateShelf}
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