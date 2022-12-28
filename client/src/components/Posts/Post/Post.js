import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import Image from "../../../images/Text.png";
import { useDispatch, useSelector } from "react-redux";
import { setPostID, deletePost, likePost } from "../../../Redux/actions";
import { useNavigate, useLocation, Link } from "react-router-dom";



const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogged = useSelector((state) => state.spyReducer);

  const likes = post?.likes;
  const userId = JSON.parse(localStorage.getItem("keywords"))?.id;

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    } else {
      return (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;Like
        </>
      );
    }
  };
  
  const handleLike = async () => {
    dispatch(likePost(post._id));
  };
 
  const openPost = async (id) => {
    location['key'] = id;
    dispatch({type : 'START'});
    navigate(`/posts/${id}`);
  };

  const handleUpdate = (postId) => {
    dispatch(setPostID(postId))
  }
  

  return (
    <>
      <Card className={classes.card} raised elevation={6}>
        <ButtonBase className={classes.cardAction} component="span" name="test">
          <CardMedia
            className={classes.media}
            image={
              post.selectedFile
                ? `http://localhost:5000${post.selectedFile}`
                : Image
            }
            title={post.title}
            onClick={() => openPost(post._id)}
          />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.creator}</Typography>
            <Typography variant="body2">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>
          <div className={classes.overlay2}>
            {isLogged && post.owner === userId && (
              <Button
                style={{ color: "white" }}
                size="small"
                onClick={() => handleUpdate(post._id)}
              >
                <MoreHorizIcon fontSize="medium" />
              </Button>
            )}
          </div>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">
              {( post.tags && post.tags[0] !== '' && post.tags.map((tag) => (
                 <Link to={`/posts/tags/${tag}`} key={tag} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                 {` #${tag} `}
               </Link>)
              ))}
             
            </Typography>
          </div>
          <Typography className={classes.title} variant="h5" onClick={() => openPost(post._id)} gutterBottom>
            {post.title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" onClick={() => openPost(post._id)} component="p">
              {post.message.length > 25
                ? `${post.message.slice(0, 120)}...`
                : post.message}
            </Typography>
          </CardContent>
          </ButtonBase>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={handleLike}
            disabled={!isLogged}
          >
            <Likes />
          </Button>
          {isLogged && post.owner === userId && (
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize="small" />
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
