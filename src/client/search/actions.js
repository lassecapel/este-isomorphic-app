import {dispatch} from '../dispatcher';
import axios from 'axios';

import setToString from '../../lib/settostring';

import {onProductsResponse} from '../products/actions';
import {getSearchQuery, getSearchPage} from '../search/store';

function isNewSearch(query) {
  return query.q !== getSearchQuery() || query.page !== getSearchPage();
}
export function searchForQuery(query) {
  return new Promise((resolve, reject) => {
    if (isNewSearch(query)) {
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
    } else {
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
