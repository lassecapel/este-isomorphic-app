import React from 'react';
import {Link} from 'react-router';
import SearchBox from '../search/searchbox.react';
import {state, searchCursor} from '../state';
import {dispatchToken} from '../search/store';
import {dispatchToken as productsDispatch}  from '../products/store';
import Shopper from '../products/shopper.react';

export default class SearchPage extends React.Component {

    render() {
        const search = searchCursor();
        return (
            <div>
                <h1>Search</h1>
                <SearchBox search={search} />
                <Shopper/>
            </div>
        );
    }
}
