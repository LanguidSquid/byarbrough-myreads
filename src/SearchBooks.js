import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
    static PropTypes = {
    }

  state = {
    "books": []
  }

  componentDidMount() {
    console.log(this.state.books)
  }

  updateQuery = (query) => {
    console.log(query)
    BooksAPI.search(query, 30).then((books) => {
      this.setState({ books: books })
      console.log(this.state.books)
    })
  }

	render () {
    const { books } = this.state

		return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" onChange={(event) => this.updateQuery(event.target.value)} placeholder="Search by title or author"/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {books.map((book) => (
          <li>
            <Book
              book={book}
              />
          </li>
        ))}
        </ol>
      </div>
      </div>
		)
	}
}

export default SearchBooks