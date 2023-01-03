const functions = require('firebase-functions');
const admin = require('firebase-admin');
const next = require('next');
const { join } = require('path');
const { parse } = require('url');

const isDev = process.env.NODE_ENV !== 'production';
// cant use next.config.mjs because its a ES module
const distDir = '../dist';
const nextjsDistDir = join('src', distDir);
const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: nextjsDistDir,
  },
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
              'created-at': createdAt ? createdAt.toDate : undefined, // eslint-disable-line camelcase
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

const github = require('@actions/github');

exports.sendComment = functions.https.onRequest(async (request, response) => {
  const token = functions.config().bot.token;
  const octokit = github.getOctokit(token);

  const { message, issueNumber, commentId } = request.body;

  functions.logger.log('updating/creating comment', request.body);
  try {
    if (commentId) {
      await octokit.rest.issues.updateComment({
        owner: 'data-driven-forms',
        repo: 'react-forms',
        // eslint-disable-next-line camelcase
        comment_id: commentId,
        body: message,
      });
      response.send(`Comment ${commentId} updated with message: ${message}`);
    } else {
      await octokit.rest.issues.createComment({
        owner: 'data-driven-forms',
        repo: 'react-forms',
        // eslint-disable-next-line camelcase
        issue_number: issueNumber,
        body: message,
      });
      response.send(`Comment in issue ${issueNumber} created with message: ${message}`);
    }
  } catch (e) {
    response.status(500).send('Something broke!');
  }
});
