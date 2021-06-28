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
            <Grid item xs={12} lg={3}>
              <div style={{ position: "sticky", top: 80 }}>
                <Link to="/create" component={NavLink}>
                  Create pixel art
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} lg={6}>
              <PostList />
            </Grid>
            <Grid item xs={12} lg={3}></Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}
