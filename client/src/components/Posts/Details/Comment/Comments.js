import React from "react";
import Template from "./Tools/Template";
import "./styles.css";
import { useDispatch } from 'react-redux'
import { getComments } from "../../../../Redux/actions";

export const Comments = ({ comment, postID }) => {

  const dispatch = useDispatch()
  
  const pageLoader = async() => {
    const page = comment[0]["currentPage"] + 1;  
    await dispatch(getComments({page : page, postID : postID}))
  };
 

  return (
    <>
      {comment
        && comment[0]
          && comment[0]["data"].map((ele) => (
              <ul className="comment-list" key={ele._id}>
                <li className="comment-list-row">
                  <div className="comment-list-row-inner">
                    <Template
                      key={ele._id}
                      avatar={ele.userLogo}
                      size="70px"
                      name={ele.userName}
                      message={ele.message}
                      createdAt={ele.createdAt}
                      childExist={ele.childExist}
                      commentID={ele._id}
                      postID={postID}
                      userID={ele.userID}
                    />
                  </div>
                </li>
              </ul>
            ))}

      {comment &&
      comment[0] &&
      comment[0]["currentPage"] < comment[0]["totalPage"] && (
        <span style={{ margin: "2px 0px 0px 25px" }} onClick={pageLoader}>
          Read More
        </span>
      )}
    </>
  );
};
