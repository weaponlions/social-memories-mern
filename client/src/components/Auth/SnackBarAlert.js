import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux';

const TransitionLeft = (props) => {
  return (<Slide {...props} direction="down" />);
}

export const SnackBarAlert = () =>  {
  
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alertReducer)
  
  useEffect(() => {
    dispatch({type : 'READY', payload : {Transition : TransitionLeft}});
  }, [dispatch])
   
  const { vertical, horizontal, open, Transition, message, mode } = alert;


  const handleClose = () => {
    dispatch({type : 'STOP'})
  };
  
  return (
    <div>  
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        key={vertical + horizontal}
        TransitionComponent={Transition}
      >
        
        <Alert severity={mode}>{message}</Alert>
        </Snackbar>
    </div>
  );
}