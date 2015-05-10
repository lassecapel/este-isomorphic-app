import React from 'react';
import PureComponent from '../components/purecomponent.react';

export default class SearchMessage extends PureComponent {
  render() {
    return (
      <div className='row' style={{textAlign: 'center', height: '4em'}}>
        {this.props.query && <p>You search "{this.props.query}" resulted in {this.props.total} search results</p>}
      </div>
    );
  }
}

SearchMessage.propTypes = {
  query: React.PropTypes.string.isRequired,
  total: React.PropTypes.number.isRequired
};
