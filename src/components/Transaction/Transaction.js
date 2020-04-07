import React from 'react';
import { deleteTransaction } from '../../services/transactions';
import { Redirect, Link } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import {getTransactions} from '../../services/transactions';


class Transaction extends React.Component {
    
    handleDelete = async (transactionId) => {
        await deleteTransaction(transactionId)
        this.props.onDelete()
        this.forceUpdate()
    }
    render() {
        let transactions=getTransactions();
        return (
            <div style={{ marginLeft: "50px" }} >
                        {transactions.map(item=>{
                    return <div style={{ height: "50px", width: "75%", justifyContent: "space-around", display: "flex", border: "1px solid" ,margin:"10px",paddingTop:"20px"}}>
                    <div> {item.transactionType} </div>
                    <div> {item.description} </div>
                    <div> {item.date} </div>
                    <div> {item.amount} </div>
                    <div> {item.accountId} </div>
                    <MdDelete onClick={()=>this.handleDelete(item.transactionId)} />
                    <Link to='/addTransaction'><FiEdit /></Link>
                </div>
                })}

                    </div>
            
        )
    }
}
export default Transaction;