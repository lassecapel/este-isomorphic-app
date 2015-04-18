import React from 'react';
import DocumentTitle from 'react-document-title';

import SearchBox from '../search/searchbox.react';

import {dispatchToken} from '../search/store';
import {dispatchToken as productsDispatch}  from '../products/store';

import ProductList from '../products/productlist.react';
import {getProducts} from '../products/store'
import {getSearchQuery} from '../search/store'

export default
class SearchPage extends React.Component {
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
