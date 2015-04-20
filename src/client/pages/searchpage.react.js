import React from 'react';
import DocumentTitle from 'react-document-title';

import SearchBox from '../search/searchbox.react';

import {dispatchToken} from '../search/store';
import {dispatchToken as productsDispatch}  from '../products/store';

import ProductList from '../products/productlist.react';
import {getProducts, init as initProductsStore} from '../products/store'
import {getSearchQuery} from '../search/store'
import {initStores} from '../../server/init-stores'

export default
class SearchPage extends React.Component {
  static willTransitionTo(transition, params, query, callback) {
    initStores(query).then(callback, function() {console.log('fail', arguments)});
  }

  render() {
    return (
      <DocumentTitle title='Dames Mode Shopper'>
        <div className="page">
          <header>
            <h1>Search page</h1>
          </header>
          <section>
            <SearchBox query={getSearchQuery()}/>
          </section>
          <section>
            <ProductList products={getProducts()}/>
          </section>
        </div>
      </DocumentTitle>
    );
  }
}
