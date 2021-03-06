import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'


class ListBooks extends Component {
  static PropTypes = {
    books: PropTypes.object.isRequired,
    refreshBooksList: PropTypes.func.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.refreshBooksList()
  }

	render () {
    const { books, updateShelf } = this.props

		return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              shelfType="currentlyReading"
              books={books.filter((book) => book.shelf === "currentlyReading")}
              updateShelf={updateShelf}
              />
            <Bookshelf
              shelfType="wantToRead"
              books={books.filter((book) => book.shelf === "wantToRead")}
              updateShelf={updateShelf}
              />
            <Bookshelf
              shelfType="read"
              books={books.filter((book) => book.shelf === "read")}
              updateShelf={updateShelf}
              />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
		)
	}
}

export default ListBooks