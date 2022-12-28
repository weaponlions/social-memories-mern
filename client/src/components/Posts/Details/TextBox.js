import React, {useState, useEffect} from 'react'
import {Typography, TextField, Button} from '@material-ui/core'
import { createComment } from '../../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export const TextBox = ({postID}) => {  
  const tagUser = useSelector((state) => state.tagUserReducer)

  const [comment, setComment] = useState(); 
  const dispatch = useDispatch()
  const isLogged = useSelector((state) => state.spyReducer)
   

  const handleComment = async () => {  
    const owner = JSON.parse(localStorage.getItem('keywords'))
    await dispatch(createComment({message : comment, userName : owner['username'], userLogo : owner['picture'], userID : owner['id'], targetedUser : (tagUser && tagUser['username']), parentID : (tagUser && tagUser['parentID']) }, postID))
    await dispatch({type: 'RESET_TAG'})
    setComment('');
  };

  useEffect(() => {
     setComment((`${tagUser ? `@${tagUser['username']} - ` : ''}`))
  }, [tagUser])
  
    
  return (
    <>
    { isLogged ? 
    (<div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth minRows={5} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} > </TextField>
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={ comment ? !comment.length : false} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
    </div>) 
    : (
        <>
        <div style={{"display" : "flex", "justifyContent" : "center", "alignItems": "center", "width": "50%", "height": "100%"}}>
            <h1>Login Please</h1>
        </div>
        </>
    )
    }
    </>
  )
}
