import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { addTransaction , editTransaction} from '../../../services/transactions';
import { getAccounts } from '../../../services/Accounts';
import './AddTransaction.css';

class AddTransaction extends React.Component {
    state = {
        transactionType: '',
        description: '',
        amount: 0,
        date: '',
        addedTransaction: false,
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
        if (window.location.pathname == '/addTransaction') {
            let onAddTransaction = addTransaction(transaction)
            if (onAddTransaction)
                await this.setState({ addedTransaction: true })
            else
                await this.setState({ addedTransaction: false })
        }
        else {
            let onEditTransaction = editTransaction(transaction)
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
    handleDate = (e) => {
        this.setState({ date: e.target.value })
    }
    render() {
        let userAccounts = getAccounts();
        let accountName = userAccounts.map(obj => {
            return (<option label={obj.accountName}>{obj.accountName}</option>);
        })
        return (
            <div style={{ textAlign: "left", marginLeft: "50px" }}>
                <h2>NEW TRANSACTION</h2>
                <div>
                    <input type="radio" id="income" value="income" style={{ margin: "5px" }} onChange={this.handleTransactionType} />
                    <label for="income" style={{ marginRight: "25px", fontWeight: "bold", fontSize: "large" }}>Income</label>

                    <input type="radio" id="expense" value="expense" style={{ margin: "5px" }} onChange={this.handleTransactionType} />
                    <label for="expense" style={{ fontWeight: "bold", fontSize: "large" }}>Expense</label>
                </div>

                <div style={{ margin: "10px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "large" }}>Payee / Payer</label>
                    <br />
                    <input type="text" onChange={this.handlePayer} className="InputField"></input>
                </div>

                <div style={{ margin: "10px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "large" }}>Description</label>
                    <br />
                    <input type="text" onChange={this.handleDescription} className="InputField"></input>
                </div>

                <div style={{ margin: "10px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "large" }}>Account</label>
                    <br />
                    <select value={this.state.accountName} onChange={this.handleAccountName} className="InputField">
                        <option label="Select an Account "></option>
                        {accountName}
                    </select>
                </div>

                <div style={{ margin: "10px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "large" }}>Amount</label>
                    <br />
                    <input type="text" onChange={this.handleAmount} className="InputField"></input>
                </div>

                <div style={{ margin: "10px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "large" }}>Date</label>
                    <br />
                    <input type="text" onChange={this.handleDate} className="InputField"></input>
                </div>

                <button onClick={this.handleAddTransaction} className="AddTranscButton" style={{ marginLeft: "50px" }}> Add Transaction</button>

                {/* {this.state.addedTransaction ? <Redirect to='/accounts'></Redirect> : <Redirect to='/addtransaction'></Redirect>} */}
            </div>
        )
    }
}
export default AddTransaction;