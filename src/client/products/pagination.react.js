import React from 'react';
import exposeRouter from '../components/exposerouter.react';
import PureComponent from '../components/purecomponent.react';
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

const pagesAround = 5;
const steps = 10;
const productPerPage = 48;

class PaginationLinks extends PureComponent {
  handleClick(e, page) {
    e.preventDefault();
    const router = this.props.router;
    const query = this.props.query;
    if (query.page !== page) {
      query.page = page;
      router.transitionTo(this.props.path, {}, query);
    }
  }

  hrefForPage(page) {
    const router = this.props.router;
    const query = Object.assign({}, this.props.query); //clone query to avoid mutating it
    query.page = page;
    return router.makeHref(this.props.path, {}, this.props.query);
  }

  static getPages(page, total) {
    const pages = [];
    for (var i = 1; i <= total; i++) {
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
    const currentPage = parseInt(this.props.query.page);
    return (
      <div style={{textAlign: 'center'}}>
        <ul className="pagination">{PaginationLinks.getPages(currentPage, totalPages).map((page) =>
            <li key={page} className={page === currentPage ? 'active' : null}>
              <a href={this.hrefForPage(page)}
                 onClick={(e) => this.handleClick(e, page)}>{page}</a>
            </li>
        )}</ul>
      </div>
    );
  }
}

PaginationLinks = exposeRouter(PaginationLinks);

PaginationLinks.propTypes = {
  router: React.PropTypes.func.isRequired,
  path: React.PropTypes.string.isRequired,
  query: React.PropTypes.object.isRequired,
  total: React.PropTypes.number.isRequired
};



