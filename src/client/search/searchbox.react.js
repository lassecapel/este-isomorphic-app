import PureComponent from '../components/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import {searchForQuery, onSearchFieldChange} from './actions';
import {msg} from '../intl/store';

export default class SearchBox extends PureComponent {

    searchOnEnter(e) {
        if (e.key === 'Enter')
            searchForQuery(this.props.query)
    }

    render() {
        return (
            <input
                autoFocus
                className="search"
                name="query"
                onKeyDown={(e) => this.searchOnEnter(e)}
                placeholder={msg('search.placeholder')}
                onChange={onSearchFieldChange}
                value={this.props.query}
                />
        );
    }
}

SearchBox.propTypes = {
    search: React.PropTypes.instanceOf(immutable.Map)
};
