import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { useMutation, useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import PixelPreview from "./PixelPreview";
import CommentList from "./CommentList";
import SendIcon from "@material-ui/icons/Send";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Collapse from "@material-ui/core/Collapse";

import { UserContext } from "../../user/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    marginBottom: theme.spacing(3),
  },
  postBody: {
    padding: theme.spacing(0, 2),
    marginBottom: theme.spacing(2),
  },
  cardTitle: {
    textDecoration: "none",
    color: "inherit",
    fontSize: "1.1rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  cardActions: {
    padding: theme.spacing(0, 2),
  },
  commentBox: {
    marginLeft: theme.spacing(2),
  },
  commentText: {
    margin: theme.spacing(0, 1, 0, "auto"),
  },
  sendBtn: {
    marginLeft: theme.spacing(2),
  },
}));

export default function Post({ post, userId = null }) {
  const classes = useStyles();
  const {
    id,
    has_user_liked,
    user,
    body,
    board,
    created_at,
    likes_count,
    comments,
    comments_count,
  } = post;

  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const toggleCommentBox = () => setOpen(!open);

  const { user: authUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const likeMutation = useMutation(() => axios.post(`/posts/${id}/likes`), {
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

  const commentMutation = useMutation(
    () =>
      axios.post(`/posts/${id}/comments`, {
        body: comment,
      }),
    {
      onMutate: () => {
        if (userId) {
          const user = queryClient.getQueryData(["/users", userId]).data;
          const posts = user.posts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  comments_count: comments_count + 1,
                  comments: [
                    {
                      id: new Date(),
                      body: comment,
                      created_at: new Date(),
                      user: authUser,
                    },
                    ...comments,
                  ],
                }
              : post
          );
          queryClient.setQueriesData(["/users", userId], {
            data: { ...user, posts },
          });
          setComment("");
          setOpen(true);
        } else {
          const data = queryClient.getQueryData("/posts").data.map((post) =>
            post.id === id
              ? {
                  ...post,
                  comments_count: comments_count + 1,
                  comments: [
                    {
                      id: new Date(),
                      body: comment,
                      created_at: new Date(),
                      user: authUser,
                    },
                    ...comments,
                  ],
                }
              : post
          );
          queryClient.setQueriesData("/posts", { data });
          setComment("");
          setOpen(true);
        }
      },
    }
  );

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
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
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
      <CardContent className={classes.cardActions}>
        <Box display="flex" alignItems="center">
          <IconButton
            color={has_user_liked ? "primary" : "default"}
            onClick={likeMutation.mutate}
          >
            <ThumbUpAltIcon />
          </IconButton>
          <Typography>{likes_count}</Typography>
          <Typography className={classes.commentText}>
            {comments_count}
          </Typography>
          <ChatBubbleOutlineIcon />
        </Box>
      </CardContent>
      <Divider />
      <CardContent>
        {authUser && (
          <Box display="flex" alignItems="flex-start">
            <Avatar
              src={authUser.avatar}
              component={NavLink}
              to={`/users/${authUser.username}`}
            />
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.commentBox}
            >
              <OutlinedInput
                rowsMax={5}
                multiline
                placeholder="Write a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      disabled={comment.trim().length < 1}
                      onClick={commentMutation.mutate}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        )}
        {comments_count > 0 && (
          <Box mt={2}>
            <Link component="button" variant="body2" onClick={toggleCommentBox}>
              {open ? "Hide comments" : "Show comments"}
            </Link>
          </Box>
        )}
      </CardContent>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CommentList comments={comments} />
      </Collapse>
    </Card>
  );
}
