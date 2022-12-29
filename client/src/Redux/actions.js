import * as api from '../api/index'
import { CREATE, UPDATE, LIKE, DELETE, SET_ID, ERASE_ID, SEARCH, FETCH_SINGLE, CREATE_COMMENT, FETCH_COMMENT, UPDATE_COMMENT, CHILD_COMMENT, NEW_CHILD } from './actionTypes'

export const getPostsBySearch = (query) => async(dispatch) =>{
    try {
        const { data } = await api.searchPost(query)
        if(data['message']){
           return dispatch ({ type: SEARCH, payload: [] })
        }
        else return dispatch ({ type: SEARCH, payload: data})
    } catch (err) {
        console.log(err.message); 
        dispatch({type: 'END'})
        return dispatch({ type : 'SEND', payload : { message : "Something Went Wrong, Please Try Again Later", mode : 'error' } });
    }
} 

export const createPost = (post) => async (dispatch)=> {
    try {
        dispatch({ type : 'SEND', payload : { message : "Post Uploading, Please Wait", mode : 'info' } });
        const { data } = await api.createPost(post);
        dispatch({type: CREATE, payload: data});
        return dispatch({ type : 'SEND', payload : { message : "Post Successfully Created, Now Enjoy", mode : 'success' } });
    } catch (error) {
        console.log(error.message);
        return dispatch({ type : 'SEND', payload : { message : "Something Went Wrong, Please Try Again Later", mode : 'error' } });
    }
}

// update data without Img 
export const updatePost = (updata, id)=> async (dispatch) => {
    try {
        dispatch({ type : 'SEND', payload : { message : "Post Updating, Please Wait", mode : 'info' } });
        const { data } = await api.updatePost(updata, id)
        dispatch({ type: UPDATE, payload: data})
        return dispatch({ type : 'SEND', payload : { message : "Post Successfully Updated, Now Enjoy", mode : 'success' } });
    } catch (error) {
        console.log(error)
        return dispatch({ type : 'SEND', payload : { message : "Something Went Wrong, Please Try Again Later", mode : 'error' } });
    }
}

// update data with img
export const updatePostWithImg = (updata, id)=> async (dispatch) => {
    try {
        const { data } = await api.updatePostWithImg(updata, id)
        return dispatch({ type: UPDATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}


export const deletePost = (id)=> async (dispatch) => {
    try {
        dispatch({ type : 'SEND', payload : { message : "Post Deleting, Please Wait", mode : 'warning' } });
        const { data } = await api.deletePost(id)
        dispatch({ type: DELETE, payload: data._id}) 
        return dispatch({ type : 'SEND', payload : { message : "Post Deleted, Please Created New Post", mode : 'info' } });
    } catch (error) {
        console.log(error)
        return dispatch({ type : 'SEND', payload : { message : "Something Went Wrong, Please Try Again Later", mode : 'error' } });
    }
}
 

export const likePost = (id)=> async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        return dispatch({ type: LIKE, payload: data})
    } catch (error) {
        console.log(error)
    }
} 
 

export const singlePost = (id)=> async (dispatch) => {
    try {
        const { data } = await api.singlePost(id)
        return dispatch({ type: FETCH_SINGLE, payload: data})
    } catch (error) {
        console.log(error)
    }
} 
 

export const getComments = (details) => async (dispatch) => {
    try {
        const { data } = await api.getComments(details)
        if (details && details['page'] && details['page'] > 1) { 
            return dispatch({type: 'EXRTA_COMMENT', payload: data})
        }
        else return dispatch({type: FETCH_COMMENT, payload: data})
    } catch (err) {
        console.log(err);
    }
} 

export const createComment = (newData, postID) => async (dispatch) => {
    try {
            const { data } = await api.postComment(newData, postID)
            if(data['parentID']){
                dispatch({type : NEW_CHILD, payload : data})
                return dispatch({type : UPDATE_COMMENT, payload : data})
            }
            else {
             return dispatch({type : CREATE_COMMENT, payload : data}) 
            }
                
    } catch (err) {
        console.log(err);
    }
}

export const updateComment = (updData, postID) => async (dispatch) => {
    try {
        const { data } = await api.updateComment(updData, postID)
        return dispatch({type: UPDATE_COMMENT, payload: data})
    } catch (err) {
        console.log(err);
    }
}
 

export const getCommentChild = (newData) => async (dispatch)  => {
    try {
        const { data } = await api.getCommentChild(newData)
        return dispatch({type: CHILD_COMMENT, payload: data})
    } catch (err) {
        console.log(err);
    }
}

export const setPostID = (id)=>{
    return { type: SET_ID, payload : id}
}

export const erasePostID = ()=>{
    return { type: ERASE_ID }
}
 