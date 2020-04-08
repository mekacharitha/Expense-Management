import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { addTransaction, editTransaction, getTransactionById } from '../../../services/transactions';
import { getAccounts } from '../../../services/Accounts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './AddTransaction.css';

class AddTransaction extends React.Component {
    state = {
        transactionType: '',
        description: '',
        amount: 0,
        date: new Date(),
        addedTransaction: false,
        editedTransaction: false,
        accountName: '',
        payerName: "",
        
    }
    componentWillMount() {
        let transactionId = localStorage.getItem("transactionId");
        if (!transactionId) {
            localStorage.setItem("transactionId", 0)
        }
    }
    
    handlePayer = (e) => {
        this.setState({ payerName: e.target.value })
    }

    handleAddTransaction = async () => {
        let transaction = {
            transactionType: this.state.transactionType,
            description: this.state.description,
            amount: this.state.amount,
            date: this.state.date,
            accountName: this.state.accountName
        }
        if(transaction.accountName === ""){
            transaction.accountName = window.location.pathname.substr(16); 
        }

        if (window.location.pathname.startsWith('/addTransaction') ) {
            let onAddTransaction = addTransaction(transaction)
            if (onAddTransaction)
                await this.setState({ addedTransaction: true })
            await this.setState({ addedTransaction: false })
        }
        else {
            let onEditTransaction = editTransaction(transaction)
            await this.setState({ editedTransaction: true })
            await this.setState({ editedTransaction: false })
        }
    }


