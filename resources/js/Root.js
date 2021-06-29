import React from "react";
import ReactDOM from "react-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Posts from "./posts";
import CreatePost from "./posts/CreatePost";
import Users from "./users";
import { ScreenLoader } from "./components";

import ThemeContextProvider, { ThemeContext, theme } from "./theme";
import UserProvider, { UserContext } from "./user/UserContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Root() {
  const { isDark } = React.useContext(ThemeContext);
  const { isLoading } = React.useContext(UserContext);
  const currentTheme = theme(isDark);

  if (isLoading) return <ScreenLoader />;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {/* <Paper square elevation={0} style={{ minHeight: "100%" }}> */}
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route path="/create" component={CreatePost} />
        <Route path="/users/:username" component={Users} />
      </Switch>
      {/* </Paper> */}
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
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>,
    document.getElementById("app")
  );
}
