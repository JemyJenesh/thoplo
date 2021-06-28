import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { formatDistanceToNow } from "date-fns";
import PixelPreview from "./PixelPreview";

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
  const { user, body, board, created_at } = post;

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
      <Box
        display="flex"
        justifyContent="center"
        borderColor="divider"
        borderTop={1}
        // borderBottom={1}
      >
        <PixelPreview board={JSON.parse(board)} />
      </Box>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
}
