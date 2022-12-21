import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostsBySearch, singlePost, getComments } from '../../../Redux/actions';
import CommentSection from './CommentSection';
import useStyles from './styles';

export const PostDetails = () => {
    const classes = useStyles();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const post = useSelector((state) => state.singlePost);
    const fetch = async () => { 
      await dispatch(singlePost(id))
    }
    // await dispatch({type : RESET_SINGLE})
    // await dispatch({type : FETCH_SINGLE, payload : post}) 

    useEffect(() => {
        if (id) {
          fetch()
        }
    }, [id]);
  
    // useEffect(() => {
    //   if (post) {
    //     // dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    //   }
    // }, [post]);

   
  return (
    <>
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post ? post?.title ? post.title : '' : ''}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post ? post?.tags ? post.tags.length > 0 ? post.tags.map((tag) => (
            <Link to={`/tags/${tag}`} key={tag} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          )) : '' : '' : ''}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{post ? post?.message ? post.message : '' : ''}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${post ? post?.creator ? post.creator : '' : ''}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post ? post?.creator ? post.creator : '' : ''}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post ? post?.createdAt ? post.createdAt : '' : '').fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection postID={post ? post._id ? post._id : null : null} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} alt={post ? post?.title ? post.title : '' : ''} src={post ? post?.selectedFile ? `http://localhost:5000${post.selectedFile}` : '' : ''}  />
        </div>
      </div>
      {/* {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" alt='loading' />
              </div>
            ))}
          </div>
        </div>
      )} */}
    </Paper>
    </>
  )
}

