import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import { localStorageGetItem } from '../services/utils';
import jwt from 'jsonwebtoken';



class App extends Component {

    // state = {
    //     logout: false
    // }
    // handleLogout = () => {
    //     localStorage.removeItem("token");
    //     this.setState({
    //         logout: true,
    //     })
    // }

    render() {
        // let payload = jwt.decode(localStorageGetItem("token"));
        // let username = payload.userName;

        return (
            <div className="App">
                {/* */}
              
                
                {/* {this.state.logout ? <Link to="/signin" /> : null} */}
            </div>
        );
    }
}

export default App;
