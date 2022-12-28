import React, {useState, forwardRef, useEffect } from 'react' 
import { Dialog, Button, Slide, Typography, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'; 
import useStyles from "./styles";
import { TextField, Paper, } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, erasePostID, updatePost, updatePostWithImg,} from "../../Redux/actions";
import ChipInput from "material-ui-chip-input"; 
import FileUpload from 'react-material-file-upload';

const initialState = {
  title: "",
  message: "",
  tags: [],
  selectedFile: "",
};
 
const Transition = forwardRef(function Transition(props, ref) {
    return (<Slide direction="left" ref={ref} {...props} />);
});
   

export const Form = ({open, setOpen}) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const posts = useSelector((state) => state.postReducer);
    const postID = useSelector((state) => state.updateIdReducer);
    const isLogged = useSelector((state) => state.spyReducer);
    const [postData, setPostData] = useState(initialState); 
    const [files, setFiles] = useState([]); 
 
  
    const loadData = async () => { 
      // eslint-disable-next-line 
      const post = posts[0]["data"].filter((post) => {
        if(post._id === postID)
        return post;
      })[0];
 
      setPostData({
        ...post,
        tags: post["tags"],
        old_file: post["selectedFile"],
        selectedFile: "",
      });
      setOpen(true);
      return post;
    };
  
    useEffect(() => {
      if (postID != null) loadData();
      // eslint-disable-next-line
    }, [postID]);

    useEffect(()=> {
      setPostData({...postData, selectedFile : files ? files[0] ? files[0] : '' : '' });
      // eslint-disable-next-line
    }, [files])
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      // validate 
      if(postData['tags'].length === 0){
        return dispatch({ type : 'SEND', payload : { message : "Tags is Required", mode : 'warning' } });
      }
 
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
      } 
      else {
        if (postData["selectedFile"] === '') { 
          return dispatch({ type : 'SEND', payload : { message : "Image is Required, Please Upload ", mode : 'warning' } });
        }
        form.append("selectedFile", postData["selectedFile"]);
        dispatch(createPost(form));
      }
      
      handleClear();
      handleClose();
    };
  
    const handleClear = () => {
      setPostData(initialState);
      dispatch(erasePostID());
      setFiles([]);
    };
    
    const handleAddChip = (tag) => {
      setPostData({ ...postData, tags: [...postData.tags, tag] });
    };
  
    const handleDeleteChip = (chipToDelete) => {
      setPostData({
        ...postData,
        tags: postData.tags.filter((tag) => tag !== chipToDelete)
      });
    };
  
    const handleClose = () => {
      setOpen(false); 
      handleClear();
    };

  return (
    <>
    
    <div> 
      <Dialog
        maxWidth={'sm'}
        open={open}
        onClose={() => (!isLogged && handleClose()) }
        TransitionComponent={Transition}
        classes={{ paper: classes.dialog }}
      >
        <Button variant="contained" onClick={handleClose} 
            color="secondary"
            size="small" > 
        <CloseIcon onClick={handleClose} style={{margin: '5px'}} /> Close
        </Button>
        { !isLogged && 
            ( 
              <Paper className={classes.paper} style={{ padding: '5% 10%'}} > 
                  <Typography variant="h6" align="center"> 
                      Please Sign In To create a memories and like other's 
                  </Typography> 
              </Paper>
            )
        }
        { isLogged && 
            ( 
              <Paper className={classes.paper} style={{ padding: '5% 10%'}} > 
                <form
                 autoComplete="off"
                 className={`${classes.root} ${classes.form} `} 
                 onSubmit={handleSubmit}
                 >
                 <Typography variant="h4">
                   {postID ? "Updating" : "Creating"} Memories
                   <Divider style={{margin : '30px'}} />
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
                   required={true}
                 /> 
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
                   required={true}
                 /> 
                 <div style={{ padding: "7px 0", width: "95%"}}>
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
                 <div style={{margin : '10px'}} >
                   <FileUpload value={files} onChange={setFiles} accept="image/*" /> 
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
                   onClick={handleClear}
                 >
                   Clear
                 </Button>
                </form> 
              </Paper>
            )
        }
      </Dialog>
    </div>
  
    </>
  )
} 