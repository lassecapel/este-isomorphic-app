import setToString from '../../lib/settostring';
import {dispatch} from '../dispatcher';

export function searchForQuery(query) {
  return new Promise((resolve, reject) => {
    dispatch(searchForQuery, {
      query: query,
      resolve: resolve,
      reject: reject
    });

  }).catch((e) => {console.error('Error', searchForQuery, e);});
}

// Override actions toString for logging.
setToString('search', {
  searchForQuery
});
