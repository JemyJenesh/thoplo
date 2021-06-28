import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Posts from "./posts";
import CreatePost from "./posts/CreatePost";
import { ScreenLoader } from "./components";

import ThemeContextProvider, { ThemeContext, theme } from "./theme";
import UserProvider, { UserContext } from "./user/UserContext";

const queryClient = new QueryClient();

export default function Root() {
  const { isDark } = React.useContext(ThemeContext);
  const { isLoading } = React.useContext(UserContext);
  const currentTheme = theme(isDark);

  if (isLoading) return <ScreenLoader />;

  return (
    <ThemeProvider theme={currentTheme}>
      <Paper square elevation={0} style={{ minHeight: "100%" }}>
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/create" component={CreatePost} />
        </Switch>
      </Paper>
    </ThemeProvider>
  );
}

if (document.getElementById("app")) {
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeContextProvider>
          <UserProvider>
            <Root />
          </UserProvider>
        </ThemeContextProvider>
      </Router>
    </QueryClientProvider>,
    document.getElementById("app")
  );
}