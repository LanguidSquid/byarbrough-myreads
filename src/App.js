import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    "books": [],
    "currentQuery" : ""
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

    this.setState({ currentQuery: query })
  }

  updateSearchWithCurrentQuery = () => {
    this.updateQuery(this.state.currentQuery)
  }

  updateShelf = (book, event) => {
    if(!!event){
      BooksAPI.update(book, event.target.value).then(this.refreshBooksList())
    }
  }

  updateBookStatus = (book, event) => {
    if(!!event){
      BooksAPI.update(book, event.target.value).then(this.updateSearchWithCurrentQuery())
    }
  }

  refreshBooksList = () => {
    BooksAPI.getAll().then((books) => {
      console.log('refreshBooks')
      if(books != this.state.books){
        console.log('books changed')
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
