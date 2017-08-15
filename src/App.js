import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    "searchBooks": [],
    "shelvedBooks": [],
    "currentQuery" : ""
  }

  updateQuery = (event) => {
    var query = event.target.value;
    if(!!query){
      BooksAPI.search(query, 20).then((books) => {
        this.setState({ searchBooks: books })
      }).then(() => this.refreshBooksList())
    }else{
        this.setState({ searchBooks: [] })
    }

    this.setState({ currentQuery: query })
  }

  updateSearchWithCurrentQuery = () => {
    this.updateQuery(this.state.currentQuery)
  }

  updateShelf = (book, event) => {
    if(!!event){
      BooksAPI.update(book, event.target.value).then(() => this.refreshBooksList())
    }
  }

  updateBookStatus = (book, event) => {
    if(!!event){
      BooksAPI.update(book, event.target.value).then(() => this.updateSearchWithCurrentQuery())
    }
  }

  refreshBooksList = () => {
    BooksAPI.getAll().then((books) => {
      if(books !== this.state.books){
        this.setState({ shelvedBooks: books })
      }
    })
  }

  render() {
    const { searchBooks, shelvedBooks } = this.state

    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            books={searchBooks}
            shelvedBooks={shelvedBooks}
            updateBookStatus={this.updateBookStatus}
            updateQuery={this.updateQuery}
            />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks
            books={shelvedBooks}
            refreshBooksList={this.refreshBooksList}
            updateShelf={this.updateShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
