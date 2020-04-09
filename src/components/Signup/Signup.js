import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../services/users';
import { localStorageSetItem, localStorageGetItem } from '../../services/utils';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom';

class Signup extends Component {

    state = {
        onSignup: false,
    }

    componentWillMount() {
        let userIdStorageItem = localStorageGetItem("userId");
        if (!userIdStorageItem) {
            localStorageSetItem("userId", 0)
        }
    }

    onUserNameChange = (event) => {
        this.props.userNameChange(event.target.value)
    }

    onPasswordChange = (event) => {
        this.props.passwordChange(event.target.value)
    }

    onSignup = () => {
        let userId = localStorageGetItem("userId");
        let user = {
            userId: ++(userId),
            userName: this.props.userName,
            password: this.props.password
        }

        try {
            createUser(user);
            alert("Signup successful");
            this.setState({
                onSignup: true
            })
        }
        catch (e) {
            alert(e.message);
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
                        <Link to="/signin">Have an account ? Signin here</Link>
                    </div>
                    <div className="InputDivision">
                        <button className="Button" onClick={this.onSignup}>SIGNUP</button>
                    </div>
                </div>
                {this.state.onSignup ? <Redirect to="/signin" /> : <Redirect to="/signup" />}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);