import React, {useState} from "react";
import CommentFooter from './CommentFooter'
import { Avatar } from "@material-ui/core";
import '../../styles'
import { ReplySection } from "./ReplySection";
import { useEffect } from "react";
import { useSelector } from "react-redux"; 

const Template = (props) => {

  const [readMore, setReadMore] = useState(false)  

  const child = useSelector((state) => state.childReducer)

  const handleReadMore = ()=> setReadMore((prev) => !prev)
   
  useEffect(()=>{
    if (child && child[0] && child[0]['commentID'] !== props.commentID) {
      setReadMore(false)
    }
    // eslint-disable-next-line
  }, [child])
  
  return (
    <>
    <div className="media-comment">
      {props.avatar ? (
        <Avatar size={props.size} avatar={props.avatar}><img src={props.avatar}   alt="Logo" height="40px" /></Avatar>        
      ) : (
        null
      )} 
      <div className="media-content" style={{ fontFamily : "cursive"}}  >
        <div className="media-comment-body" style={{backgroundColor: 'hsl(210deg 11% 89%)'}}> 
          <div className="media-comment-data-person">
            <span className="media-comment-name"  >
              {props.name}
            <span style={{marginLeft: '15px', color: 'blue'}} className="media-comment-name" >{props.targetedUser && `@${props.targetedUser}`}</span>
            </span> 
          </div>
          <div style={{margin : '3px'}} className="media-comment-text">{props.message}</div>
        </div>
        <CommentFooter userID={props.userID} createdAt={props.createdAt} username={props.name} parentID={props.commentID} childExist={props.childExist} handleReadMore={handleReadMore} />
      </div>
    </div>
    {
      readMore && <ReplySection commentID={props.commentID} postID={props.postID} /> 
    }
    </>
  );
};

export default Template;
