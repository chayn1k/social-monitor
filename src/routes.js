import React from 'react';
import Router from 'react-routing/src/Router';
import App from './components/App';
import IndexPage from './components/IndexPage';

const router = new Router(on => {
    on('*', async (state, next) => {
        const component = await next();
        return component && <App context={state.context}>{component}</App>;
    });

    on('/', async () => <IndexPage />);
});

export default router;
