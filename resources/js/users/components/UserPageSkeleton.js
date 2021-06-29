import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import PostSkeleton from "../../posts/components/PostSkeleton";

const useStyles = makeStyles((theme) => ({
  media: {
    marginBottom: theme.spacing(3),
  },
}));

export default function UserPageSkeleton() {
  const classes = useStyles();

  return (
    <>
      <Skeleton variant="rect" height={50} className={classes.media} />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Skeleton variant="rect" height={300} />
            <Skeleton variant="text" height={40} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <PostSkeleton />
            <PostSkeleton />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
