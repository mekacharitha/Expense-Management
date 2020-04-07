import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyUser } from '../../services/users';
//import {localStorageSetItem , localStorageGetItem} from '../../services/utils';
import { Link , Redirect  } from 'react-router-dom';
import './Signin.css';


class Signin extends Component {

    state={
        onSignin : false,
    }

    onUserNameChange = (event) => {
        this.props.userNameChange(event.target.value)
    }

    onPasswordChange = (event) => {
        this.props.passwordChange(event.target.value)
    }

    onSignin = async() => {
        let user = {
            userName: this.props.userName,
            password: this.props.password,
        }

        await this.setState({
            onSignin: verifyUser(user)
        }) 
        if(this.state.onSignin){
            alert("Signin successful");
        }
        else{
            alert("Signin failed")
        }
       
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: "18%" }}>
                    <h2>EXPENSE TRACKER</h2>
                    <div className="InputDivision">
                        <input type="text" placeholder="USERNAME" className="Input" onChange={this.onUserNameChange} />
                    </div>
                    <div className="InputDivision">
                        <input type="password" placeholder="PASSWORD" className="Input" onChange={this.onPasswordChange} />
                    </div>
                    <div className="InputDivision">
                        <Link to="/signup">Does not have an account ? Register here</Link>
                    </div>
                    <div className="InputDivision">
                        <button className="Button" onClick={this.onSignin}>SIGNIN</button>
                    </div>
                    {this.state.onSignin ? <Redirect to='/accounts' /> : <Redirect to='/signin' />}
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userName: state.Users.userName,
    password: state.Users.password,
    userId: state.Users.userId,
})

const mapDispatchToProps = (dispatch) => {
    return {
        userNameChange: (value) =>
            dispatch({
                type: "USERNAMECHANGE",
                payload: value
            }),


        passwordChange: (value) =>
            dispatch({
                type: "PASSWORDCHANGE",
                payload: value,
            })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);