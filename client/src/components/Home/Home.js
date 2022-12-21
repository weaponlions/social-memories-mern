import React, { useEffect, useState } from "react";
import {
  Grid,
  Grow,
  Container,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ChipInput from "material-ui-chip-input";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import { Pagination } from "../Pagination";
import { getPostsBySearch } from "../../Redux/actions";  


const Home = () => {
  const classes = useStyles(); 
  
  const dispatch = useDispatch();
  // const history = useNavigate();


  const data = useSelector((state) => state.postReducer) 
    
  const page = (data ? (data[0] ? data[0]['currentPage'] : 1) : 1)
  
  const totalPage = (data ? (data[0] ? data[0]['totalPage'] : 1) : 1)

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (title.trim() || tags) {
      dispatch(getPostsBySearch({ title, tags: tags.join(",")}));
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  const resetSearch = () => {
    setTags([])
    setTitle('') 
    dispatch(getPostsBySearch({ title: '' , tags: '', page : 1}))
  }
  return (
    <>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            className={classes.mainContainer}
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={6} md={8}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
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
                  onClick={searchPost}
                  className={classes.buttonSearch}
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
                <Button
                  onClick={resetSearch} 
                  variant="contained"
                  color="secondary" 
                >
                  Reset Search
                </Button>
              </AppBar>
              <Form />
              {
                totalPage > 1 && (<Paper className={classes.pagination} elevation={6}>
                  <Pagination page={page} totalPage={totalPage} tags={tags} title={title} />
                </Paper>)
              } 
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
