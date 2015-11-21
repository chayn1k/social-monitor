import React from 'react';
import Router from 'react-routing/src/Router';
import App from './components/App';
import IndexPage from './components/IndexPage';
import Stream from './components/Stream';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

import StreamActions from './actions/StreamActions';

const router = new Router(on => {
    on('*', async (state, next) => {
        const component = await next();
        return component && <App context={state.context}>{component}</App>;
    });

    on('/:tag', async (state) => {
        StreamActions.receiveMessages(state.params.tag);
        return <IndexPage />;
    });

    on('error', (state, error) => state.statusCode === 404 ?
        <App context={state.context} error={error}><NotFoundPage /></App> :
        <App context={state.context} error={error}><ErrorPage /></App>
    );
});

export default router;
