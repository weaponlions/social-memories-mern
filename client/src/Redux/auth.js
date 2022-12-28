import { AUTH, LOGOUT, GOOGLEAUTH, EVERLOAD, FIRSTLOAD } from "./actionTypes";
import { signIn, signUp, googleLogin } from "../api";
import decode from "jwt-decode";

export const googleAuth = (googleData) => async (dispatch) => {
  try {
    const my_data = {
      firstname: googleData["given_name"],
      lastname: googleData["family_name"],
      email: googleData["email"],
      picture: googleData["picture"],
    };

    const { data } = await googleLogin(my_data);
    if (data) {
      const detail = {
        token: data["token"],
        username: data["user"]["name"].split(" ")[0],
        picture: data["user"]["picture"],
        email: data["user"]["email"],
        id: data["user"]["_id"],
      };
      localStorage.setItem("keywords", JSON.stringify(detail));
      dispatch({ type: GOOGLEAUTH, payload: detail });
      return dispatch({type : 'SEND', payload : {message : 'Google Authentication Succesfull', mode : 'success'}});
    }
  } catch (err) {
    console.log(err);
    return dispatch({type : 'SEND', payload : {message : 'Something went wrong', mode : 'error'}});
  }
};

export const userRegister = (userData) => async (dispatch) => {
  try {
    const { data } = await signUp(userData);
    
    if (data && data['message'] === 'User already Exist.') {
      return dispatch({type : 'SEND', payload : {message : 'User already Exist, Please Login', mode : 'warning'}});
    }
    if (data) {
      const detail = {
        token: data["token"],
        username: data["user"]["name"].split(" ")[0],
        picture: data["user"]["picture"],
        email: data["user"]["email"],
        id: data["user"]["_id"],
      };
      localStorage.setItem("keywords", JSON.stringify(detail));
      dispatch({ type: AUTH, payload: data });
      return dispatch({type : 'SEND', payload : {message : 'Registration Succesfull, Please CREATE First Post', mode : 'success'}});
    }
  } catch (err) {
    console.log(err);
    return dispatch({type : 'SEND', payload : {message : 'Something went wrong', mode : 'error'}});
  }
};

export const userLogin = (userData) => async (dispatch) => {
  try {
    const { data } = await signIn(userData);
    
    if(data && data['message'] === 'User not Found'){
      return dispatch({type : 'SEND', payload : {message : 'User not Found, Please Registration First', mode : 'warning'}});
    }
    if(data && data['message'] === 'Invalid Password'){
      return dispatch({type : 'SEND', payload : {message : 'Invalid Password Credential', mode : 'warning'}});
    }
    if (data) {
      const detail = {
        token: data["token"],
        username: data["user"]["name"].split(" ")[0],
        picture: data["user"]["picture"],
        email: data["user"]["email"],
        id: data["user"]["_id"],
      };
      localStorage.setItem("keywords", JSON.stringify(detail));
      dispatch({ type: AUTH, payload: data });
      return dispatch({type : 'SEND', payload : {message : 'Login Succesfull, Having Some Fun', mode : 'success'}});
    }
  } catch (err) {
    console.log(err);
    return dispatch({type : 'SEND', payload : {message : 'Something went wrong', mode : 'error'}});
  }
};


export const tokenExpired = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('keywords'));
  if(token && token['token']){
     const time = decode(token['token']);
     if(time.exp * 1000 < new Date().getTime()){
        localStorage.removeItem("keywords");
        await dispatch({type: EVERLOAD, payload: false});
        return dispatch({ type : 'SEND', payload : { message : "Session Expire, Please Login Again", mode : 'error' } });
       }
      return dispatch({type: EVERLOAD, payload: true});
    } 
  return dispatch({type: EVERLOAD, payload: false});
}

const myState = null;

export const authReducer = (state = myState, { type, payload }) => {
  switch (type) {
    case AUTH:
      return payload;

    case GOOGLEAUTH:
      return payload;

    default:
      return state;
  }
};

const spyState = null;

export const spyReducer = (state = spyState, { type, payload }) => {
  switch (type) {

    case FIRSTLOAD:
      const data = JSON.parse(localStorage.getItem("keywords"));
      if (!data) {
        return false;
      }
      return true;

    case EVERLOAD:  
      return payload;

    case LOGOUT:
      localStorage.removeItem("keywords");
      return false;

    default:
      return state;
  }
};
