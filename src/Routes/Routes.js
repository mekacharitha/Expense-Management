import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Accounts from '../components/Accounts/Accounts';
import AddAccounts from '../components/Accounts/AddAccount/AddAccount';
import AddTransaction from '../components/Transaction/AddTransaction/AddTransaction';
import SpecificAccount from '../components/Accounts/SpecificAccount/SpecificAcccount';



class App extends Component {


  render() {
    let pathName = window.location.pathname;
    let header = <div style={{height:"75px" ,backgroundColor:"blue"}}>
                        ABC
                </div>
    console.log(pathName);
    if(pathName == "/signin" || pathName == "/signup"){
        header =  null ;  
    }
    else{
        header = <div style={{height:"75px" ,backgroundColor:"blue"}}>
        ABC
  </div>
    }
    return (
      <div className="App">
          {header}
          <Route exact path="/accounts"><Accounts /></Route>
          <Route exact path="/addAccounts"><AddAccounts/></Route>
          <Route path="/addTransaction"><AddTransaction /></Route>
          <Route path="/editTransaction"><AddTransaction /></Route>
          <Route path="/transactions"><SpecificAccount /></Route>
       
      </div>
    );
  }
}

export default App;
