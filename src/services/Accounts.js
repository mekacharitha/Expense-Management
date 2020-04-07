import jwt from 'jsonwebtoken';
import {localStorageSetItem , localStorageGetItem} from './utils';

export const addAccount = (accountName , accountBalance) => {

    let accounts = localStorageGetItem('accounts');              
    let accountIndex = accounts.findIndex(item => {
        return item.accountName === accountName
    })
    if (accountIndex === -1) {
        let payload=jwt.decode(localStorageGetItem("token"));
       // console.log(payload.userId)
        let accountId=localStorageGetItem('accountId')
        console.log(accountBalance);
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
    let userAccounts = accounts.map(obj => {
        if(obj.userId === payload.userId){
            return obj;
        }
    })
    return userAccounts ;
}