import React ,{Component} from "react";
import {Link ,Route ,Switch} from "react-router-dom";
import Accounts from '../../components/Accounts/Accounts';
import AddAccounts from '../../components/Accounts/AddAccount/AddAccount';
import AddTransaction from '../../components/Transaction/AddTransaction/AddTransaction';
import SpecificAccount from '../../components/Accounts/SpecificAccount/SpecificAcccount';

class Dashboard extends Component {
    render(){
        return(
            <div>
                 <div style={{ height: "75px", backgroundColor: "blue" }}>
                    <label style={{ textAlign: "left", marginLeft: "30px", fontSize: "20px" }}>EXPENSE TRACKER</label>
                    <div style={{ textAlign: "right", marginRight: "30px", position: "fixed", top: "25px" }}>
                        <label>Hi</label>
                        <button onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="content-container">
                    <Switch>
                        {/* <Route path="/accounts"><Accounts /></Route>
                        <Route exact path="/addAccounts"><AddAccounts /></Route>
                        <Route path="/addTransaction">  <AddTransaction /> </Route>
                        <Route path="/editTransaction"><AddTransaction /> </Route>
                        <Route path="/transactions"><SpecificAccount /> </Route> */}
                        <Route path="/"><Accounts /></Route>
                        <Route exact path={`${this.props.match.path}/addAccounts`}><AddAccounts /></Route>
                        <Route path={`${this.props.match.path}/addTransaction`}>  <AddTransaction /> </Route>
                        <Route path={`${this.props.match.path}/editTransaction`}><AddTransaction /> </Route>
                        <Route path={`${this.props.match.path}/transactions`}><SpecificAccount /> </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Dashboard;