import React, { Component } from 'react';
import './Accounts.css';
import { Link, Redirect } from 'react-router-dom';
import { localStorageSetItem, localStorageGetItem } from '../../services/utils';
import { getAccounts } from '../../services/Accounts';
import Transactions from '../Transaction/Transaction';
//import {getTransactions} from '../../services/transactions';
import { AiOutlinePlus } from "react-icons/ai";

class Accounts extends Component {
    backgroundColors = ["#eaf7bc", "#cec3f7", "#c3f7f7", "#fcc5ea", "#f7b5b5", "#fc9099", "#9eb9f7", "#d0ffcc"]

    state = {
        onDelete: false,
        divClicked: "",
    }

    componentWillMount() {
        let accountId = localStorageGetItem("accountId");
        if (!accountId) {
            localStorageSetItem("accountId", 0)
        }
    }

    handleDivClicked = (name) => {
        this.setState({
            divClicked: name,
        })
    }

    handleDelete = () => {
        this.setState({
            onDelete: true,
        })
    }

    render() {
        let usersAccountDetails = getAccounts();
        //let transactions=getTransactions();
        let backgroundIndex = 0;
        return (
            <div>
               

                <div style={{ margin: "25px" }}>
                    <div style={{ textAlign: "left", marginLeft: "25px" }}>
                        <label style={{ fontWeight: "bold", fontSize: "larger" }} >ACCOUNTS</label>
                    </div>
                    <div style={{ overflowX: "auto", display: "flex" }}>
                        {usersAccountDetails.map(obj => {
                            backgroundIndex = Math.floor(Math.random() * Math.floor(7));
                            return (<div className="AccountCard" style={{ backgroundColor: this.backgroundColors[backgroundIndex] }} onClick={() => { this.handleDivClicked(obj.accountName) }}>
                                {obj.accountName}
                                <b style={{ fontSize: "larger" }}> ₹ {obj.accountBalance} </b>
                            </div>)
                        })}
                        <div className="AccountCard" style={{ backgroundColor: "#aaf2c3" }}>
                            <Link to='/addAccounts'><AiOutlinePlus /></Link>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "100px" }}>
                    <div style={{ textAlign: "left", marginLeft: "50px", marginBottom: "25px" }}>
                        <label style={{ fontWeight: "bold", fontSize: "17px", marginRight: "20px" }}> RECENT TRANSACTIONS</label>
                        <Link to="/addTransaction" className="AddTransactionButton" >Add Transaction</Link>
                    </div>
                    <Transactions onDelete={this.handleDelete} />
                </div>
                {this.state.divClicked ? <Redirect to={`/transactions/${this.state.divClicked}`} /> : null}
            </div>
        );
    }
}

export default Accounts