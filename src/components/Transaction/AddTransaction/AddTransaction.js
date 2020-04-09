import React from 'react';
import { Redirect } from 'react-router-dom';
import { addTransaction, editTransaction, getTransactionById } from '../../../services/transactions';
import { getAccountNameById } from '../../../services/Accounts';
import { getAccounts } from '../../../services/Accounts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './AddTransaction.css';
import moment from "moment";

class AddTransaction extends React.Component {
    state = {
        transactionType: '',
        description: window.location.pathname.substr(0, 25) != '/accounts/addTransaction/' && window.location.pathname != '/accounts/addTransaction' ? getTransactionById()[0].description : '',
        amount: window.location.pathname.substr(0, 25) != '/accounts/addTransaction/' && window.location.pathname != '/accounts/addTransaction' ? getTransactionById()[0].amount : 0,
        date: '',
        addedTransaction: false,
        editedTransaction: false,
        accountName: window.location.pathname.substr(0, 25) != '/accounts/addTransaction/' && window.location.pathname != '/accounts/addTransaction' ? getAccountNameById(getTransactionById()[0].accountId) : 'Select an Account',
    }

    componentWillMount() {
        let transactionId = localStorage.getItem("transactionId");
        if (!transactionId) {
            localStorage.setItem("transactionId", 0)
        }
        let array = []
        if (window.location.pathname.substr(0, 25) != '/accounts/addTransaction/' && window.location.pathname != '/accounts/addTransaction') {
            array = getTransactionById();
        }
    }
    handleAddTransaction = async () => {
        let transaction = {
            transactionType: this.state.transactionType,
            description: this.state.description,
            amount: this.state.amount,
            date: moment(this.state.date).format('DD-MM-YYYY'),
            accountName: this.state.accountName
        }
       
        if ((transaction.accountName !== window.location.pathname.substr(25) && transaction.accountName === "Select an Account") || transaction.accountName === undefined) {
            transaction.accountName = window.location.pathname.substr(25);
            
        }
        if (window.location.pathname.substr(0, 25) == '/accounts/addTransaction/' || window.location.pathname == '/accounts/addTransaction') {
            let onAddTransaction = addTransaction(transaction)
            if (onAddTransaction)
                await this.setState({ addedTransaction: true })
            await this.setState({ addedTransaction: false })
        }
        else {

             editTransaction(transaction)
            await this.setState({ editedTransaction: true })
            await this.setState({ editedTransaction: false })
        }
    }
    handleTransactionType = (e) => {
        this.setState({ transactionType: e.currentTarget.value })
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
    handleDate = (date) => {
        this.setState({ date: date })
    }

    render() {
        let redirect = ''
        if (this.state.addedTransaction || this.state.editedTransaction)
            redirect = <Redirect to='/accounts'></Redirect>
        let userAccounts = getAccounts();
        let accountName = userAccounts.map(obj => {
            return (<option label={obj.accountName}>{obj.accountName}</option>);
        })

        let path = window.location.pathname;
        if (path.startsWith("/accounts/add")) {
            var accName = window.location.pathname.substr(25);
           
        }
        return (
            <div style={{ textAlign: "left", marginLeft: "50px" }}>
                <h2>NEW TRANSACTION</h2>
                <div style={{ margin: "10px" }}>
                    <input type="radio" value="income" checked={this.state.transactionType === "income"} style={{ margin: "5px" }} onChange={this.handleTransactionType} />
                    <label style={{ marginRight: "25px", fontWeight: "bold", fontSize: "large" }}>Income</label>

                    <input type="radio" value="expense" checked={this.state.transactionType === "expense"} style={{ margin: "5px" }} onChange={this.handleTransactionType} />
                    <label style={{ fontWeight: "bold", fontSize: "large" }}>Expense</label>
                </div>
                <div style={{ margin: "10px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "large" }}>Description</label>
                    <br />
                    <input type="text" onChange={this.handleDescription} value={this.state.description} className="InputField"></input>
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
                            <option label="Select an Account"></option>
                            {accountName}
                        </select>
                    </div>
                }

                <div style={{ margin: "10px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "large" }}>Amount</label>
                    <br />
                    <input type="text" onChange={this.handleAmount} value={this.state.amount} className="InputField"></input>
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
                {redirect}
            </div>
        )
    }
}
export default AddTransaction;