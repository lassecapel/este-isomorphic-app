import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link, RouteHandler} from 'react-router';
import {state} from '../state';
import exposeRouter from '../components/exposerouter.react';

class App extends React.Component {

  componentDidMount() {
    // Must be required here because there is no DOM in Node.js. Remember,
    // mocking DOM in Node.js is an anti-pattern, because it can confuse
    // isomorphic libraries. TODO: Wait for iOS fix, then remove.
    // http://developer.telerik.com/featured/300-ms-click-delay-ios-8/
    require('fastclick').attach(document.body);

    state.on('change', () => {
      /*eslint-disable no-console */
      console.time('whole app rerender');
      this.forceUpdate(() => {
        console.timeEnd('whole app rerender');
      });
      /*eslint-enable */
    });
  }

  render() {
    const isActive = this.props.router.isActive;
    return (
      <DocumentTitle title='Isomorphic Demo App' /* only shown when the route doesn't define a title */>
        <div className='container'>
          <div className='row'>
            <ul className='nav nav-tabs'>
              <li role="presentation" className={isActive('search') ? 'active' : null}><Link to="search">Search</Link></li>
              <li role="presentation" className={isActive('todos') ? 'active' : null}><Link to="todos">Todo's</Link></li>
            </ul>
          </div>
          <div className='row'>
            <RouteHandler/>
          </div>
          <div className='row'>
            <p>
              made by Web Technology Innovation Squad
            </p>
          </div>
        </div>
      </DocumentTitle>
    );
  }

}

App.propTypes = {
  router: React.PropTypes.func.isRequired
};

export default exposeRouter(App);
