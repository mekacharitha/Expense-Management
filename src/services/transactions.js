import jwt from 'jsonwebtoken';
import {localStorageSetItem , localStorageGetItem} from './utils';

export const addTransaction = (transaction) => {

    let transactions = localStorageGetItem('transactions');
    let accounts = localStorageGetItem('accounts');
    let payload = jwt.decode(localStorageGetItem("token"));
    let accountIndex = accounts.findIndex(item => {
        return item.accountName === transaction.accountName
    })
    let transacId = localStorageGetItem('transactionId')
    transacId++
   
    let obj = {
        transactionId: transacId,
        accountId: accounts[accountIndex].accountId,
        transactionType: transaction.transactionType,
        description: transaction.description,
        amount: transaction.amount,
        date: transaction.date,
        userId: payload.userId
    }
    transactions.push(obj)
   // console.log(transactions)
    localStorageSetItem("transactions", transactions)
    localStorageSetItem('transactionId', transacId)
    let transactionIndex = transactions.findIndex(item => {
        return item.transactionId === transacId
    })
    if (transactions[transactionIndex].transactionType == "expense") {
      //console.log(accounts[accountIndex])
        accounts[accountIndex].accountBalance =Number( accounts[accountIndex].accountBalance) - Number(transactions[transactionIndex].amount)
        localStorageSetItem("accounts", accounts)
    }
    else {
        accounts[accountIndex].accountBalance = Number(accounts[accountIndex].accountBalance )+ Number(transactions[transactionIndex].amount)
        localStorageSetItem("accounts", accounts)
    }
    localStorageSetItem("transactions", transactions)
    localStorageSetItem('transactionId', transacId)
    return true
}



export const getTransactions = () => {
    let payload = jwt.decode(localStorageGetItem("token"));
    let transactions = localStorageGetItem("transactions");
    let userTransactions = transactions.map(obj => {
        if(obj.userId === payload.userId){
            return obj
        }
    })
    return userTransactions;
}



export const deleteTransaction = (transactionId) => {
    let transactions = localStorageGetItem('transactions');
    let transactionIndex = transactions.findIndex(item => {
        return item.transactionId === transactionId
    })
    let accounts = localStorageGetItem('accounts');
    let accountIndex = accounts.findIndex(item => {
        return item.accountId == transactions[transactionIndex].accountId
    })
    if (transactions[transactionIndex].transactionType === "expense") {
        accounts[accountIndex].accountBalance = Number(accounts[accountIndex].accountBalance) + Number(transactions[transactionIndex].amount)
        localStorageSetItem("accounts", accounts)
        transactions.splice(transactionIndex, 1)
        localStorageSetItem("transactions", transactions);
    }
    else {
        accounts[accountIndex].accountBalance = Number(accounts[accountIndex].accountBalance) -Number(transactions[transactionIndex].amount)
        localStorageSetItem("accounts", accounts)
        transactions.splice(transactionIndex, 1)
        localStorageSetItem("transactions", transactions);
    }
}