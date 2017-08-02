import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'


class ListBooks extends Component {
    static PropTypes = {
      books: PropTypes.object.isRequired
    }

  state = {
    "books": []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
      console.log(this.state.books)
    })
  }

  updateShelf = (event, book) => {
    console.log(event.target.value)
    console.log(book)
    BooksAPI.update(event.target.value, book).then((books) => {
      this.setState({ books: books })
      console.log(this.state.books)
    })
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
              onShelfChange={(book, shelf) => (
                this.updateShelf(book, shelf)
                )}
              />
            <Bookshelf
              shelfType="wantToRead"
              books={books.filter((book) => book.shelf === "wantToRead")}
              onShelfChange={(book, shelf) => (
                this.updateShelf(book, shelf)
                )}
              />
            <Bookshelf
              shelfType="read"
              books={books.filter((book) => book.shelf === "read")}
              onShelfChange={(book, shelf) => (
                this.updateShelf(book, shelf)
                )}
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