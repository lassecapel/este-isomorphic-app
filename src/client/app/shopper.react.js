import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link, RouteHandler} from 'react-router';
import {isLoggedIn} from '../user/store';
import {state, productsCursor} from '../state';
import immutable from 'immutable';

// Leverage webpack require goodness for feature toggle based dead code removal.
// require('./app.styl');

export default class Shopper extends React.Component {

  componentDidMount() {
  }

  render() {
    const plaatjes = productsCursor();
    return (
      <DocumentTitle title='Dames Mode Shopper'>
        <div className="page">
          <header>
            <h1>Dames Mode Shopper</h1>
            <h2>De allerlaatste laatste tuniekjes</h2>
          </header>
          <div>
            {plaatjes.map((plaatje, i) => {
              return <div style={{float:"left"}}>
                <div>{plaatje.get('title')}</div>
                <div><Plaatje src={plaatje.get('src')} title={plaatje.get('title')}/></div>
              </div>;
            })}
          </div>
        </div>
      </DocumentTitle>
    );
  }

}


export class Plaatje extends React.Component {

  render() {
    return (
      <img src={this.props.src} style={{width: '150px', height: '80px'}} alt={this.props.title}/>
    );
  }

}

Plaatje.propTypes = {
  src: 'http://www.lacenicera.eu/wp-content/uploads/2011/01/leeg.jpg',
  title: 'No title'
};
