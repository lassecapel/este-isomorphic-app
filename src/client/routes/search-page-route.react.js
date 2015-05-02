import React from 'react';
import {register} from '../dispatcher';

import {getSearchQuery, getSearchPage} from '../search/store';
import {initCursor} from '../state';
import {searchForQuery} from '../search/actions';
import {onProductsResponse} from '../products/actions';

import SearchPage from '../pages/searchpage.react';

function isNewSearch(query) {
  return query.q !== getSearchQuery() || query.page !== getSearchPage();
}

export default
class SearchPageRoute extends React.Component {
  static willTransitionTo(transition, params, query, callback) {
    if (isNewSearch(query)) {
      const searching = searchForQuery(query).catch(callback);
      if (!initCursor()) {
        const timeout = setTimeout(() => callback(new Error('timeout transitionto')), 1000);
        console.log('going to wait for store init', initCursor());
        searching.then(() => {
          clearTimeout(timeout);
          initCursor(() => true);
          console.log('stopping waiting for products');
          callback();
        })
      } else {
        callback();
      }
    } else {
      callback();
    }
  }

  render() {
    return (<SearchPage/>)
  }
}
