import {register, unregister, dispatch} from '../client/dispatcher';
import {initCursor} from '../client/state';
import {searchForQuery} from '../client/search/actions'
import {onProductsResponse} from '../client/products/actions'

function waitForProductsResponse(resolve) {
  const id = register(({action}) => {
    switch (action) {
      case onProductsResponse:
        unregister(id);
        initCursor(() => {return true;});
        resolve();
        break;
    }
  });
}

export function initStores(query) {
  return new Promise((resolve, reject) => {
    if (initCursor() || !query.q) {
      resolve();
    } else {
      waitForProductsResponse(resolve);
      searchForQuery(query.q);
    }
  });
}