import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { addTransaction } from '../../../services/transactions'
class AddTransaction extends React.Component {
    state = {
        transactionType: '',
        description: '',
        amount: 0,
        date: '',
        addedTransaction: false,
        accountName: ''
    }
    componentWillMount() {
        let transactionId = localStorage.getItem("transactionId");
        if (!transactionId) {
            localStorage.setItem("transactionId", 0)
        }
    }
    handleAddTransaction = async () => {
        let transaction = {
            transactionType: this.state.transactionType,
            description: this.state.description,
            amount: this.state.amount,
            date: this.state.date,
            accountName: this.state.accountName
        }
        let onAddTransaction = addTransaction(transaction)
        if (onAddTransaction)
            await this.setState({ addedTransaction: true })
        else
            await this.setState({ addedTransaction: false })
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
        return (
            <div>
                <input type="text" placeholder="Transaction Type" onChange={this.handleTransactionType}></input>
                <input type="text" placeholder="Description" onChange={this.handleDescription}></input>
                <input type="text" placeholder="amount" onChange={this.handleAmount}></input>
                <input type="text" placeholder="Account Name" onChange={this.handleAccountName}></input>
                <input type="text" placeholder="Date" onChange={this.handleDate}></input>
                <button onClick={this.handleAddTransaction}>Add Transaction</button>
                
                {this.state.addedTransaction ? <Redirect to='/accounts'></Redirect> : <Redirect to='/addtransaction'></Redirect>}
            </div>
        )
    }
}
export default AddTransaction;