import React from 'react';
import PureComponent from '../components/purecomponent.react';

import ProductImage from './product-image.react';

export default class ProductTile extends PureComponent {
  render() {
    const title = this.props.product.get('title');
    const productNumber = this.props.product.get('productNumber');
    const normalizedName = this.props.product.get('normalizedName');
    return (
      <div style={{textAlign: 'center'}} className='col-xs-6 col-sm-4 col-md-3 col-lg-3'>
        <div style={{height: '60px'}}>{title}</div>
        <div><ProductImage productNumber={productNumber} normalizedName={normalizedName} alt={title}/></div>
      </div>
    );
  }
}

ProductTile.propTypes = {
  product: React.PropTypes.shape({get: React.PropTypes.func.isRequired}).isRequired
};

