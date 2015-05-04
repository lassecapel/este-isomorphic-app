import {onProductsResponse} from './actions';
import {register} from '../dispatcher';
import {productsCursor, totalCursor} from '../state';
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
    case onProductsResponse:
      if (data) {
        const productsResponse = data.data;
        storeProductsInState(productsResponse.products);
        totalCursor(() => productsResponse.total);
      } else {
        storeProductsInState([]);
        totalCursor(() => 0);
      }
      break;
  }
});

export function getProducts() {
  return productsCursor();
}

export function getTotal() {
  return totalCursor();
}
