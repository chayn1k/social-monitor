import env from '../utils/env';
import { createHistory, createHashHistory, createMemoryHistory } from 'history';

let history;

if (env.SERVER) {
    history = createMemoryHistory;
/* } else if (process.env.NODE_ENV === 'production') {
    history = createHashHistory; */
} else {
    history = createHistory;
}

export default history();
