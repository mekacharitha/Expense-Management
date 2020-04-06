import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import {localStorageGetItem , localStorageSetItem} from './services/utils';

class App extends Component {

  componentWillMount(){
    let usersStorageItem = localStorageGetItem('users');
    if(!usersStorageItem){
     localStorageSetItem('users', []);
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Redirect from="/" to="/signin" />
          <Route exact path='/signin'><Signin /></Route>
          <Route exact path="/signup"><Signup /></Route>
        </Router>
      </div>
    );
  }
}

export default App;
