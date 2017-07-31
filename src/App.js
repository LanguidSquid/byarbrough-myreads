import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
      console.log(this.state.books)
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            showSearchPage={this.state.showSearchPage}

            />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks
            showSearchPage={this.state.showSearchPage}
            books={this.state.books}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
