import { combineReducers } from "redux";
import { CREATE, UPDATE, LIKE, DELETE, SET_ID, ERASE_ID, SEARCH, RESET_SINGLE, FETCH_SINGLE, FETCH_COMMENT, UPDATE_COMMENT, CHILD_COMMENT, CREATE_COMMENT, NEW_CHILD, RESET } from './actionTypes'
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
        
        case RESET: 
            return []
            
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

        case 'EXRTA_COMMENT':
            return [{...payload, data : [...state[0]['data'], ...payload['data']] }]
        
        case CREATE_COMMENT:
            return [{...state[0] , data : [payload, ...state[0]['data']] }]

        case UPDATE_COMMENT: 
            return [{...state[0] , data : [...state[0]['data'].filter((comment) => comment._id === payload.parentID ? (comment['childExist'] = true) : comment )] }] 

        default:
            return state
    }
}
 

const childState = []

const childReducer = (state=childState, {type, payload}) => { 
    switch (type) {
        case CHILD_COMMENT: 
            if(state && state[0] && state[0]['commentID'] && state[0]['commentID'] === payload['commentID'])
                return [{...payload, data: { [state[0]['commentID']] : [ ...state[0]['data'][state[0]['commentID']], ...payload['data'][payload['commentID']] ] } }]
            return [payload]

        case NEW_CHILD:
            if (state.length === 0)  
                return [{currentPage : 1, totalPage : 1, data : { [payload['parentID']] : [payload]}, commentID : [payload['parentID']]}]
            return [{...state[0], data: { [state[0]['commentID']] : [payload, ...state[0]['data'][state[0]['commentID']] ]} }]

        default:
            return state
    }
}


const tagUserState = null

const tagUserReducer = (state=tagUserState, {type, payload}) => { 
    switch (type) {
        case 'SET_TAG': 
            return payload

        case 'RESET_TAG':
            return null

        default:
            return state
    }
}

const loading = true

const loadingReducer = (state = loading, {type, payload}) => {
    switch (type) {
        case 'START':
            return true
        
        case 'END':
            return false

        default:
            return state
    }
}


const alert = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    mode: 'success'
  }

const alertReducer = (state = alert, {type, payload}) => {
    switch (type) {
        case 'READY':
            return {...state, ...payload}

        case 'SEND':
            return {...state, open : true, ...payload}

        case 'STOP':
            return {...state, open: false}
    
        default:
            return state
    }
}

export default combineReducers({postReducer, updateIdReducer, authReducer, spyReducer, singlePost, commentReducer, childReducer, tagUserReducer, alertReducer, loadingReducer})