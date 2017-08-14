import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    "books": []
  }

  updateQuery = (event) => {
    var query = event;
    if(!!query){
      BooksAPI.search(query, 10).then((books) => {
        this.setState({ books: books })
      })
    }else{
        this.setState({ books: [] })
    }
  }

  updateShelf = (book, event) => {
    if(!!event){
      BooksAPI.update(book, event.target.value).then(this.refreshBooksList())
    }
  }

  updateBookStatus = (book, event) => {
    if(!!event){
      BooksAPI.update(book, event.target.value)
    }
  }

  refreshBooksList = () => {
    BooksAPI.getAll().then((books) => {
      if(books != this.state.books){
        this.setState({ books: books })
      }
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            books={books}
            updateBookStatus={this.updateBookStatus}
            updateQuery={this.updateQuery}
            />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks
            books={books}
            refreshBooksList={this.refreshBooksList}
            updateShelf={this.updateShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
