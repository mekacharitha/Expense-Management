import React from 'react';
import { deleteTransaction } from '../../services/transactions';
import { Link } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { getTransactions } from '../../services/transactions';
import { getAccountNameById } from '../../services/Accounts';


class Transaction extends React.Component {

    handleDelete = async (transactionId) => {
        await deleteTransaction(transactionId)
        this.props.onDelete()
        this.forceUpdate()
    }
    render() {
        let transactions = getTransactions();

        return (
            <div style={{ marginLeft: "50px" }} >
                {transactions.map(item => {
                    return <div style={{ height: "50px", width: "75vw", justifyContent: "space-around", display: "flex", border: "1px solid", margin: "10px", paddingTop: "20px" }}>
                        <div> {item.transactionType} </div>
                        <div> {item.description} </div>
                        <div> {item.date} </div>
                        <div> {item.amount} </div>
                        <div>{getAccountNameById(item.accountId)}</div>
                        <MdDelete onClick={() => this.handleDelete(item.transactionId)} />
                        <Link to={`/editTransaction/${item.transactionId}`}><FiEdit style={{ color: "black" }} /></Link>
                    </div>
                })}

            </div>

        )
    }
}
export default Transaction;