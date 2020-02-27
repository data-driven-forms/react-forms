
const path = require('path');
const functions = require('firebase-functions');
const next = require('next');

let dev = process.env.NODE_ENV !== 'production';
let app = next({
  dev,
  conf: { distDir: `${path.relative(process.cwd(), __dirname)}/next` }
});
let handle = app.getRequestHandler();

exports.next = functions.https.onRequest((req, res) => {
  console.log('File: ' + req.originalUrl); // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res));
});
