import jwt from 'jsonwebtoken';
import {localStorageSetItem , localStorageGetItem} from './utils';

export const addAccount = (accountName , accountBalance) => {

    let accounts = localStorageGetItem('accounts');  
    let payload=jwt.decode(localStorageGetItem("token"));            
    let accountIndex = accounts.findIndex(item => {
        return ( item.accountName === accountName && item.userId === payload.userId)
    })
    if (accountIndex === -1) {
       // console.log(payload.userId)
        let accountId=localStorageGetItem('accountId')
        //console.log(accountBalance);
        let obj={
               accountId:++accountId,
               accountName:accountName,
               accountBalance:accountBalance,
               userId:payload.userId
        }
        accounts.push(obj)
        localStorageSetItem("accounts" ,accounts)
        localStorageSetItem('accountId',accountId)
        return true
    }
    return false

} 

export const getAccounts = () => {
    let accounts = localStorageGetItem('accounts');
    let payload=jwt.decode(localStorageGetItem("token"));
    let userAccounts = accounts.filter(obj => {
        return (obj.userId === payload.userId)
    })
    return userAccounts ;
}

export const getAccountNameById = (accId) => {
    let accounts = localStorageGetItem('accounts');
    let payload=jwt.decode(localStorageGetItem("token"));
    let accName = accounts.filter(obj => {
        return obj.accountId == accId && obj.userId == payload.userId
    })
    //console.log(accName[0].accountName);
    return accName[0].accountName;
}