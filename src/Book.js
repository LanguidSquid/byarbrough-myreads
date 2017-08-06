import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  static PropTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  state = {
    book: {},
    authorList : ""
  }

  processAuthorsForHumanReadability = (authors) => {
    var authors = JSON.stringify(authors)
    if(!!authors){
      return authors.split('"').join('').split('[').join('').split(']').join('').split(',').join(', ').split('  ').join(' ')
    }else{
      return ""
    }
  }

  componentDidMount() {

  }

  render () {
    const { book, id } = this.props
    var authorList = this.processAuthorsForHumanReadability(this.props.book.authors)

		return (
      <div className="book-component">
        {!!book && !!book.imageLinks &&
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + (book.imageLinks.thumbnail) + '")' }}></div>
              <div className="book-shelf-changer">
                <select value={book.shelf} onChange={(event) => this.props.updateShelf(book, event)}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{authorList}
            </div>
          </div>
        }
      </div>
		)
	}
}

export default Book