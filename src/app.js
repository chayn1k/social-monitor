import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory, createHashHistory } from 'history';
import Router from './core/Router';
import routes from './routes';


const history = process.env.NODE_ENV === 'production' ? createHashHistory() : createHistory();

let cssContainer = document.getElementById('css');
const appContainer = document.getElementById('app');
const context = {
    onSetTitle: value => document.title = value,
    onSetMeta: (name, content) => {
        // Remove and create a new <meta /> tag in order to make it work
        // with bookmarks in Safari
        const elements = document.getElementsByTagName('meta');
        [...elements].forEach((element) => {
            if (element.getAttribute('name') === name) {
                element.parentNode.removeChild(element);
            }
        });
        const meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
};

const router = <Router routes={routes} history={history} context={context} />;

ReactDOM.render(router, appContainer, () => {
    // Remove the pre-rendered CSS because it's no longer used
    // after the React app is launched
    if (cssContainer) {
        cssContainer.parentNode.removeChild(cssContainer);
        cssContainer = null;
    }
});
