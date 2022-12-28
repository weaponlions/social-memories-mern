import Input from "./Input"; 
import useStyles from "./styles";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import Icon from "@material-ui/icons/LockOutlined";
import { FIRSTLOAD } from "../../Redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { googleAuth, userLogin, userRegister } from "../../Redux/auth";
import { Grid, Avatar, Paper, Button, Container, Typography } from "@material-ui/core";


const initialState = {firstname : '', lastname: '', email: '', password: '', confirmPassword : ''};

export const Auth = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formdata, setFormdata] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);  

  const isLogged = useSelector((state) => state.spyReducer);
  const isLoading = useSelector((state) => state.loadingReducer);

  useEffect(() => {
    if (isLogged) {
      navigate(-1);
    }
  }, [navigate, isLogged]);
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (formdata['password'] === formdata['confirmPassword']) {
        await dispatch(userRegister(formdata));
        return dispatch({type : FIRSTLOAD});
      }else{ 
        return dispatch({type : 'SEND', payload : {message : "Password and Confirm Password are not Matched", mode : 'warning'}});
      }
    }else{
      await dispatch(userLogin(formdata));
      return dispatch({type : FIRSTLOAD});
    } 
  };
 
  const googleSuccess = async(res) => {
    if (res.credential) {
      const user = jwt_decode(res.credential);
      await dispatch(googleAuth(user));
      dispatch({type : FIRSTLOAD});
    } 
  };

  const googleFailure = (res) => {
    console.log(res);
    return dispatch({ type : 'SEND', payload : { message : "Something Went Wrong, Please Try Again Later", mode : 'error' } });
  };


  const handleChange = (e) => { 
    setFormdata({...formdata, [e.target.name] : e.target.value});
  };

  const switchMode = () => setIsSignUp((prev) => !prev);

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  
 const Sleep = (time) => {
  setTimeout(()=> {
    dispatch({type: 'END'});
  }, time);
 };

  Sleep(600);

  return (
    <>  
      { !isLoading && 
        (<Container component="main" maxWidth="xs">
        <Paper elevation={3} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Icon />
          </Avatar>
          <Typography variant="h6">
            {" "}
            {isSignUp ? "Sign Up" : "Sign In"}{" "}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstname"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastname"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}

              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type='email' 
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
                type={showPassword ? "text" : "password"}
              /> 
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange} 
                  type={"password"}
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit} 
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>

            <Container
              variant="contained"
              className={classes.googleButton}
            >
              <GoogleLogin
                shape="pill"
                theme="filled_blue"
                onSuccess={googleSuccess}
                onError={googleFailure}
                // useOneTap
                size={"large"}
                // auto_select
              />
            </Container>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>) 
      }
    </>
  );
};
 

// 1055623080920-lbi811elfirlqor3ksr0cukij3pgu4la.apps.googleusercontent.com
