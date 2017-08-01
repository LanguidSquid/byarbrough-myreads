import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static PropTypes = {
    book: PropTypes.object.isRequired
  }

  state = {
    book: {},
    authorList : ""
  }

  processAuthorsForHumanReadability = (authors) => {
    return JSON.stringify(authors).split('"').join('').split('[').join('').split(']').join('').split(',').join(', ').split('  ').join(' ')
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
              <select>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading" selected>Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
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