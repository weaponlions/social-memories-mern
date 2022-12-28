import useStyles from './styles';
import Text from '../../images/Text.png';
import Logo from '../../images/Logo.png';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useResolvedPath } from 'react-router-dom';
// import { RESET } from '../../Redux/actionTypes';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import { tokenExpired } from '../../Redux/auth';

export const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState();
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.spyReducer);
    const [second, setSecond] = useState(0);
    const path = useResolvedPath().pathname;
    
    useEffect(() => {
      const myTimer = setInterval( () => {
          if(isLogged){
            setSecond((prev) => prev + 1);
            dispatch(tokenExpired());
          }
          clearInterval(myTimer);
        }, 1000 * 60);
    }, [second, isLogged, dispatch]);
    

    useEffect(() => {
         if (isLogged) {
          setUser(JSON.parse(localStorage.getItem('keywords')));
         }else{
          setUser(null);
         }
    }, [isLogged]);
    
    const handleLogout = async () => {
      dispatch({type: 'LOGOUT'});
      dispatch({type : 'SEND', payload : {message : 'Logout Done, Please Login Again', mode : 'warning'}});
    }

    const backHome = async () => {
      // await dispatch({type: RESET})
      dispatch({type: 'START'})
    }
     
  return (
    <>
        <AppBar className={classes.appBar} position='static' color='inherit' >
          <Link onClick={ backHome } to='/' className={`${(path === '/posts') ? classes.disabled : ''} ${classes.brandContainer} `} > 
            <img src={Text} alt="Text" height="45px" />
            <img src={Logo} className={classes.image} alt="Logo" height="40px" />
          </Link>
          <Toolbar className={classes.toolbar} > 
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user['username']} src={user['picture']} > {user['picture']} </Avatar>
                    <Typography className={classes.userName} variant='h6' > {user['username']} </Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={handleLogout} >Logout</Button>
                </div>
            ) : (
              <Button component={Link} onClick={() => dispatch({type : 'START'})} to='/auth' className={`${(path === '/auth') ? classes.disabled : ''}`} variant='contained' color='primary' >Sign In</Button>
            )}
          </Toolbar>
        </AppBar>
    </>
  )
}
 
