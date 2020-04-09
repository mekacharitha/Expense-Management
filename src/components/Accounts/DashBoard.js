import React ,{Component} from "react";
import {Link ,Route ,Switch, Redirect} from "react-router-dom";
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
    //    console.log(payload , payload.userName);
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
                 <div style={{ height: "65px", dispaly:"flex" , textAlign:"center" , paddingTop:"25px",borderBottom:"2px solid",borderBottomColor:"#616161"}}>
                     <div style={{ textAlign: "left",marginLeft: "30px",}}> 
                    <label style={{fontSize: "20px" }}>EXPENSE TRACKER</label>
                    </div>
                    <div style={{ position: "fixed", top: "25px" , height:"25px"  ,right:"20px" , display:"flex"}}>
                        <div style={{marginRight:"20px"}}><label style={{fontSize:"15px"}}>Hi {this.username}</label></div>
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
                        {/* <Route path="*"> <Redirect to={`${this.props.match.path}`} exact/></Route> */}
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