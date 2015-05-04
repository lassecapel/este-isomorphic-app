import {dispatch} from '../dispatcher';
import setToString from '../../lib/settostring';

export function onProductsResponse(responsePromise) {
  // Always return dispatch when it is invoked with a promise to add error handling
  return dispatch(onProductsResponse, responsePromise);
}

// Override actions toString for logging.
setToString('products', {
  onProductsResponse
});
