import React, { useEffect, useState } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import useStyles from './styles' 
import Text from '../../images/Text.png'
import Logo from '../../images/Logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { EVERLOAD } from '../../Redux/actionTypes'

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState() 
    const dispatch = useDispatch() 
    const isLogged = useSelector((state) => state.spyReducer)
    const [second, setSecond] = useState(0)

    useEffect(() => {
      const myTimer = setInterval( () => {
          if(isLogged){
            setSecond((prev) => prev + 1)
            dispatch({type : EVERLOAD})
          } 
          clearInterval(myTimer);
        }, 1000 * 60)
        
    }, [second, isLogged, dispatch])
    

    useEffect(() => {   
         if (isLogged) {
          setUser(JSON.parse(localStorage.getItem('keywords')))
         }
         else{
          setUser(null)
         }
    }, [isLogged])
    
    const handleLogout = async () => { 
      dispatch({type: 'LOGOUT'}) 
    }

  return (
    <>
        <AppBar className={classes.appBar} position='static' color='inherit' >
          <Link to='/' className={classes.brandContainer} > 
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
              <Button component={Link} to='/auth' variant='contained' color='primary' >Sign In</Button>
            )}
          </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar
