import {dispatch} from '../dispatcher';
import setToString from '../../lib/settostring';

export function onProductsResponse(responseData) {
  dispatch(onProductsResponse, responseData);
}

export function onServerProducts(products) {
  dispatch(onServerProducts, products);
}

// Override actions toString for logging.
setToString('products', {
  onProductsResponse,
  onServerProducts
});
