import setToString from '../../lib/settostring';
import {dispatch} from '../dispatcher';
import {onProductsResponse} from '../products/actions';
import axios from 'axios';

export function searchForQuery(query) {
  return new Promise((resolve, reject) => {
    dispatch(searchForQuery, query);
    if (query.q) {
      onProductsResponse(
        axios.get('http://localhost:8000/nlbe/api/products?q=' + query.q + '&page=' + query.page)
      )
        .then(resolve)
        .catch(reject);
    } else {
      onProductsResponse();
      resolve();
    }
  })
    .catch((e) => {
      console.error('Error', searchForQuery, e);
      throw e;
    });
}

// Override actions toString for logging.
setToString('search', {
  searchForQuery
});
