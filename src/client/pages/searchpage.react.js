import React from 'react';
import SearchBox from '../search/searchbox.react';

import {dispatchToken} from '../search/store';
import {dispatchToken as productsDispatch}  from '../products/store';

import ProductList from '../products/productlist.react';
import {getProducts} from '../products/store'
import {getSearch} from '../search/store'

export default class SearchPage extends React.Component {

    render() {
        return (
            <div>
                <h1>Search</h1>
                <SearchBox search={getSearch()} />
                <ProductList products={getProducts()}/>
            </div>
        );
    }
}
