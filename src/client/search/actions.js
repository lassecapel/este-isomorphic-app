import setToString from '../../lib/settostring';
import {dispatch} from '../dispatcher';

export function searchForQuery(query) {
    query.q = query.q.trim();
    if (!query) return;
    dispatch(searchForQuery, query);
}

// Override actions toString for logging.
setToString('search', {
    searchForQuery
});
