import React from 'react';
import {Link} from 'react-router';
import SearchBox from '../search/searchbox.react';
import {state, searchCursor} from '../state';
import {dispatchToken} from '../search/store';

export default class SearchPage extends React.Component {

    render() {
        const search = searchCursor();
        return (
            <div>
                <h1>Search</h1>
                <SearchBox search={search} />
            </div>
        );
    }
}
