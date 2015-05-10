import React from 'react';

import DocumentTitle from 'react-document-title';
import SearchBox from '../search/search-box.react';
import ProductList from '../products/product-list.react';
import SearchMessage from '../search/search-message.react';
import Pagination from '../products/pagination.react';
import {getProducts, getTotal} from '../products/store';

import {getSearchQuery} from '../search/store';

export default class SearchPage extends React.Component {
  render() {
    return (
      <DocumentTitle title='Webshop Search'>
        <div>
          <div className='row'>
            <h1>Search page</h1>
            <SearchBox query={getSearchQuery()}/>
          </div>
          <div>
            <Pagination/>
            <SearchMessage total={getTotal()} query={getSearchQuery()}/>
            <ProductList products={getProducts()}/>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
