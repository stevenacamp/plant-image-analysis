import React from 'react';
import { theme } from "./createTheme";
import { MenuRounded } from "@material-ui/icons";
import { AppBar, Button, CssBaseline, IconButton, MuiThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';
import { firebaseAuth } from "./config/config";

import protectedRoute from "./components/protectedRoute";

import RootStore from "./stores/RootStore";

import Login from './routes/login';
import Home from './routes/home';
import Identify from "./routes/identify";

const history = createBrowserHistory();

firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
        RootStore.sessionStore.setUser(user);
    }
});

const App = (props) => {
  return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar>
            <Toolbar>
                <IconButton color="inherit" aria-label="menu" style={{ marginLeft: -12, marginRight: 20 }}>
                    <MenuRounded />
                </IconButton>
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                    Plant Image Analysis
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
          <Provider {...RootStore}>
            <div style={{ marginTop: 64, padding: 24 }}>
                <Router history={history}>
                    <Switch>
                        <Route path="/login" component={Login} />
                          <Route path="/home" component={Home} />
                        <Route path="/identify" component={Identify} />
                        <Redirect from ="/" to="/home" />
                    </Switch>
                </Router>
            </div>
        </Provider>
      </MuiThemeProvider>
  );
}

export default App;
