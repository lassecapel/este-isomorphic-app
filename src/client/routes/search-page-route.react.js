import React from 'react';

import {searchForQuery} from '../search/actions';

import SearchPage from '../pages/searchpage.react';

/*eslint-disable indent */ //Eslint is bugged in this file

export default
class SearchPageRoute extends React.Component {
  static willTransitionTo(transition, params, query, callback) {
    const timeout = setTimeout(() => callback(new Error('timeout transitionto')), 1000);
    searchForQuery(query)
      .then(() => {
        clearTimeout(timeout);
        callback();
      })
      .catch(callback);
  }

  render() {
    return (<SearchPage/>);
  }
}
