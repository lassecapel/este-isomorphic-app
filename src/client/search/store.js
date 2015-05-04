import {searchForQuery} from './actions';
import {register} from '../dispatcher';
import {searchCursor} from '../state';

export const dispatchToken = register(({action, data}) => {
  switch (action) {
    case searchForQuery:
      searchCursor(searchData => {
        const {q, page} = data;
        return searchData.set('query', q).set('page', page);
      });
      break;
  }
});

export function getSearchQuery() {
  return searchCursor().get('query');
}
export function getSearchPage() {
  return searchCursor().get('page');
}
