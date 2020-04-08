import jwt from 'jsonwebtoken';
import { localStorageSetItem, localStorageGetItem } from './utils';

export const addTransaction = (transaction) => {
   // console.log(transaction);
    let transactions = localStorageGetItem('transactions');
    let accounts = localStorageGetItem('accounts');
    let payload = jwt.decode(localStorageGetItem("token"));
    let accountIndex = accounts.findIndex(item => {
        return item.accountName == transaction.accountName && item.userId === payload.userId
    })
    let transacId = localStorageGetItem('transactionId')
    transacId++
    //console.log(accounts[0]);
    //console.log(accountIndex);
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
        accounts[accountIndex].accountBalance = Number(accounts[accountIndex].accountBalance) - Number(transactions[transactionIndex].amount)
        localStorageSetItem("accounts", accounts)
    }
    else {
        accounts[accountIndex].accountBalance = Number(accounts[accountIndex].accountBalance) + Number(transactions[transactionIndex].amount)
        localStorageSetItem("accounts", accounts)
    }
    localStorageSetItem("transactions", transactions)
    localStorageSetItem('transactionId', transacId)
    return true
}


export const getTransactions = () => {
    
    let payload = jwt.decode(localStorageGetItem("token"));
    let transactions = localStorageGetItem("transactions");
    let userTransactions = transactions.filter(obj => {
        return (obj.userId === payload.userId) 
    })
    return userTransactions;
}

export const getTransactionsByAccountName = () => {
    let transactionByAccountName = [] ;
    let transactions = localStorageGetItem("transactions");
    let payload = jwt.decode(localStorageGetItem("token"));
    let accounts = localStorageGetItem("accounts");

    let accountIndex = accounts.findIndex(item => {
        return (item.accountName === window.location.pathname.substr(23) && item.userId == payload.userId)
    })
   // console.log(accountIndex);
    if (accountIndex != -1) {
        transactionByAccountName = transactions.filter(obj => {
            return obj.accountId == accounts[accountIndex].accountId
        })
    }
    //console.log(transactionByAccountName)
    return transactionByAccountName;
}

export const getAccountBalance = (accountName) => {
    let payload = jwt.decode(localStorageGetItem("token"));
    let accounts = localStorageGetItem("accounts");
    let accBalance = accounts.map(obj => {
        if(obj.accountName == accountName && obj.userId ===payload.userId)
            return obj.accountBalance;
    })
   // console.log(accBalance);
    return accBalance;
    
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
        accounts[accountIndex].accountBalance = Number(accounts[accountIndex].accountBalance) - Number(transactions[transactionIndex].amount)
        localStorageSetItem("accounts", accounts)
        transactions.splice(transactionIndex, 1)
        localStorageSetItem("transactions", transactions);
    }
}

export const getTransactionById = (transacId)=>{
    let transactions = localStorageGetItem('transactions');
    let transaction = transactions.filter(obj => {
        return (obj.transactionId == transacId)
    })
    //console.log(transaction);
    return transaction;
    
}

export const editTransaction = (transaction) => {
    let payload = jwt.decode(localStorageGetItem("token"));
    let transactionId = Number(window.location.pathname.substr(17))
    let transactions = localStorageGetItem('transactions');
    let transactionIndex = transactions.findIndex(item => {
        return item.transactionId === transactionId
    })
    transaction = { ...transaction, transactionId: Number(window.location.pathname.substr(17)), accountId: transactions[transactionIndex].accountId, userId: payload.userId }
    let accounts = localStorageGetItem('accounts');
    let accountIndex = accounts.findIndex(item => {
        return item.accountId === transactions[transactionIndex].accountId
    })
    if (transactions[transactionIndex].transactionType == "expense") {
        accounts[accountIndex].accountBalance = Number(accounts[accountIndex].accountBalance) + Number(transactions[transactionIndex].amount)
        localStorageSetItem("accounts", accounts)
    }
    else {
        accounts[accountIndex].accountBalance = Number(accounts[accountIndex].accountBalance) - Number(transactions[transactionIndex].amount)
        localStorageSetItem("accounts", accounts)
    }
    if (transaction.transactionType === "expense")
        accounts[accountIndex].accountBalance = Number(accounts[accountIndex].accountBalance) - Number(transaction.amount)
    else
        accounts[accountIndex].accountBalance = Number(accounts[accountIndex].accountBalance) + Number(transaction.amount)
   localStorageSetItem("accounts", accounts)
    transactions.splice(transactionIndex, 1)
    transactions.splice(transactionIndex, 0, transaction)
    localStorageSetItem("transactions", transactions)
}