import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "./components/Auth/Auth";
import { Container } from "@material-ui/core";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FIRSTLOAD } from "./Redux/actionTypes";
import { SnackBarAlert } from "./components/Auth/SnackBarAlert";
import { PostDetails } from './components/Posts/Details/PostDetails';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { tokenExpired } from "./Redux/auth";
import { Loading } from "./components/Home/Loading";

function App() {
  const dispatch = useDispatch();
  
  useEffect( () => {
    async function first () {
      await dispatch({type : FIRSTLOAD})
      await dispatch(tokenExpired());
    }
    first()
  });
 

  return (
    <>
      <BrowserRouter>
      <GoogleOAuthProvider clientId="1055623080920-lbi811elfirlqor3ksr0cukij3pgu4la.apps.googleusercontent.com" >
          <Container maxWidth="xl">
            <Navbar />
            <SnackBarAlert />
            <Loading />
            <Routes>
              <Route exact path='/' element={ <Navigate to='/posts' /> } />
              <Route exact path='/posts' element={<Home/>} />
              <Route exact path='/posts/search' element={<Home/>} />
              <Route exact path='/posts/:id' element={<PostDetails />} />
              <Route exact path='/posts/tags/:tag' element={<Home />} />
              <Route exact path='/auth' element={<Auth/>} />
            </Routes>
          </Container>
          </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
