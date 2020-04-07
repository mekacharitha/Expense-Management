import jwt from 'jsonwebtoken';
import {localStorageSetItem , localStorageGetItem} from './utils';

export const createUser = (user) => {

    const users = localStorageGetItem('users');  
    
    if(!users){
        localStorageSetItem('users', []);
    }

    let userIndex = users.findIndex(item => {
        return item.userName === user.userName
    })
    if (userIndex !== -1) {
        throw new Error("User already exists");
    }
    users.push(user);
   
   localStorageSetItem('users' , users);
   localStorageSetItem("userId" ,user.userId)

}


export const verifyUser = (user) => {

    const users = localStorageGetItem('users');                
    let userIndex = users.findIndex(item => {
        return item.userName === user.userName && item.password === user.password
    })
    if (userIndex !== -1) {
        console.log(users[userIndex].userId);
        let token = jwt.sign({ userName: user.userName , userId: users[userIndex].userId }, "my secret token")
        localStorageSetItem("token" ,token)
        return true
    }
    return false

}