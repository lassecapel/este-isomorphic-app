import App from './app/app.react';
import Home from './pages/home.react';
import Login from './pages/login.react';
import Me from './pages/me.react';
import NotFound from './pages/notfound.react';
import Search from './pages/searchpage.react';
import React from 'react';
import Todos from './pages/todos.react';
import Herenmode from './pages/herenmode.react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={Search} name="search" />
  </Route>
);
