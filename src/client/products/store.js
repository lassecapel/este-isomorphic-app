import {searchForQuery} from '../search/actions';
import {onProductsResponse, onServerProducts} from './actions';
import {register, unregister} from '../dispatcher';
import {state, productsCursor} from '../state';
import axios from 'axios';
import {Record} from 'immutable';
import {onInitStore} from '../../server/init-stores'

// Isomorphic store has to be state-less.
const Product = Record({
  title: '',
  productId: '',
  src: ''
});


function storeProductsInState(serverProducts) {
  productsCursor(products => {
    return products.withMutations(list => {
      list.clear();
      serverProducts.forEach((serverProduct) => {
        list.push(new Product({
          title: serverProduct.websiteDescription,
          productId: serverProduct.productNumber,
          src: 'https://assets.wehkamp.com/i/wehkamp/' + serverProduct.productNumber + '_pb_01/' + serverProduct.normalizedName + '.jpg?$product300x300$'
        }));
      });
    });
  });
}

function requestProducts(query) {
  onProductsResponse(axios.get('http://localhost:8000/nlbe/api/products?q=' + query).catch(() => {
    console.log('errror', arguments)
  }));
}
export const dispatchToken = register(({action, data}) => {
  switch (action) {
    case searchForQuery:
      const query = data;
      requestProducts(query);
      break;
    case onProductsResponse:
      const productsResponse = data;
      const serverProducts = productsResponse.data.products;
      storeProductsInState(serverProducts);
      break;
  }
});

export function getProducts() {
  return productsCursor();
}