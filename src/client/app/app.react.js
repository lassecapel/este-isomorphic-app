import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link, RouteHandler} from 'react-router';
import {state} from '../state';

export default class App extends React.Component {

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
    return (
      <DocumentTitle title='Este.js App'>
        <div className='container-fluid'>
          <div className='row'>
            <ul className='nav nav-tabs'>
              <li role="presentation" className='active'><Link to="search">Search</Link></li>
              <li role="presentation"><Link to="todos">Todo's</Link></li>
            </ul>
          </div>
          <RouteHandler/>
          <footer>
            <p>
              made by Web Technology Innovation Squad
            </p>
          </footer>
        </div>
      </DocumentTitle>
    );
  }

}
