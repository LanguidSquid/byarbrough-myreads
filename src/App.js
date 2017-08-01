import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
