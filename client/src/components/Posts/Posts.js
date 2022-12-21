import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
import { Grid, CircularProgress, Paper, Typography } from "@material-ui/core";

const Posts = () => {
  const posts = useSelector((state) => state.postReducer);
  const classes = useStyles();

  // eslint-disable-next-line
  if (!posts && !posts[0] && !posts[0]["data"]) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Try to Search other Keywords
        </Typography>
      </Paper>
    );
  }

  const NoDataPaper = () => {
    return (
      <>
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            No Data Found Please Create Your Post
          </Typography>
        </Paper>
      </>
    );
  };

  return (
    <>
      {!posts ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts ? (
            posts[0] ? (
              posts[0]["data"] ? (
                posts[0]["data"].length > 0 ? (
                  posts[0]["data"].map((post) => {
                    return (
                      <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} />
                      </Grid>
                    );
                  })
                ) : (
                  <NoDataPaper />
                )
              ) : (
                <NoDataPaper />
              )
            ) : (
              <NoDataPaper />
            )
          ) : (
            <NoDataPaper />
          )}
        </Grid>
      )}
    </>
  );
};

export default Posts;
