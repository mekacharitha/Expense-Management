import React ,{Component} from "react";
import {Route ,Switch} from "react-router-dom";
import Accounts from '../../components/Accounts/Accounts';
import AddAccounts from '../../components/Accounts/AddAccount/AddAccount';
import AddTransaction from '../../components/Transaction/AddTransaction/AddTransaction';
import SpecificAccount from '../../components/Accounts/SpecificAccount/SpecificAcccount';
import {localStorageGetItem} from '../../services/utils';
import {connect} from 'react-redux';
import jwt from "jsonwebtoken";

class Dashboard extends Component {

    username ;

    componentWillMount(){
        let payload = jwt.decode(localStorageGetItem("token"));
        this.username=payload.userName;
    }

    handleLogout = () => {
        this.props.removeToken("");
        localStorage.removeItem("token")
        this.setState({})
    }

    render(){
        return(
            <div> 
                 <div style={{ display:'flex' , height: "65px", textAlign:"center" , paddingTop:"20px",borderBottom:"2px solid",borderBottomColor:"#616161" ,  justifyContent:"space-between"}}>
                     <div style={{ textAlign: "left",marginLeft: "30px", width:"200px"}}> 
                        <label style={{fontSize: "20px" }}>EXPENSE TRACKER</label>
                    </div>
                    <div style={{ textAlign:"right", height:"35px" ,width:"200px" ,right:"20px" , display:"flex"}}>
                        <div style={{marginRight:"20px",padding:"5px"}}><label style={{fontSize:"20px"}}>Hi {this.username}</label></div>
                        <button onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="content-container">
                    <Switch>
                        <Route exact path={`${this.props.match.path}/addAccounts`}><AddAccounts /></Route>
                        <Route path={`${this.props.match.path}/addTransaction`}>  <AddTransaction /> </Route>
                        <Route path={`${this.props.match.path}/editTransaction`}><AddTransaction /> </Route>
                        <Route path={`${this.props.match.path}/transactions`}><SpecificAccount /> </Route>
                        <Route path={`${this.props.match.path}`} exact><Accounts /></Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      token: state.Users.token,
    }
  }

const mapDispatchToProps = (dispatch)  => {
    return {
        removeToken: (value) =>
            dispatch({
                type: "REMOVE_TOKEN",
                payload: value
            }),
        }
    }

export default connect(mapStateToProps , mapDispatchToProps)(Dashboard);