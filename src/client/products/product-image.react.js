import React from 'react';
import PureComponent from '../components/purecomponent.react';

export default class ProductImage extends PureComponent {
  render() {
    return (
      <img className='img-responsive' src={this.props.src} alt={this.props.title}/>
    );
  }
}

ProductImage.propTypes = {
  src: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};
