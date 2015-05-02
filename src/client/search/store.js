import {searchForQuery} from './actions';
import {register} from '../dispatcher';
import {searchCursor} from '../state';

export const dispatchToken = register(({action, data}) => {
  switch (action) {
    case searchForQuery:
      searchCursor(q => {
        const {query} = data;
        return q.set('query', query.q).set('page', query.page);
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
