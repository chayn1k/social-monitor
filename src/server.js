import 'babel-core/polyfill';
import path from 'path';
import express from 'express';

const server = global.server = express();
const port = process.env.PORT || 5000;
server.set('port', port);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/v1', require('./api/v1/routes'));

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`The server is running at http://localhost:${port}/`);
});
