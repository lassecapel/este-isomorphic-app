import PureComponent from '../components/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import {searchForQuery, onSearchFieldChange} from './actions';
import {msg} from '../intl/store';
import exposeRouter from '../components/exposerouter.react';

class SearchBox extends PureComponent {

  searchOnEnter(e) {
    if (e.key === 'Enter') {
      const router = this.props.router;
      const path = router.getCurrentPathname();
      const params = router.getCurrentParams();
      const query = router.getCurrentQuery();
      query.q = this.props.query;
      router.transitionTo(path, params, query);
      searchForQuery(this.props.query);
    }
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

export default exposeRouter(SearchBox);
