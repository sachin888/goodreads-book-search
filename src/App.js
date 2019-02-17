import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import BookSearch from './containers/BookSearch';
import BookDetail from './containers/BookDetails'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path={'/'} exact component = {BookSearch}></Route>
            <Route path={'/bookdetail'} component = {BookDetail}></Route>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;