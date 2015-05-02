import {searchForQuery} from '../search/actions';
import {onProductsResponse, onServerProducts} from './actions';
import {register, unregister} from '../dispatcher';
import {state, productsCursor, totalCursor} from '../state';
import axios from 'axios';
import {Record} from 'immutable';

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

export const dispatchToken = register(({action, data}) => {
  switch (action) {
    case searchForQuery:
      const query = data;
      onProductsResponse(axios.get('http://localhost:8000/nlbe/api/products?q=' + query.q + '&page=' + query.page).catch(() => {
        console.log('error', arguments)
      }));
      break;
    case onProductsResponse:
      const productsResponse = data.data;
      const serverProducts = productsResponse.products;
      storeProductsInState(serverProducts);
      totalCursor(() => productsResponse.total);
      break;
  }
});

export function getProducts() {
  return productsCursor();
}

export function getTotal() {
  return totalCursor();
}
