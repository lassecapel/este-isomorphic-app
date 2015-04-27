import setToString from '../../lib/settostring';
import {dispatch} from '../dispatcher';

export function searchForQuery(query) {
    if (!query) return;
    dispatch(searchForQuery, query);
}

// Override actions toString for logging.
setToString('search', {
    searchForQuery
});
