import {searchForQuery} from '../search/actions';
import {onProductsResponse, onServerProducts} from './actions';
import {register} from '../dispatcher';
import {state, productsCursor} from '../state';
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
    products.withMutations(products => {
      //products.clear();
      serverProducts.forEach((serverProduct) => {
        console.log('pushing', serverProduct);
        products.push(new Product({
          title: serverProduct.websiteDescription,
          productId: serverProduct.productNumber,
          src: 'https://assets.wehkamp.com/i/wehkamp/' + serverProduct.productNumber + '_pb_01/' + serverProduct.normalizedName + '.jpg?$product300x300$'
        }).toMap());
      });
    });
  });
  window._appState = state.save();
}

export const dispatchToken = register(({action, data}) => {
  console.log('action', action, data);
  switch (action) {
    case searchForQuery:
      const query = data;
      onProductsResponse(axios.get('/nlbe/api/products?q=' + query));
      break;
    case onProductsResponse:
      const productsResponse = data;
      const serverProducts = productsResponse.data.products;
      storeProductsInState(serverProducts);
      onServerProducts(productsResponse.data.products);
      break;
    case onServerProducts:
      storeProductsInState(data);
      break;
  }
});

export function getProducts(){
  return productsCursor();
}
