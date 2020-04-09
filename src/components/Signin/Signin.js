import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyUser } from '../../services/users';
import { localStorageSetItem} from '../../services/utils';
import { Link, Redirect } from 'react-router-dom';
import './Signin.css';

class Signin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            onSignin: false,
        }
    }

    onUserNameChange = (event) => {
        this.props.userNameChange(event.target.value)
    }

    onPasswordChange = (event) => {
        this.props.passwordChange(event.target.value)
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
                        <button className="Button" onClick={() => {
                            this.props.onSignin({
                                userName: this.props.userName,
                                password: this.props.password,
                            })
                        }}>SIGNIN</button>
                    </div>
                    {this.props.token ? <Redirect to='/accounts' /> : null}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userName: state.Users.userName,
    password: state.Users.password,
    userId: state.Users.userId,
    token: state.Users.token,
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
            }),

        onSignin: (user) => {
            let token = verifyUser(user)

            localStorageSetItem("token", token);

            dispatch({
                type: "SET_TOKEN",
                payload: {
                    token: token ? token : null,
                }
            })

        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);