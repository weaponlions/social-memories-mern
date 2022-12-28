import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'

axios.interceptors.request.use((req) => {
  if (localStorage.getItem('keywords')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('keywords')).token}`; 
  } 
  return req;
});

const url = '/posts'

export const searchPost = (query)=> axios.get(`${url}/search=${ query?.title ? query.title : null }/${ query?.tags ? query.tags : null }/${ query?.page ? query.page : 1}`)

export const singlePost = (id) => axios.get(`${url}/${id}`)

export const createPost = (newPost)=> axios.post(url, newPost, { headers : { 'Content-Type' : 'multipart/form-data' }} )

export const updatePostWithImg = (data , id)=> axios.post(`${url}/${id}`, data ,{ headers : { 'Content-Type' : 'multipart/form-data' }} ) // update Data & Image

export const updatePost = (data , id)=> axios.patch(`${url}/${id}`, data ) // update only Data

export const deletePost = (id)=> axios.delete(`${url}/${id}`)

export const likePost = (id)=> axios.patch(`${url}/${id}/likePost`)


const url2 = '/users' // Registration, SignIn Urls

export const signIn = (data)=> axios.post(`${url2}/signin`, data)

export const signUp = (data)=> axios.post(`${url2}/signup`, data)

export const googleLogin = (data)=> axios.post(`${url2}/googlelogin`, data)


const url3 = `${url}/comment`  // form comments url

export const getComments = ({page, postID}) => axios.get(`${url3}/${postID ? postID : null}/${page ? page : 1}`)

export const getCommentChild = ({page, commentID, postID}) => axios.get(`${url3}/child/${postID ? postID : null}/${commentID ? commentID : null}/${page ? page : 1}`)

export const postComment = (data, postID) => axios.post(`${url3}/${postID}`, data)

export const updateComment = (data, commentID) => axios.patch(`${url3}/${commentID}`, data)

// export const removeComment = (commentID) => axios.delete(`${url3}/${commentID}`)

