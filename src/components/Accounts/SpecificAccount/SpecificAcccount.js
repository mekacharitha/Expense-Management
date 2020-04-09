import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import moment from "moment";
import './SpecificAccount.css';
import { getTransactionsByAccountName, deleteTransaction, getAccountBalance } from '../../../services/transactions';

class Transaction extends React.Component {

    handleDelete = async (transactionId) => {
        //console.log(transactionId)
        await deleteTransaction(transactionId)
        this.setState({})
    }

    render() {
        let transactions = getTransactionsByAccountName();
        let accName = window.location.pathname.substr(23);
        let accBalance = getAccountBalance(accName);
        console.log(transactions);
        return (
            <div style={{ marginLeft: "50px", }} >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{display:"flex"}}>
                        <div style={{ textAlign: "left" }}>
                            <Link to="/accounts"><IoMdArrowRoundBack style={{ fontSize: "50px", color: "black" }} /></Link>
                        </div>
                        <div className="AccountCard">
                            {accName}
                            <b style={{ fontSize: "larger" }}> ₹ {accBalance} </b>
                        </div>
                    </div>
                    <div style={{margin:"25px" , marginTop:"50px", marginRight:"500px"}}>
                        <Link to={`/accounts/addTransaction/${accName}`} className="AddTransactionButton">Add Transaction</Link>
                    </div>
                </div>

                {transactions.length !==0 ? transactions.map(item => {
                    return <div style={{ height: "50px", width: "75%", justifyContent: "space-around", display: "flex", border: "1px solid", margin: "10px", paddingTop: "20px" }}>
                        <div> {item.transactionType} </div>
                        <div> {item.description} </div>
                        <div> {item.date} </div>
                        <div> {item.amount} </div>
                        <div> {item.accountId} </div>
                        <MdDelete onClick={() => this.handleDelete(item.transactionId)} />
                        <Link to={`/accounts/editTransaction/${item.transactionId}`}><FiEdit style={{ color: "black" }} /></Link>
                    </div>
                })
                    :
                    <div><h2>NO RECENT TRANSACTIONS</h2></div>
                }

            </div>

        )
    }
}
export default Transaction;