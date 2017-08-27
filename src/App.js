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

  updateQuery = (query) => {
    if(!!query){
      BooksAPI.search(query, 20).then((books) => {
        this.setShelf(books)
        this.setState({ searchBooks: books })
      }).then(() => this.refreshBooksList())
    }else{
        this.setState({ searchBooks: [] })
    }

    this.setState({ currentQuery: query })
  }

  setShelf = (books) => {
    this.refreshBooksList()
    books.forEach((book, index, books) => {
      for(var i = 0; i < this.state.shelvedBooks.length; i++){
        if(this.state.shelvedBooks[i].id === book.id){
          books.splice(index, 1)
          books.splice(index, 0, this.state.shelvedBooks[i])
        }
      }
    })
  }

  updateSearchWithCurrentQuery = () => {
    this.updateQuery(this.state.currentQuery)
  }

  updateShelf = (book, event) => {
    if(!!event){
      BooksAPI.update(book, event.target.value).then(() => this.refreshBooksList())
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
            updateShelf={this.updateShelf}
            updateQuery={this.updateQuery}
            refreshBooksList={this.refreshBooksList}
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
