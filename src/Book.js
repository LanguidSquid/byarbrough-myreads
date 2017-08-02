import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  static PropTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  state = {
    book: {},
    authorList : ""
  }

  processAuthorsForHumanReadability = (authors) => {
    return JSON.stringify(authors).split('"').join('').split('[').join('').split(']').join('').split(',').join(', ').split('  ').join(' ')
  }

  updateShelf = (event, book) => {
    console.log(event.target.value)
    console.log(book)
    BooksAPI.update(book, event.target.value).then((books) => {
      this.setState({ books: books })
      console.log(this.state.books)
    })
  }

  componentDidMount() {
    var authorList = this.processAuthorsForHumanReadability(this.props.book.authors)
    this.setState({ authorList: authorList })
    this.setState({ book: this.props.book })
    console.log(this.state.book)
  }

	render () {
    const { book } = this.state

		return (
      <div className="book-component">

        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + (this.props.book.imageLinks.thumbnail) + '")' }}></div>
            <div className="book-shelf-changer">
              <select onChange={(event) => (
                this.updateShelf(event, book)
                )}>
                <option value="none" disabled>Move to...</option>
                {book.shelf === "currentlyReading" ? (
                  <option value="currentlyReading" selected>Currently Reading</option>
                ) : (
                  <option value="currentlyReading">Currently Reading</option>
                )}
                {book.shelf === "wantToRead" ? (
                  <option value="wantToRead" selected>Want to Read</option>
                ) : (
                  <option value="wantToRead">Want to Read</option>
                )}
                {book.shelf === "read" ? (
                  <option value="read" selected>Read</option>
                ) : (
                  <option value="read">Read</option>
                )}
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{this.state.authorList}
          </div>
        </div>

      </div>
		)
	}
}

export default Book