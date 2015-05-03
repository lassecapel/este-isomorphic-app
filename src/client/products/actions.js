import {dispatch} from '../dispatcher';
import setToString from '../../lib/settostring';

export function onProductsResponse(responsePromise) {
  // Always return dispatch when it is invoked with a promise to add error handling
  return dispatch(onProductsResponse, responsePromise);
}

export function onServerProducts(products) {
  dispatch(onServerProducts, products);
}

// Override actions toString for logging.
setToString('products', {
  onProductsResponse,
  onServerProducts
});
