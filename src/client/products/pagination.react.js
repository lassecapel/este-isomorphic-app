import React from 'react';
import exposeRouter from '../components/exposerouter.react';
import PureComponent from '../components/purecomponent.react';
import {getTotal} from './store'
import {searchForQuery} from '../search/actions';

class Pagination extends React.Component {
  render() {
    const query = this.props.router.getCurrentQuery();
    const page = query.page ? parseInt(query.page) : 1;
    return <PaginationLinks page={page} total={getTotal()}/>;
  }
}


const pagesAround = 5;
const steps = 10;
const productPerPage = 48;

class PaginationLinks extends PureComponent {
  handleClick(e, page) {
    e.preventDefault();
    const router = this.props.router;
    const path = router.getCurrentPathname();
    const params = router.getCurrentParams();
    const query = router.getCurrentQuery();
    if (query.page !== page) {
      query.page = page;
      router.transitionTo(path, params, query);
      searchForQuery(query);
    }
  }

  hrefForPage(page) {
    const router = this.props.router;
    const path = router.getCurrentPathname();
    const params = router.getCurrentParams();
    const query = Array.prototype.slice(router.getCurrentQuery());
    query.page = page;
    return router.makeHref(path, params, query);
  }

  getPages(page, total) {
    const pages = [];
    for(var i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i % steps === 0 ||
        page - pagesAround <= i && i <= page + pagesAround ||
        i === total) {
        pages.push(i);
      }
    }
    return pages;
  }

  render() {
    const totalPages = Math.ceil(this.props.total / productPerPage);
    const page = this.props.page;
    return <div style={{textAlign: 'center'}}>
      <ul className="pagination">{this.getPages(page, totalPages).map((page) =>
          <li className={page === this.props.page && 'active' || ''}>
            <a key={page}
               href={this.hrefForPage(page)}
               onClick={(e) => this.handleClick(e,page)}>{page}</a>
          </li>
      )}</ul>
    </div>;
  }
}

PaginationLinks = exposeRouter(PaginationLinks);

PaginationLinks.propTypes = {
  total: React.PropTypes.number.isRequired,
  page: React.PropTypes.number.isRequired
};


export default exposeRouter(Pagination);
