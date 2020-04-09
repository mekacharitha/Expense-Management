const initialState = {
    userName: "",
    password: "",
    userId: "",
    token: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERNAMECHANGE": {
            return {
                ...state,
                userName: action.payload
            }
        }

        case "PASSWORDCHANGE": {
            return {
                ...state,
                password: action.payload
            }
        }

        case "SET_TOKEN": {
            return {
                ...state,
                token: action.payload.token,
            }
        }

        case "REMOVE_TOKEN": {
            return {
                ...state,
                token: action.payload,
            }
        }

        default: return state;
    }
}

export default userReducer;