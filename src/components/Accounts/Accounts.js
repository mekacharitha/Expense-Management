import React, { Component } from 'react';
import './Accounts.css';
import { Link } from 'react-router-dom';
import { localStorageSetItem, localStorageGetItem } from '../../services/utils';
import { getAccounts } from '../../services/Accounts';
import Transactions from '../Transaction/Transaction';
//import {getTransactions} from '../../services/transactions';
import { AiOutlinePlus} from "react-icons/ai";

class Accounts extends Component {

    state={
        onDelete:false,
    }

    componentWillMount() {
        let accountId = localStorageGetItem("accountId");
        if (!accountId) {
            localStorageSetItem("accountId", 0)
        }
    }

    handleDelete= ()=>{
        this.setState({
            onDelete:true,
        })
    }

    render() {
        let usersAccountDetails = getAccounts();
        //let transactions=getTransactions();

        return (
            <div>
                <div style={{ margin: "25px" }}>
                    <div style={{ textAlign: "left", marginLeft: "25px" }}>
                        <label style={{ fontWeight: "bold" }} >ACCOUNTS</label>
                    </div>
                    <div style={{ overflowX: "auto", display: "flex" }}>
                        {usersAccountDetails.map(obj => {
                            return (<div className="AccountCard">
                                {obj.accountName}
                                <b style={{ fontSize: "larger" }}> ₹ {obj.accountBalance} </b>
                            </div>)
                        })}
                        <div className="AccountCard">
                            <Link to='/addAccounts'><AiOutlinePlus /></Link>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "100px" }}>
                    <div style={{ textAlign: "left", marginLeft: "50px", marginBottom: "25px" }}>
                        <label style={{ fontWeight: "bold", fontSize: "17px", marginRight: "20px" }}> RECENT TRANSACTIONS</label>
                        <Link to="/addTransaction" className="AddTransactionButton">Add Transaction</Link>
                    </div>
                    <Transactions onDelete={this.handleDelete}/>
                </div>
            </div>
        );
    }
}

export default Accounts