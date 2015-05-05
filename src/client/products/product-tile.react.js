import React from 'react';
import PureComponent from '../components/purecomponent.react';

import ProductImage from './product-image.react';

export default class ProductTile extends PureComponent {
  render() {
    const title = this.props.product.get('title');
    const productNumber = this.props.product.get('productNumber');
    const normalizedName = this.props.product.get('normalizedName');
    const src = 'https://assets.wehkamp.com/i/wehkamp/' + productNumber + '_pb_01/' + normalizedName + '.jpg?$product300x300$';
    return (
      <div style={{textAlign: 'center'}} className='col-xs-6 col-sm-4 col-md-3 col-lg-3'>
        <div>{title}</div>
        <div><ProductImage src={src} title={this.props.product.get('title')}/></div>
      </div>
    );
  }
}

ProductTile.propTypes = {
  product: React.PropTypes.shape({get: React.PropTypes.func.isRequired}).isRequired
};

