import App from './components/App';
import IndexPage from './components/IndexPage';
import InnerPage from './components/InnerPage';
import StreamPage from './components/Stream';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';


const routeConfig = [
    { path: '/',
        component: App,
        indexRoute: { name: 'index', component: IndexPage },
        childRoutes: [
            { component: InnerPage, childRoutes: [
                { path: '/tag', name: 'stream', component: StreamPage },
                { path: '/tag/:tagname', name: 'streamByTag', component: StreamPage }
            ]},

            { path: 'error', name: 'error', component: ErrorPage },
            { path: '/404', name: '404', component: NotFoundPage },
            { path: '*', component: NotFoundPage }
        ]
    }
];

export default routeConfig;
