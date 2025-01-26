config();
import path from 'path';
import express from 'express';
import { config } from 'dotenv';
import serveStatic from 'serve-static';
import routes from './routes/routes.js';
import { getDir } from './libs/get-dir.js';

const app = express();
const port = process.env.PORT || 8080;

//middleware
app.use(
  '/public',
  serveStatic(path.join(getDir(), '..', '..', 'public'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('content-type', 'application/javascript');
      }
    },
  }),
);

app.use(express.json());

//routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
