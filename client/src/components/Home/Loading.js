import React from 'react'
import { CircularProgress } from "@material-ui/core";
import { useSelector } from 'react-redux';

export const Loading = () => {

    const isLoading = useSelector((state) => state.loadingReducer)

  return ( 
   <>
    { isLoading && (<CircularProgress style={{position: 'absolute', left: '50%', top: '50%', zIndex: 1000}}  />)}
   </>
  )
}
