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
    var inputValue = document.forms.searchForm.q.value;
    if (query.q !== inputValue) {
      query.q = inputValue;
      query.page = 1;
      router.transitionTo(path, params, query);
    }
  }

  render() {
    return (
      <form name="searchForm" onSubmit={(e) => {this.handleSubmit(e)}}>
        <div className='col-md-2'>
        <input
          className="form-control"
          type='text'
          name="q"
          placeholder={msg('search.placeholder')}
          defaultValue={this.props.query}
          />
          <input type='hidden' name='page' value='1' />
        <p>Searched for {this.props.query}</p>
        </div>
      </form>
    );
  }
}

export default exposeRouter(SearchBox);
