import React from 'react';
import {register, unregister} from '../dispatcher';


import DocumentTitle from 'react-document-title';
import SearchBox from '../search/searchbox.react';

import {dispatchToken, getSearchQuery, getSearchPage} from '../search/store';
import {dispatchToken as productsDispatch}  from '../products/store';
import {initCursor} from '../state'
import {searchForQuery}  from '../search/actions';
import {onProductsResponse} from '../products/actions';

import ProductList from '../products/productlist.react';
import Pagination from '../products/pagination.react';
import {getProducts, init as initProductsStore} from '../products/store'

export default
class SearchPage extends React.Component {
  static willTransitionTo(transition, params, query, callback) {
    if (query.q) {
      searchForQuery(query);
      if (!initCursor()) {
        const timeout = setTimeout(() =>  callback(new Error('timeout transitionto')), 1000);
        console.log('going to wait for store init');
        const id = register(({action}) => {
          switch (action) {
            case onProductsResponse:
              unregister(id);
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
    return (
      <DocumentTitle title='Dames Mode Shopper'>
        <div>
          <div className='row'>
            <h1>Search page</h1>
            <SearchBox query={getSearchQuery()}/>
          </div>
          <div>
            <Pagination/>
            <ProductList products={getProducts()}/>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
