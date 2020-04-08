import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Accounts from './components/Accounts/Accounts';
import AddAccounts from './components/Accounts/AddAccount/AddAccount';
import AddTransaction from './components/Transaction/AddTransaction/AddTransaction';
import SpecificAccount from './components/Accounts/SpecificAccount/SpecificAcccount';
import Routes from './Routes/Routes';
import Dashboard from './components/Accounts/DashBoard';

import { localStorageGetItem, localStorageSetItem } from './services/utils';

class App extends Component {


  componentWillMount() {
    let usersStorageItem = localStorageGetItem('users');
    if (!usersStorageItem) {
      localStorageSetItem('users', []);
    }

    let accStorageItem = localStorageGetItem("accounts");
    if (!accStorageItem) {
      localStorageSetItem("accounts", [])
    }

    let transcStorageItem = localStorageGetItem("transactions");
    if (!transcStorageItem) {
      localStorageSetItem("transactions", [])
    }
  }

  render() {
   let token = localStorageGetItem("token");
    return (
      <div className="App">
        <Router>
          <Redirect from="/" to="/signin" />
          {!token ?
            
              <Switch>
              <Route exact path='/signin'><Signin /></Route>
              <Route exact path="/signup"><Signup /></Route>
              </Switch>
           
            :
            <Switch>
              
             <Route path="/accounts" > <Dashboard /></Route>
              <Route path="/" render={() => <Redirect to="/accounts" />} exact/>
            </Switch>
           
             }

        </Router>
      </div>
    );
  }
}

export default App;
