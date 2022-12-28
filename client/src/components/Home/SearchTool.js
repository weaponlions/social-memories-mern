import React, { forwardRef } from 'react' 
import { Dialog, Button, Slide, Paper, Divider, Typography } from '@material-ui/core';
import useStyles from "./styles";
import { TextField, } from "@material-ui/core";
import { useDispatch, } from "react-redux"; 
import ChipInput from "material-ui-chip-input";  
import { getPostsBySearch } from "../../Redux/actions"; 
import { RESET } from '../../Redux/actionTypes';
import { useNavigate } from 'react-router-dom';

 

const Transition = forwardRef(function Transition(props, ref) {
    return (<Slide direction="left" ref={ref} {...props} />);
});
  

export const SearchTool = ({setOpenSearch, openSearch, title, tags, setTags, setTitle, setReset}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
   
    const searchPost = async(tags) => {
      if (title.trim() || tags) {
        navigate(`/posts/Search?${tags ? `tag=${tags.join(',')}` : ''}${title ? `title=${title} ` : ''}`)
        dispatch({type : RESET})
        await Sleep(1000)
        setReset(true);
        resetSearch();
      }
    };
 
    const Sleep = async (time) => {
      dispatch({type: 'START'})
      setTimeout( async ()=> {
       await dispatch(getPostsBySearch({ title, tags: tags && tags.join(",")}));
      }, time)
    }

  
    const handleKeyPress = (e) => {
      if(e.keyCode === 13)
        searchPost();
    };
  
    const handleAddChip = (tag) => {
      setTags([...tags, tag]);
    };
  
    const handleDeleteChip = (chipToDelete) => {
      setTags(tags.filter((tag) => tag !== chipToDelete));
    }
   
    const handleClose = () => {
      setOpenSearch(false);
    };

    const resetSearch = () => {
      setTags([]);
      setTitle('');
      handleClose();
    };
    
  return (
    <> 
    <div>
      <Dialog
        maxWidth={'sm'}
        open={openSearch}
        onClose={ handleClose }
        TransitionComponent={Transition}
        classes={{ paper: classes.dialog }}
      > 
        <Typography variant="h4" style={{textAlign: 'center', margin: '10px'}}>
            Search Memories
        </Typography>
        <Divider style={{marginBottom : '30px'}} />
        <Paper  elevation={1} style={{display: 'flex',flexDirection : 'column', margin: '0.5rem', padding: '20px', width: '85%', marginBottom: '30px' }} >
            <TextField
              onKeyDown={handleKeyPress}
              name="title"
              variant="outlined"
              label="Search Memories"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <ChipInput
              style={{ margin: "10px 0" }}
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
              label="Search Tags (Press Enter For Multiple)"
              variant="outlined"
            />
            <Button
              onClick={() => searchPost(tags)}
              className={classes.buttonSearch}
              variant="contained"
              color="primary"
              style={{marginTop : '10px'}}
            >
              Search
            </Button> 
        </Paper>
      </Dialog>
    </div>
  
    </>
  )
} 