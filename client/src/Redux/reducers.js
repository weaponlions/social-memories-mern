import { combineReducers } from "redux";
import { CREATE, UPDATE, LIKE, DELETE, SET_ID, ERASE_ID, SEARCH, RESET_SINGLE, FETCH_SINGLE, FETCH_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, CHILD_COMMENT, CREATE_COMMENT } from './actionTypes'
import { authReducer, spyReducer } from "./auth";


const postState = []
 
const postReducer = (state = postState, {type, payload}) =>{
    switch (type) {
        case CREATE: 
            if (state[0].length === 0) {
                return [{totalPage: 1, data: [payload], currentPage: 1 }]
            } 
            return [{...state[0], data: [payload, ...state[0]['data']] }]

        case UPDATE:
            return [{...state[0], data: state[0]['data'].map((post) => post._id === payload._id ? payload : post ) }]

        case SEARCH: 
            return [payload]

        case DELETE:
            // eslint-disable-next-line
            return [{...state[0], data: state[0]['data'].filter((post) => {if(post._id !== payload) return post}) }]
        
        case LIKE:
            return [{...state[0], data: state[0]['data'].map((post) => post._id === payload._id ? payload : post ) }] 

        default:
            return state
    }
}

// reducer for single Post
const singleData = null

const singlePost = (state=singleData, {type , payload} ) => {
    switch (type) {
        case FETCH_SINGLE:
             return payload
    
        case RESET_SINGLE:
             return null
        default:
            return state
    }
}

// these step for current post id reach to form page use for update data
const myID = null
 
const updateIdReducer = (state=myID, {type, payload}) => {
    switch (type) { 
        case SET_ID:
            return payload

        case ERASE_ID:
            return null
            
        default:
            return state 
    }
}


// comment Section

const commentState = []

const commentReducer = (state=commentState, {type, payload}) => {
    switch (type) {
        case FETCH_COMMENT: 
            return [payload]
        
        case CREATE_COMMENT:
            console.log(payload);
            return state

        case UPDATE_COMMENT:
            return state

        case DELETE_COMMENT:
            return state
    
        default:
            return state
    }
}
 

// const childState = []

// const childReducer = (state=commentState, {type, payload}) => {
//     switch (type) {
//         case CHILD_COMMENT:
            
//             break; 
//         default:
//             return state
//     }
// }

export default combineReducers({postReducer, updateIdReducer, authReducer, spyReducer, singlePost, commentReducer})