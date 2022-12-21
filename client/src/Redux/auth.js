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
    }
  } catch (err) {
    console.log(err);
  }
};

export const userRegister = (userData) => async (dispatch) => {
  try {
    const { data } = await signUp(userData);
    if (data) {
      const detail = {
        token: data["token"],
        username: data["user"]["name"].split(" ")[0],
        picture: data["user"]["picture"],
        email: data["user"]["email"],
        id: data["user"]["_id"],
      };
      console.log(detail);
      localStorage.setItem("keywords", JSON.stringify(detail));
      dispatch({ type: AUTH, payload: data });
    }
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = (userData) => async (dispatch) => {
  try {
    const { data } = await signIn(userData);
    if (data) {
      const detail = {
        token: data["token"],
        username: data["user"]["name"].split(" ")[0],
        picture: data["user"]["picture"],
        email: data["user"]["email"],
        id: data["user"]["_id"],
      };
      console.log(detail);
      localStorage.setItem("keywords", JSON.stringify(detail));
      dispatch({ type: AUTH, payload: data });
    }
  } catch (err) {
    console.log(err);
  }
};

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

export const spyReducer = (state = spyState, { type }) => {
  switch (type) {

    case FIRSTLOAD:
      const data = JSON.parse(localStorage.getItem("keywords"));
      if (!data) {
        return false;
      }
      return true;

    case EVERLOAD:
        const token = JSON.parse(localStorage.getItem('keywords'))
        if(token && token['token']){
            const time = decode(token['token'])
            if(time.exp * 1000 < new Date().getTime()){
                localStorage.removeItem("keywords");
                return false
            }
            return true
          } 
      return false;

    case LOGOUT:
      localStorage.removeItem("keywords");
      return false;

    default:
      return state;
  }
};
