import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate, useParams} from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import { FIRSTLOAD, EVERLOAD } from "./Redux/actionTypes"; 
import { PostDetails } from './components/Posts/Details/PostDetails'
import { getPostsBySearch } from "./Redux/actions";
// import * as Toast from '@radix-ui/react-toast'; 

function App() {
  const dispatch = useDispatch();
  
  useEffect( () => {
    async function first () {
      await dispatch({type : FIRSTLOAD})
      await dispatch({type : EVERLOAD})
      dispatch(getPostsBySearch({page:1})) 
    }
    first()
  }, [dispatch]);

  const { id } = useParams() 

  return (
    <>
      <BrowserRouter>
      <GoogleOAuthProvider clientId="1055623080920-lbi811elfirlqor3ksr0cukij3pgu4la.apps.googleusercontent.com" >
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
              <Route exact path='/' element={ <Navigate to='/posts' /> } />
              <Route exact path='/posts' element={<Home/>} />
              <Route exact path='/posts/search' element={<Home/>} />
              <Route exact path='/posts/:id' element={<PostDetails />} />
              <Route exact path='/auth' element={<Auth/>} />
            </Routes>
          </Container>
          </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
