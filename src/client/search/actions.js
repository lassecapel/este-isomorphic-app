import setToString from '../../lib/settostring';
import {dispatch} from '../dispatcher';

export function searchForQuery(query) {
    console.log(query);
    //const query = search.get('query').trim();
    //if (!query) return;
    //dispatch(search, query);
}

export function onSearchFieldChange({target: {name, value}}) {
    dispatch(onSearchFieldChange, {name, value});
}

// Override actions toString for logging.
setToString('search', {
    searchForQuery, onSearchFieldChange
});
