import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Layout } from "../components";
import { useShow } from "../api";
import { makeStyles } from "@material-ui/core";
import { UsersPostList, UserPageSkeleton } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    margin: "0 auto",
    height: "100%",
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

export default function index() {
  const { username } = useParams();
  const classes = useStyles();
  const { data, isLoading } = useShow("/users", username);

  if (isLoading) return <UserPageSkeleton />;

  const { name, posts, posts_count, received_likes_count, avatar } = data.data;

  const pluralize = (value) => (value.length > 1 ? `${value}s` : value);

  return (
    <Layout>
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <div style={{ position: "sticky", top: 72 }}>
              <Avatar
                variant="rounded"
                className={classes.avatar}
                src={avatar}
              />
              <Typography align="center" variant="h5" gutterBottom>
                {name}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Typography align="center" color="primary" gutterBottom>
                  {posts_count} {pluralize("post")}
                </Typography>
                <Typography align="center" color="secondary" gutterBottom>
                  {received_likes_count} {pluralize("like")}
                </Typography>
              </Box>
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <UsersPostList posts={posts} userId={username} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
