import PureComponent from '../components/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import {searchForQuery} from './actions';
import {msg} from '../intl/store';
import exposeRouter from '../components/exposerouter.react';

class SearchBox extends React.Component {
  constructor(props) {
    super();
    this.updateState(props);
  }

  searchOnEnter(e) {
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

  componentWillReceiveProps(nextProps) {
    this.updateState(nextProps);
  }

  updateState(props) {
    this.state = {
      query: props.router.getCurrentQuery().q
    }
  }

  render() {
    return (
      <div>
        <input
          autoFocus
          className="search"
          name="query"
          onKeyDown={(e) => this.searchOnEnter(e)}
          placeholder={msg('search.placeholder')}
          />

        <p>Searched for {this.state.query}</p>
      </div>
    );
  }
}

export default exposeRouter(SearchBox);
