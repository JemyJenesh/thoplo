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
}));

export default function Post({ post }) {
  const classes = useStyles();
  const { id, has_user_liked, user, body, board, created_at, likes_count } =
    post;

  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => axios.post(`/posts/${id}/likes`), {
    onMutate: () => {
      const newPosts = queryClient.getQueryData("/posts").map((post) =>
        post.id === id
          ? {
              ...post,
              likes_count: likes_count + (has_user_liked ? -1 : 1),
              has_user_liked: !has_user_liked,
            }
          : post
      );
      queryClient.setQueriesData("/posts", newPosts);
    },
  });

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src={user.avatar} className={classes.avatar} />}
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={user.name}
        subheader={formatDistanceToNow(new Date(created_at))}
      />
      <CardContent className={classes.postBody}>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      <Divider />
      <Box display="flex" justifyContent="center">
        <PixelPreview board={JSON.parse(board)} />
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
