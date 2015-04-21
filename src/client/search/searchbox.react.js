import PureComponent from '../components/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import {searchForQuery} from './actions';
import {msg} from '../intl/store';
import exposeRouter from '../components/exposerouter.react';

class SearchBox extends PureComponent {
  handleSubmit(e) {
    e.preventDefault();
    const router = this.props.router;
    const path = router.getCurrentPathname();
    const params = router.getCurrentParams();
    const query = router.getCurrentQuery();
    query.q = document.forms.searchForm.q.value;
    router.transitionTo(path, params, query);
    searchForQuery(query.q);
    return false;
  }

  render() {
    return (
      <div>
        <form name="searchForm" onSubmit={(e) => {this.handleSubmit(e)}}>
          <input
            className="search"
            name="q"
            placeholder={msg('search.placeholder')}
            defaultValue={this.props.query}
            />

        </form>
        <p>Searched for {this.props.query}</p>
      </div>
    );
  }
}

export default exposeRouter(SearchBox);
