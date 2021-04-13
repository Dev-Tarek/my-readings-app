import React from 'react'
import { Route } from 'react-router-dom';

import Home from './modules/views/Home';
import Search from './modules/views/Search';

import './App.css'

const BooksApp = props => {
    return <div className="app">
      	<Route exact path='/' component={Home} />
		<Route path='/search' component={Search} />
      </div>
}

export default BooksApp;