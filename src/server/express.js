/*eslint-disable no-console */

import compression from 'compression';
import proxy from 'express-http-proxy';
import config from './config';
import express from 'express';
// import favicon from 'serve-favicon';
import render from './render';

export default function() {

  const app = express();

  app.use(compression());
  // TODO: Add favicon.
  // app.use(favicon('assets/img/favicon.ico'))
  // TODO: Move to CDN.
  app.use('/build', express.static('build'));
  app.use('/assets', express.static('assets'));

  app.use('/nlbe/api', proxy('https://www.wehkamp.com', {
    filter: function(req) {
      return req.method == 'GET';
    },
    forwardPath: function(req) {
      return req.originalUrl;
    }
  }));

  app.get('*', (req, res) => {
    const acceptsLanguages = req.acceptsLanguages(config.appLocales);
    render(req, res, acceptsLanguages || config.defaultLocale)
      .catch((error) => {
        const msg = error.stack || error;
        console.log(msg);
        res.status(500).send('500: ' + msg);
      });
  });

  app.listen(config.port);

  console.log(`App started on port ${config.port}`);

}
