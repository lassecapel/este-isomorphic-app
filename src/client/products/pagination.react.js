import React from 'react';
import exposeRouter from '../components/exposerouter.react';
import PaginationLinks from './pagination-links.react.js';
import {getTotal} from './store';

class Pagination extends React.Component {
  render() {
    const router = this.props.router;
    const query = router.getCurrentQuery();
    const path = router.getCurrentPathname();
    return <PaginationLinks path={path} query={query} total={getTotal()}/>;
  }
}

Pagination.propTypes = {
  router: React.PropTypes.func.isRequired
};

export default exposeRouter(Pagination);
