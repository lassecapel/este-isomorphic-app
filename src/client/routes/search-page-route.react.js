import React from 'react';

import {getSearchQuery, getSearchPage} from '../search/store';
import {searchForQuery} from '../search/actions';

import SearchPage from '../pages/searchpage.react';

function isNewSearch(query) {
  return query.q !== getSearchQuery() || query.page !== getSearchPage();
}
/*eslint-disable indent */ //Eslint is bugged in this file

export default
class SearchPageRoute extends React.Component {
  static willTransitionTo(transition, params, query, callback) {
    if (isNewSearch(query)) {
      const timeout = setTimeout(() => callback(new Error('timeout transitionto')), 1000);
      searchForQuery(query)
        .then(() => {
          clearTimeout(timeout);
          callback();
        })
        .catch(callback);
    } else {
      callback();
    }
  }

  render() {
    return (<SearchPage/>);
  }
}
