import {searchForQuery} from '../search/actions';
import {onProductsResponse, onServerProducts} from './actions';
import {register, unregister} from '../dispatcher';
import {state, productsCursor, totalCursor} from '../state';
import axios from 'axios';
import {Record} from 'immutable';

// Isomorphic store has to be state-less.
const Product = Record({
  title: '',
  productNumber: '',
  normalizedName: ''
});


function storeProductsInState(serverProducts) {
  productsCursor(products => {
    return products.withMutations(list => {
      list.clear();
      serverProducts.forEach((serverProduct) => {
        list.push(new Product({
          title: serverProduct.websiteDescription,
          productNumber: serverProduct.productNumber,
          normalizedName: serverProduct.normalizedName
        }));
      });
    });
  });
}

export const dispatchToken = register(({action, data}) => {
  switch (action) {
    case searchForQuery:
      const {query} = data;
      if (query.q) {
        onProductsResponse(
          axios.get('http://localhost:8000/nlbe/api/products?q=' + query.q + '&page=' + query.page)
            .then((response) => {
              return {
                response: response,
                resolve: data.resolve
              };
            }))
          .catch(data.reject);
      } else {
        setTimeout(() =>
          onProductsResponse({
            resolve: data.resolve
          }));
      }
      break;
    case onProductsResponse:
      const {response} = data;
      if (response && response.data) {
        const productsResponse = response.data;
        storeProductsInState(productsResponse.products);
        totalCursor(() => productsResponse.total);
      } else {
        storeProductsInState([]);
        totalCursor(() => 0);
      }
      data.resolve();
      break;
  }
});

export function getProducts() {
  return productsCursor();
}

export function getTotal() {
  return totalCursor();
}
