import {onSearchFieldChange,searchForQuery} from './actions';
import {Range, Record} from 'immutable';
import {getRandomString} from '../../lib/getrandomstring';
import {register} from '../dispatcher';
import {searchCursor} from '../state';

export const dispatchToken = register(({action, data}) => {
    switch (action) {
        case onSearchFieldChange:
            searchCursor(q => {
                const {name, value} = data;
                return q.setIn([name], value);
            });
            break;
        case searchForQuery:
            console.log(data);
            break;
    }
});

export function getSearchQuery() {
  return searchCursor().get('query');
}
