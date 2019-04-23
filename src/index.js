import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Redirect, Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import login from './routes/login';
import home from './routes/home';

const history = createBrowserHistory();

const Root = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={login} />
        <Route path="/home" component={home} />
        <Redirect from ="/" to="/login" />
      </Switch>
    </Router>
  )
}


ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
