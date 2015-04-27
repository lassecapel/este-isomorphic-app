import React from 'react';
import PureComponent from '../components/purecomponent.react';

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
      <div style={{textAlign: 'center'}} className='col-xs-6 col-sm-4 col-md-3 col-lg-3'>
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
