import React from 'react';
import {register} from '../dispatcher';


import DocumentTitle from 'react-document-title';
import SearchBox from '../search/searchbox.react';

import {dispatchToken, getSearchQuery, getSearchPage} from '../search/store';
import {dispatchToken as productsDispatch}  from '../products/store';
import {initCursor} from '../state'
import {searchForQuery}  from '../search/actions';
import {onProductsResponse} from '../products/actions';

import ProductList from '../products/productlist.react';
import Pagination from '../products/pagination.react';
import {getProducts, init as initProductsStore} from '../products/store';

import SearchPage from '../pages/searchpage.react';

function isNewSearch(query) {
  return query.q !== getSearchQuery() || query.page !== getSearchPage();
}

export default
class SearchPageRoute extends React.Component {
  static willTransitionTo(transition, params, query, callback) {
    if (isNewSearch(query)) {
      searchForQuery(query);
      if (!initCursor()) {
        const timeout = setTimeout(() =>  callback(new Error('timeout transitionto')), 1000);
        console.log('going to wait for store init');
        register(({action}) => {
          switch (action) {
            case onProductsResponse:
              clearTimeout(timeout);
              initCursor(() => true);
              console.log('stopping waiting for products');
              callback();
              break;
          }
        });
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