    handleTransactionType = (e) => {
        this.setState({ transactionType: e.target.value })
    }
    handleAccountName = (e) => {
        this.setState({ accountName: e.target.value })
    }
    handleDescription = (e) => {
        this.setState({ description: e.target.value })
    }
    handleAmount = (e) => {
        this.setState({ amount: e.target.value })
    }
    handleDate = date => {
        this.setState({ date: date })
    }
    render() {
        let path = window.location.pathname;
        let transaction = null;
        if (path.startsWith("/edit")) {
            var transcId = window.location.pathname.substr(17);
            transaction = getTransactionById(transcId);
            console.log(transaction);

        }
        else {
            var accName = window.location.pathname.substr(16);
        }

        let redirect = "";
        if (this.state.addedTransaction || this.state.editedTransaction)
            redirect = <Redirect to='/accounts'></Redirect>

        let userAccounts = getAccounts();
        let accountName = userAccounts.map(obj => {
            return (<option label={obj.accountName}>{obj.accountName}</option>);
        })
        return (
            <div style={{ textAlign: "left", marginLeft: "50px" }}>
                <h2>NEW TRANSACTION</h2>
                {transaction ? 
                    <div>
                    {transaction[0].transactionType == "income" ? <div>
                    <input type="radio" id="income" value="income" checked="checked" style={{ margin: "5px" }} onChange={this.handleTransactionType} />
                    <label for="income" style={{ marginRight: "25px", fontWeight: "bold", fontSize: "large" }}>Income</label>

                    <input type="radio" id="expense" value="expense" style={{ margin: "5px" }} onChange={this.handleTransactionType} />
                    <label for="expense" style={{ fontWeight: "bold", fontSize: "large" }}>Expense</label>
                </div> 
                :
                <div>
                    <input type="radio" id="income" value="income" style={{ margin: "5px" }} onChange={this.handleTransactionType} />
                    <label for="income" style={{ marginRight: "25px", fontWeight: "bold", fontSize: "large" }}>Income</label>

                    <input type="radio" id="expense" value="expense" checked="checked" style={{ margin: "5px" }} onChange={this.handleTransactionType} />
                    <label for="expense" style={{ fontWeight: "bold", fontSize: "large" }}>Expense</label>
                </div>
                 }

                    <div style={{ margin: "10px" }}>
                        <label style={{ fontWeight: "bold", fontSize: "large" }}>Payee / Payer</label>
                        <br />
                        <input type="text" onChange={this.handlePayer} className="InputField" ></input>
                    </div>

                    <div style={{ margin: "10px" }}>
                        <label style={{ fontWeight: "bold", fontSize: "large" }}>Description</label>
                        <br />
                        <input type="text" onChange={this.handleDescription} className="InputField" value={transaction[0].description}></input>
                    </div>

                    
                        <div style={{ margin: "10px" }}>
                            <label style={{ fontWeight: "bold", fontSize: "large" }}>Account</label>
                            <br />
                            <select value={this.state.accountName} onChange={this.handleAccountName} className="InputField">
                                <option label={transaction[0].accountName}></option>
                                {accountName}
                            </select>
                        </div>

                    <div style={{ margin: "10px" }}>
                        <label style={{ fontWeight: "bold", fontSize: "large" }}>Amount</label>
                        <br />
                        <input type="text" onChange={this.handleAmount} className="InputField" value={transaction[0].amount}></input>
                    </div>

                    <div style={{ margin: "10px" }}>
                        <label style={{ fontWeight: "bold", fontSize: "large" }}>Date</label>
                        <br />
                        {/* <input type="text" onChange={this.handleDate} className="InputField" value={transaction[0].date}></input> */}
                        <DatePicker
                            dateFormat='dd-mm-yyyy'
                            selected={this.state.date}
                            onChange={this.handleDate}
                            value={this.state.date}
                            className="InputField"
                        />
                    </div>

                    <button onClick={this.handleAddTransaction} className="AddTranscButton" style={{ marginLeft: "50px" }}> Add Transaction</button>
                </div>
                

                :
                    <div>
                        <div>
                            <input type="radio" id="income" value="income" style={{ margin: "5px" }} onChange={this.handleTransactionType} />
                            <label for="income" style={{ marginRight: "25px", fontWeight: "bold", fontSize: "large" }}>Income</label>

                            <input type="radio" id="expense" value="expense" style={{ margin: "5px" }} onChange={this.handleTransactionType} />
                            <label for="expense" style={{ fontWeight: "bold", fontSize: "large" }}>Expense</label>
                        </div>

                        <div style={{ margin: "10px" }}>
                            <label style={{ fontWeight: "bold", fontSize: "large" }}>Payee / Payer</label>
                            <br />
                            <input type="text" onChange={this.handlePayer} className="InputField" ></input>
                        </div>

                        <div style={{ margin: "10px" }}>
                            <label style={{ fontWeight: "bold", fontSize: "large" }}>Description</label>
                            <br />
                            <input type="text" onChange={this.handleDescription} className="InputField" ></input>
                        </div>

                        {accName ?
                            <div style={{ margin: "10px" }}>
                                <label style={{ fontWeight: "bold", fontSize: "large" }}>Account</label>
                                <br />
                                <select value={accName} onChange={this.handleAccountName} className="InputField" disabled>
                                    <option label={accName} ></option>
                                </select>
                            </div>
                            :
                            <div style={{ margin: "10px" }}>
                                <label style={{ fontWeight: "bold", fontSize: "large" }}>Account</label>
                                <br />
                                <select value={this.state.accountName} onChange={this.handleAccountName} className="InputField">
                                    <option label="Select an Account "></option>
                                    {accountName}
                                </select>
                            </div>
                        }

                        <div style={{ margin: "10px" }}>
                            <label style={{ fontWeight: "bold", fontSize: "large" }}>Amount</label>
                            <br />
                            <input type="text" onChange={this.handleAmount} className="InputField" ></input>
                        </div>

                        <div style={{ margin: "10px" }}>
                            <label style={{ fontWeight: "bold", fontSize: "large" }}>Date</label>
                            <br />
                            <DatePicker
                            dateFormat='dd-MM-yyyy'
                            selected={this.state.date}
                            onChange={this.handleDate}
                            value={this.state.date}
                            className="InputField"
                        />
                        </div>

                        <button onClick={this.handleAddTransaction} className="AddTranscButton" style={{ marginLeft: "50px" }}> Add Transaction</button>
                    </div>
                }
                {redirect}
            </div>
        )
    }
}
export default AddTransaction;