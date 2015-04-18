import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link, RouteHandler} from 'react-router';
import {isLoggedIn} from '../user/store';
import {state, productsCursor} from '../state';
import immutable from 'immutable';

// Leverage webpack require goodness for feature toggle based dead code removal.
// require('./app.styl');

export default
class ProductList extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <DocumentTitle title='Dames Mode Shopper'>
        <div className="page">
          <header>
            <h1>Dames Mode Shopper</h1>

            <h2>De allerlaatste laatste tuniekjes</h2>
          </header>
          <div>
            {
              this.props.products
                .map((product) => {
                  return <div style={{float:"left"}}>
                    <div>{product.get('title')}</div>
                    <div><ProductImage src={product.get('src')} title={product.get('title')}/></div>
                  </div>;
                })}
          </div>
        </div>
      </DocumentTitle>
    );
  }

}


class ProductImage extends React.Component {
  render() {
    return (
      <img src={this.props.src} alt={this.props.title}/>
    );
  }
}
