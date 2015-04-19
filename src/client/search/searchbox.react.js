import PureComponent from '../components/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import {searchForQuery} from './actions';
import {msg} from '../intl/store';
import exposeRouter from '../components/exposerouter.react';

class SearchBox extends PureComponent {
  handleKeyDown(e) {
    if (e.key === 'Enter') {
      const router = this.props.router;
      const path = router.getCurrentPathname();
      const params = router.getCurrentParams();
      const query = router.getCurrentQuery();
      query.q = e.target.value;
      router.transitionTo(path, params, query);
      searchForQuery(query.q);
    }
  }

  render() {
    return (
      <div>
        <input
          autoFocus
          className="search"
          name="query"
          onKeyDown={(e) => {this.handleKeyDown(e)}}
          placeholder={msg('search.placeholder')}
          defaultValue={this.props.query}
          />

        <p>Searched for {this.props.query}</p>
      </div>
    );
  }
}

export default exposeRouter(SearchBox);
