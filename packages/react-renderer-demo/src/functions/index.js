const path = require('path');
const functions = require('firebase-functions');
const next = require('next');
const { join } = require('path');
const { parse } = require('url');

let dev = process.env.NODE_ENV !== 'production';
let app = next({
  dev,
  conf: { distDir: `${path.relative(process.cwd(), __dirname)}/next` }
});
let handle = app.getRequestHandler();

exports.next = functions.https.onRequest((req, res) => {
  console.log('File: ' + req.originalUrl); // eslint-disable-line no-console
  return app.prepare().then(() => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // handle GET request to /service-worker.js
    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname);

      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  });
});
