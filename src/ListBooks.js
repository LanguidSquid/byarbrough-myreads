import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'


class ListBooks extends Component {
  state = {
    "books": []
  }

  componentDidMount() {
    this.refreshBooksList()
  }

  refreshBooksList = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  updateShelf = (book, event) => {
    BooksAPI.update(book, event.target.value).then(this.refreshBooksList())
  }

	render () {
    const { books } = this.state

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
              updateShelf={this.updateShelf}
              />
            <Bookshelf
              shelfType="wantToRead"
              books={books.filter((book) => book.shelf === "wantToRead")}
              updateShelf={this.updateShelf}
              />
            <Bookshelf
              shelfType="read"
              books={books.filter((book) => book.shelf === "read")}
              updateShelf={this.updateShelf}
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