import setToString from '../../lib/settostring';
import {dispatch} from '../dispatcher';
import {onProductsResponse} from '../products/actions';

export function searchForQuery(query) {
  return new Promise((resolve, reject) => {
    if (query.q) {
      dispatch(searchForQuery, {
        query: query,
        resolve: resolve,
        reject: reject
      });
    } else {
      onProductsResponse({
        resolve: resolve
      });
    }
  }).catch((e) => {
      console.error('Error', searchForQuery, e);
      throw e;
    });
}

// Override actions toString for logging.
setToString('search', {
  searchForQuery
});
