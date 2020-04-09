import React from 'react';
import { deleteTransaction } from '../../services/transactions';
import { Link } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { getTransactions } from '../../services/transactions';
import { getAccountNameById } from '../../services/Accounts';
import moment from "moment";
import './Transaction.css';


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
                   
                    return <div style={{ height: "50px", width: "75vw", justifyContent: "space-around", display: "flex", border: "1px solid",fontSize:"20px", margin: "10px", padding: "20px" }}>
                        <div className="TransactionItem"> {item.transactionType} </div>
                        <div className="TransactionItem"> {item.description} </div>
                        {/* <div className="TransactionItem"> {moment(item.date).format('DD-MM-YYYY')}</div> */}
                        <div className="TransactionItem"> {item.date}</div>
                        <div className="TransactionItem"> {item.amount} </div>
                        <div className="TransactionItem">{getAccountNameById(item.accountId)}</div>
                        <MdDelete onClick={() => this.handleDelete(item.transactionId)} />
                        <Link to={`/accounts/editTransaction/${item.transactionId}`}><FiEdit style={{ color: "black" }} /></Link>
                    </div>
                })}

            </div>

        )
    }
}
export default Transaction;