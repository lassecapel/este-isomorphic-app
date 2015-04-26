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
            return <ProductTile key={product.get('productId')} product={product}/>;
          })}
      </div>
    );
  }

}

class ProductTile extends PureComponent {
  render() {
    return (
      <div style={{float:"left"}}>
        <div>{this.props.product.get('title')}</div>
        <div><ProductImage src={this.props.product.get('src')} title={this.props.product.get('title')}/></div>
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
