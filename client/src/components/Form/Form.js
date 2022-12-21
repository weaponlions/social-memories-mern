import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Paper, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  erasePostID,
  updatePost,
  updatePostWithImg,
} from "../../Redux/actions";
import ChipInput from "material-ui-chip-input";

const initialState = {
  title: "",
  message: "",
  tags: [],
  selectedFile: "",
};

const Form = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const posts = useSelector((state) => state.postReducer);
  const postID = useSelector((state) => state.updateIdReducer);
  const isLogged = useSelector((state) => state.spyReducer);

  const [postData, setPostData] = useState(initialState);

  const loadData = () => {
    // eslint-disable-next-line
    const post = posts[0]["data"].filter((post) => {
      if (post._id === postID) return post;
    })[0];
    setPostData({
      ...post,
      tags: post["tags"],
      old_file: post["selectedFile"],
      selectedFile: "",
    });
    return post;
  };

  useEffect(() => {
    if (postID != null) loadData();
    // eslint-disable-next-line
  }, [postID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", postData["title"]);
    form.append("tags", postData["tags"].join(","));
    form.append("message", postData["message"]);

    if (postID) {
      if (postData["selectedFile"] !== "") {
        form.append("old_file", postData["old_file"]);
        form.append("selectedFile", postData["selectedFile"]);
        dispatch(updatePostWithImg(form, postID));
      } else {
        dispatch(updatePost(form, postID));
      }
    } else {
      form.append("selectedFile", postData["selectedFile"]);
      dispatch(createPost(form));
    }
    handleclear();
  };

  const handleclear = () => {
    setPostData(initialState);
    dispatch(erasePostID());
    document.getElementById("file").value = null;
  };

  if (!isLogged) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In To create a memories and like other's
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          className={`${classes.root} ${classes.form} `}
          noValidate
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {postID ? "Updating" : "Creating"} My Memory
          </Typography>

          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          ></TextField>

          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline 
            minRows={4}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          ></TextField>

          <div style={{ padding: "5px 0", width: "94%" }}>
            <ChipInput
              name="tags"
              variant="outlined"
              label="Tags"
              fullWidth
              value={postData["tags"]}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
            />
          </div>

          <div className={classes.fileInput}>
            <input
              type="file"
              id="file"
              name="selectedFile"
              accept="image/*"
              multiple={false}
              onChange={(e) => {
                const file = e.target.files[0];
                setPostData({ ...postData, selectedFile: file });
              }}
            />
          </div>
          <Button
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            fullWidth
            className={classes.buttonSubmit}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            size="small"
            variant="contained"
            fullWidth
            className={classes.buttonSubmit}
            onClick={handleclear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
