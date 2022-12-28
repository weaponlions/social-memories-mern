import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {Link} from 'react-router-dom'
import moment from "moment";
import '../../styles';


const CommentFooter = ({userID, username, parentID, childExist, handleReadMore, createdAt }) => {
  const dispatch = useDispatch()
  const isLogged = useSelector((state) => state.spyReducer)
  const user = JSON.parse(localStorage.getItem('keywords'))?.['id']
 

  const handleTagUser = async() => {
    dispatch({type : 'SET_TAG', payload : {username : username , parentID : parentID}})
  }
  return(
    <div className="media-comment-footer">  
    { isLogged && user && userID && user !== userID &&
        (
        <>
        <span className="icon-bubble-content">
          <svg width="20" height="20" version="1.1" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
            <path fill="currentColor" d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
          </svg>
        </span>
         <span onClick={handleTagUser} >REPLY</span>
         </>) }
      { childExist && ( <span style={{"margin" : "2px 0px 0px 25px"}} onClick={handleReadMore} >View Reply</span> ) }
    <span style={{marginLeft: '29px'}} className="text-muted"> {createdAt && moment(createdAt).fromNow() } </span>
    </div>
  )
}

export default CommentFooter;