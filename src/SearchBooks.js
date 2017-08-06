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

  }

  updateQuery = (event) => {
    var query = event.target.value;
    if(!!query){
      BooksAPI.search(query, 10).then((books) => {
        this.setState({ books: books })
      })
    }else{
        this.setState({ books: [] })
    }
  }

  updateShelf = (book, event) => {
    BooksAPI.update(book, event.target.value)
  }

	render () {
    const { books } = this.state

		return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={(event) => this.updateQuery(event)} placeholder="Search by title or author"/>
          </div>
        </div>
        { books.length > 0 &&
          <div className="search-books-results">
            <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  updateShelf={this.updateShelf}
                  />
              </li>
            ))}
            </ol>
          </div>
        }

        { books.length <= 0 &&
          <div className="search-books-results">
            <div className="empty-results-text">It looks like your search returned no results... Try another search!</div>
          </div>
        }
      </div>
		)
	}
}

export default SearchBooks