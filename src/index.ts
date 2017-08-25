import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';

import { __DEV__, DEFAULT_PORT } from './const';

export interface ServeOptions {
  logFormat?: string;
  port?: number;
}

export const serve = (subApp: Application, options: ServeOptions = {}) => {
  const app = express();
  const port = options.port || process.env.PORT || DEFAULT_PORT;

  app.use(compression());
  app.use(morgan(options.logFormat || __DEV__ ? 'dev' : 'combined'));

  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  app.use(bodyParser.text());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
  });

  app.use(subApp);

  app.listen(port, () => {
    console.log(`http://localhost:${ port }`);
  });
};
