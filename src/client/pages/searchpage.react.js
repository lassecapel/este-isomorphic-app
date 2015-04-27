import React from 'react';
import DocumentTitle from 'react-document-title';

import SearchBox from '../search/searchbox.react';

import {dispatchToken, getSearchQuery} from '../search/store';
import {dispatchToken as productsDispatch}  from '../products/store';
import {searchForQuery}  from '../search/actions';

import ProductList from '../products/productlist.react';
import Pagination from '../products/pagination.react';
import {getProducts, init as initProductsStore} from '../products/store'
import {initStores} from '../../server/init-stores'

export default
class SearchPage extends React.Component {
  static willTransitionTo(transition, params, query, callback) {
    if (query.q && getSearchQuery() !== query.q) {
      searchForQuery(query);
    }
    const timeout = setTimeout(() =>  callback(new Error('timeout transitionto')), 1000);
    initStores(query)
      .then(() => clearTimeout(timeout))
      .then(callback)
      .catch(callback);
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
