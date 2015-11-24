import StreamActions from './actions/StreamActions';

import App from './components/App';
import IndexPage from './components/IndexPage';
import Stream from './components/Stream';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';


const routeConfig = [
    { path: '/',
        component: App,
        indexRoute: { name: 'index', component: IndexPage },
        childRoutes: [
            { path: '/tag/:name', name: 'streamByTag', component: Stream,
                onEnter: (nextState) => {
                    StreamActions.receiveMessages(nextState.params.name);
                }
            },

            { path: 'error', name: 'error', component: ErrorPage },
            { path: '/404', name: '404', component: NotFoundPage },
            { path: '*', component: NotFoundPage }
        ]
    }
];

export default routeConfig;
