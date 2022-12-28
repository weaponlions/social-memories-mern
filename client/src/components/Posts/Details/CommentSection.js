import React, { useEffect } from 'react';
import { Typography, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { getComments } from '../../../Redux/actions';
import { Comments } from './Comment/Comments'; 
import { TextBox } from './TextBox';


const CommentSection = ({ postID }) => {
  const classes = useStyles();
  const dispatch = useDispatch(); 
 

  const comments = useSelector((state) => state.commentReducer) 
   

  useEffect(() => {
    dispatch(getComments({page : 1, postID : postID}))
    // eslint-disable-next-line
  }, [dispatch])
   
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          <Comments comment={comments ? comments : null} postID={postID} /> 
        </div>
      </div>
          <Divider style={{ margin: '20px 0' }} />
          <TextBox postID={postID} />
    </div>
  );
};

export default CommentSection;