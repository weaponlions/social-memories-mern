import * as api from '../api/index'
import { CREATE, UPDATE, LIKE, DELETE, SET_ID, ERASE_ID, SEARCH, FETCH_SINGLE, CREATE_COMMENT, FETCH_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, CHILD_COMMENT } from './actionTypes'

export const getPostsBySearch = (query) => async(dispatch) =>{
    try {
        const { data } = await api.searchPost(query)
        if(data['message']){ 
           return dispatch ({ type: SEARCH, payload: [] })
        }
        else return dispatch ({ type: SEARCH, payload: data})
    } catch (err) {
        console.log(err.message);
    }
} 

export const createPost = (post) => async (dispatch)=> {
    try {  
        const { data } = await api.createPost(post) 
        return dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

// update data without Img 
export const updatePost = (updata, id)=> async (dispatch) => {
    try {
        const { data } = await api.updatePost(updata, id)
        return dispatch({ type: UPDATE, payload: data})
    } catch (error) {
        console.log(error)
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
        const { data } = await api.deletePost(id)
        return dispatch({ type: DELETE, payload: data._id}) 
    } catch (error) {
        console.log(error)
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
        return dispatch({type: FETCH_COMMENT, payload: data})
    } catch (err) {
        console.log(err);
    }
} 

export const createComment = (newData, postID) => async (dispatch) => {
    try {
            const { data } = await api.postComment(newData, postID)
            console.log(data);
            return dispatch({type : CREATE_COMMENT, payload : data})
    } catch (err) {
        console.log(err);
    }
}

export const updateComment = (updData, postID) => async (dispatch) => {
    try {
        const { data } = await api.updateComment(updData, postID)
        console.log(data);
        return dispatch({type: UPDATE_COMMENT, payload: data})
    } catch (err) {
        console.log(err);
    }
}

export const removeComment = (commentID) => async (dispatch) => {
    try {
        const rmComment = await api.removeComment(commentID)
        console.log(rmComment);
        return dispatch({type: DELETE_COMMENT, payload: rmComment})
    } catch (err) {
        console.log(err);
    }
}

export const getCommentChild = (data) => async (dispatch)  => {
    try {
        const childComments = await api.getCommentChild(data)
        console.log(childComments);
        return dispatch({type: CHILD_COMMENT, payload: childComments})
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
 