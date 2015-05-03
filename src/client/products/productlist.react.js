import React from 'react';
import PureComponent from '../components/purecomponent.react';

export default
class ProductList extends PureComponent {
  render() {
    return (
      <div>
        {this.props.products
          .map((product) => {
            return <ProductTile key={product.get('productNumber')} product={product}/>;
          })}
      </div>
    );
  }
}

class ProductTile extends PureComponent {
  render() {
    const title = this.props.product.get('title');
    const productNumber = this.props.product.get('productNumber');
    const normalizedName = this.props.product.get('normalizedName');
    const src='https://assets.wehkamp.com/i/wehkamp/' + productNumber + '_pb_01/' + normalizedName + '.jpg?$product300x300$';
    return (
      <div style={{textAlign: 'center'}} className='col-xs-6 col-sm-4 col-md-3 col-lg-3'>
        <div>{title}</div>
        <div><ProductImage src={src} title={this.props.product.get('title')}/></div>
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
