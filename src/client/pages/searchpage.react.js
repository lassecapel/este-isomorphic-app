import React from 'react';

import DocumentTitle from 'react-document-title';
import SearchBox from '../search/searchbox.react';
import ProductList from '../products/productlist.react';
import Pagination from '../products/pagination.react';
import {getProducts} from '../products/store'

import {getSearchQuery, getSearchPage} from '../search/store';

export default class SearchPage extends React.Component {
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
