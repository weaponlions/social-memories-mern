import React from "react"; 
import Post from "./Post/Post";
import useStyles from "./styles";
import { Grid, CircularProgress, Paper, Typography } from "@material-ui/core"; 

const Posts = ({ posts }) => { 
  const classes = useStyles();
 
  const NoDataPaper = ({message}) => {
    return (
      <>
        <Paper className={classes.emptyContainer} >
          <Typography variant="h5" align="center" style={{ padding: '5% 10%', }}  color="textPrimary" component="span"  >
             { message }
          </Typography>
        </Paper> 
      </>
    );
  };

  // eslint-disable-next-line
  if (!posts && !posts[0] && !posts[0]["data"]) {
    return (
      <NoDataPaper message={'No Data Found Please Create Your Post'} />
    );
  }

  return (
    <>
    { 
      ((posts && posts[0]) && !posts[0]["data"]) && 
        (
        <NoDataPaper />
      )
    }
      {!posts ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        > 
          {
            posts && (
              posts[0] && (
                posts[0]["data"] && (
                  posts[0]["data"].length > 0 && (
                    posts[0]["data"].map((post) => {
                      return (
                        <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                          <Post post={post} />
                        </Grid>
                      );
                    })
                  )  
                )  
              )  
            ) 
          }
        </Grid>
      )}
    </>
  );
};

export default Posts;
