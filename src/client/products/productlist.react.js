import React from 'react';
import immutable from 'immutable';
import PureComponent from '../components/purecomponent.react';

// Leverage webpack require goodness for feature toggle based dead code removal.
// require('./app.styl');

export default
class ProductList extends PureComponent {
  render() {
    return (
      <div>
        {this.props.products
          .map((product) => {
            return <div style={{float:"left"}}>
              <div>{product.get('title')}</div>
              <div><ProductImage src={product.get('src')} title={product.get('title')}/></div>
            </div>;
          })}
      </div>
    );
  }

}


class ProductImage extends PureComponent {
  render() {
    return (
      <img src={this.props.src} alt={this.props.title}/>
    );
  }
}
