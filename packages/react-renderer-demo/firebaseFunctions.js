const functions = require('firebase-functions');
const next = require('next');
const { join } = require('path');
const { parse } = require('url');

const isDev = process.env.NODE_ENV !== 'production';
const nextjsDistDir = join('src', require('./src/next.config.js').distDir);
const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: nextjsDistDir
  }
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = functions.https.onRequest((req, res) => {
  console.log('File: ' + req.originalUrl); // eslint-disable-line no-console
  return nextjsServer.prepare().then(() => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // handle GET request to /service-worker.js
    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname);

      nextjsServer.serveStatic(req, res, filePath);
    } else {
      nextjsHandle(req, res, parsedUrl);
    }
  });
});
