// these are action type
export const CREATE = 'CREATE'
export const UPDATE = 'UPDATE'
export const DELETE = 'DELETE'
export const LIKE = 'LIKE'
export const SEARCH = 'SEARCH' 


// for update a record / post
export const SET_ID = 'SET_ID'
export const ERASE_ID = 'ERASE_ID'


// for login and regiteration
export const AUTH = 'AUTH'
export const GOOGLEAUTH = 'GOOGLEAUTH'


//for spy Reducer / spy local Storaeg Token
export const FIRSTLOAD = 'FIRSTLOAD'
export const EVERLOAD = 'EVERLOAD'
export const LOGOUT = 'LOGOUT'


// for Single Post
export const FETCH_SINGLE = 'FETCH_SINGLE'
export const RESET_SINGLE = 'RESET_SINGLE'


// Parent comment Action 
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
// child Comment
export const CHILD_COMMENT = 'CHILD_COMMENT'