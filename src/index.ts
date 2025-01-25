config();
import { config } from 'dotenv';
import express from 'express';
const app = express();
import routes from './routes/routes.js';
import path from 'path';
import { getDir } from './libs/get-dir.js';
import serveStatic from 'serve-static';
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
