import React, { useState, useRef, useEffect } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
// import { commentPost } from '../../actions/posts';
import useStyles from './styles';
import { getComments } from '../../../Redux/actions';


const CommentSection = ({ postID }) => {
  const classes = useStyles();
  const dispatch = useDispatch(); 
  const comments = useSelector((state) => state.commentReducer)
  console.log(comments);
  
  const user = JSON.parse(localStorage.getItem('keywords'));
  const [comment, setComment] = useState(''); 
  const commentsRef = useRef();

  const handleComment = async () => {
    // const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    // setComments(newComments);

    // commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { 
    console.log(postID);
    dispatch(getComments({page : 1, postID : postID}))
  }, [postID])
  

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {/* {comments ? comments['data'] ? comments['data'].map((com) => {
            
          })} */}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;