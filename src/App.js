import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Accounts from './components/Accounts/Accounts';
import AddAccounts from './components/Accounts/AddAccount/AddAccount';
import AddTransaction from './components/Transaction/AddTransaction/AddTransaction';
// import Transaction from './components/Transaction/Transaction';
import SpecificAccount from './components/Accounts/SpecificAccount/SpecificAcccount';

import {localStorageGetItem , localStorageSetItem} from './services/utils';

class App extends Component {

  componentWillMount(){
    let usersStorageItem = localStorageGetItem('users');
    if(!usersStorageItem){
     localStorageSetItem('users', []);
    }
    
    let accStorageItem = localStorageGetItem("accounts");
    if(!accStorageItem){
      localStorageSetItem("accounts" , [])
    }

    let transcStorageItem = localStorageGetItem("transactions");
    if(!transcStorageItem){
      localStorageSetItem("transactions" , [])
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Redirect from="/" to="/signin" />
          <Route exact path='/signin'><Signin /></Route>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/accounts"><Accounts /></Route>
          <Route exact path="/addAccounts"><AddAccounts/></Route>
          <Route exact path="/addTransaction"><AddTransaction /></Route>
          <Route path="/editTransaction"><AddTransaction /></Route>
          <Route path="/transactions"><SpecificAccount /></Route>
        </Router>
      </div>
    );
  }
}

export default App;
