import React from 'react';
import PureComponent from '../components/purecomponent.react';

import ProductTile from './product-tile.react';

export default
class ProductList extends PureComponent {
  render() {
    return (
      <div>
        {
          this.props.products
            .map((product) => {
              return <ProductTile key={product.get('productNumber')} product={product}/>;
            })
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  products: React.PropTypes.shape({map: React.PropTypes.func.isRequired}).isRequired
};
