const functions = require('firebase-functions');
const admin = require('firebase-admin');
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

admin.initializeApp();

const db = admin.firestore();

exports.nextjsFunc = functions.https.onRequest((req, res) => {
  console.log('File: ' + req.originalUrl); // eslint-disable-line no-console
  return nextjsServer.prepare().then(() => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/notifications') {
      const endDate = Number(req.query.end);
      return db
        .collection('notifications')
        .doc('notifications')
        .get()
        .then((snapshot) => {
          const data = snapshot
            .data()
            .notifications.filter(({ active_till: activeTill }) => {
              const dueDate = activeTill.toDate();
              return dueDate.getTime() >= endDate;
            })
            .map(({ 'created-at': createdAt, active_till: activeTill, ...notification }) => ({
              ...notification,
              activeTill: activeTill.toDate(),
              'created-at': createdAt ? createdAt.toDate : undefined // eslint-disable-line camelcase
            }));
          res.status(200).json(data);
          res.finished = true;
          return res.end();
        });
    }

    // handle GET request to /service-worker.js
    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname);

      nextjsServer.serveStatic(req, res, filePath);
    } else {
      nextjsHandle(req, res, parsedUrl);
    }
  });
});
