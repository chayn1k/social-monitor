import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import RoutingContext from './core/RoutingContext';
import routes from './routes';
import Html from './components/Html';


const server = global.server = express();
const port = process.env.PORT || 5000;
server.set('port', port);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(cookieParser());
server.use(session({
    secret: '12345SOCMON509876',
    key: 'pagination',
    resave: false,
    saveUninitialized: true
}));
server.use(express.static(path.join(__dirname, 'public')));


//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/v1', require('./api/v1/'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
    try {
        let statusCode = 200;
        let html;
        const data = { title: '', description: '', css: '', body: '' };
        const css = [];
        const context = {
            onInsertCss: value => css.push(value),
            onSetTitle: value => data.title = value,
            onSetMeta: (key, value) => data[key] = value,
            onPageNotFound: () => statusCode = 404
        };

        req.session.__save = true; // hack

        match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                renderProps.context = context;

                data.body = ReactDOM.renderToStaticMarkup(<RoutingContext {...renderProps} />);
                data.css = css.join('');
                html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

                res.status(statusCode).send('<!doctype html>\n' + html);
            } else {
                res.status(404).send('Not found');
            }
        });
    } catch (err) {
        next(err);
    }
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`The server is running at http://localhost:${port}/`);
});
