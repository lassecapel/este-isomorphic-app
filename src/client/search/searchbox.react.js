import PureComponent from '../components/purecomponent.react';
import React from 'react';
import {msg} from '../intl/store';
import exposeRouter from '../components/exposerouter.react';

class SearchBox extends PureComponent {
  handleSubmit(e) {
    e.preventDefault();
    const router = this.props.router;
    const query = router.getCurrentQuery();
    var inputValue = React.findDOMNode(this.refs.searchBoxInput).value;
    if (query.q !== inputValue) {
      query.q = inputValue;
      query.page = 1;
      router.transitionTo(router.getCurrentPathname(), router.getCurrentParams(), query);
    }
  }

  render() {
    return (
      <form name='searchForm' onSubmit={(e) => {this.handleSubmit(e)}}>
        <div className='col-md-2'>
        <input
          className='form-control'
          type='text'
          name='q'
          ref='searchBoxInput'
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

SearchBox.propTypes = {
  router: React.PropTypes.func.isRequired,
  query: React.PropTypes.string
};

export default exposeRouter(SearchBox);
