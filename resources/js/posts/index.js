import React from "react";
import { Container, Grid, Box, Link } from "@material-ui/core";
import { Layout } from "../components";
import PostList from "./components/PostList";
import { NavLink } from "react-router-dom";

export default function Posts() {
  return (
    <Layout>
      <Box py={3}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Link to="/create" component={NavLink}>
                Create your pixel art
              </Link>
            </Grid>
            <Grid item xs={6}>
              <PostList />
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}
