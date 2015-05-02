import React from 'react';

import App from './app/app.react';
import SearchPageRoute from './routes/search-page-route.react'
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={SearchPageRoute} name="search" />
  </Route>
);
