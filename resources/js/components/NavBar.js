import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { UserContext } from "../user/UserContext";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../theme";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "inherit",
    textDecoration: "none",
  },
  avatar: {
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const { isDark, toggleTheme } = React.useContext(ThemeContext);
  const { user, logout } = React.useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const icon = isDark ? <Brightness7Icon /> : <Brightness4Icon />;

  return (
    <AppBar
      color={isDark ? "default" : "primary"}
      position="sticky"
      elevation={1}
    >
      <Container className={classes.root}>
        <Toolbar variant="dense">
          {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
          <Typography
            variant="h6"
            className={classes.title}
            component={NavLink}
            to="/"
          >
            Thoplo
          </Typography>

          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            onClick={toggleTheme}
          >
            {icon}
          </IconButton>
          <IconButton onClick={handleMenu} color="inherit" size="small">
            <Avatar
              className={classes.avatar}
              alt={user?.email}
              src={user?.avatar}
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={logout}>Log out</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
