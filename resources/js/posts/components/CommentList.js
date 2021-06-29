import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CommentList({ comments }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {comments.map(({ id, body, user, created_at }) => (
        <ListItem key={id}>
          <ListItemAvatar>
            <Avatar
              src={user.avatar}
              alt={user.name}
              component={NavLink}
              to={`/users/${user.username}`}
            />
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={body} />
        </ListItem>
      ))}
    </List>
  );
}
