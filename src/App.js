import React from 'react';
import { theme } from "./createTheme";
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';
import { firebaseAuth } from "./config/config";

import NavBar from "./components/navbar";
import RootStore from "./stores/RootStore";

import Login from './routes/login';
import Home from './routes/home';
import Identify from "./routes/identify";
import Plants from "./routes/plants";
import About from "./routes/about";

const history = createBrowserHistory();

firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
        RootStore.sessionStore.setUser(user);
    }
});

const App = (props) => {
    return (
        <Router history={history}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Provider {...RootStore}>
                    <NavBar>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/home" component={Home} />
                            <Route path="/identify" component={Identify} />
                            <Route path="/plants" component={Plants} />
                            <Route path="/about" component={About} />
                            <Redirect from ="/" to="/home" />
                        </Switch>
                    </NavBar>
                </Provider>
            </MuiThemeProvider>
        </Router>
    );
}

export default App;
