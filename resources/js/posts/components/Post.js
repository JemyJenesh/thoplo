import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { formatDistanceToNow } from "date-fns";
import PixelPreview from "./PixelPreview";
import { useMutation, useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    marginBottom: theme.spacing(3),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  postBody: {
    padding: theme.spacing(0, 2),
    marginBottom: theme.spacing(2),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardTitle: {
    textDecoration: "none",
    color: "inherit",
    fontSize: "1.1rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function Post({ post, userId = null }) {
  const classes = useStyles();
  const { id, has_user_liked, user, body, board, created_at, likes_count } =
    post;

  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => axios.post(`/posts/${id}/likes`), {
    onMutate: () => {
      if (userId) {
        let user = queryClient.getQueryData(["/users", userId]).data;

        const newPosts = user.posts.map((post) =>
          post.id === id
            ? {
                ...post,
                likes_count: likes_count + (has_user_liked ? -1 : 1),
                has_user_liked: !has_user_liked,
              }
            : post
        );
        const data = {
          ...user,
          received_likes_count:
            user.received_likes_count + (has_user_liked ? -1 : 1),
          posts: newPosts,
        };
        queryClient.setQueriesData(["/users", userId], { data });
      } else {
        const data = queryClient.getQueryData("/posts").data.map((post) =>
          post.id === id
            ? {
                ...post,
                likes_count: likes_count + (has_user_liked ? -1 : 1),
                has_user_liked: !has_user_liked,
              }
            : post
        );
        queryClient.setQueriesData("/posts", { data });
      }
    },
  });

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            src={user.avatar}
            className={classes.avatar}
            component={NavLink}
            to={`/users/${user.username}`}
          />
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={
          <Typography
            component={NavLink}
            to={`/users/${user.username}`}
            className={classes.cardTitle}
          >
            {user.name}
          </Typography>
        }
        subheader={formatDistanceToNow(new Date(created_at))}
      />
      <CardContent className={classes.postBody}>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      <Divider />
      <Box display="flex" justifyContent="center">
        <PixelPreview board={board} />
      </Box>
      <Divider />
      <Box display="flex" p={1} alignItems="center" style={{ gap: 4 }}>
        <Typography>{likes_count}</Typography>
        <ThumbUpAltIcon fontSize="small" color="primary" />
      </Box>
      <Divider />
      <CardActions disableSpacing>
        <IconButton
          color={has_user_liked ? "primary" : "default"}
          onClick={mutate}
        >
          <ThumbUpAltIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
