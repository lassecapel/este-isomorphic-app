import React from 'react';
import exposeRouter from '../components/exposerouter.react';
import {getTotal} from '../products/store'

class Pagination extends React.Component {
  render() {
    const page = this.props.router.getCurrentQuery().page || 1;
    return (<div>{page}/{getTotal()}</div>)
  }

}

export default exposeRouter(Pagination);
