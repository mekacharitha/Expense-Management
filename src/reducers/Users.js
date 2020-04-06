const initialState = {
    userName: "",
    password: "",
    userId:"",
}

const userReducer = (state=initialState , action) => {
    switch(action.type){
        case "USERNAMECHANGE" : {
            return {
                ...state,
                userName: action.payload
            }
        }

        case "PASSWORDCHANGE" : {
            return {
                ...state,
                password: action.payload
            }
        }

        default : return state;
    }
}

export default userReducer ;