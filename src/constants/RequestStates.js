import keyMirror from 'fbjs/lib/keyMirror';

const states = {
    STATE_CHANGED: null,

    STATES_START: keyMirror({
        REQUEST_START: null,
        REQUEST_PROGRESS: null
    }),
    STATES_DONE: keyMirror({
        REQUEST_NONE: null,
        REQUEST_DONE: null,
        REQUEST_SUCCESS: null,
        REQUEST_ERROR: null
    })
};

states.STATES = Object.assign({}, states.STATES_START, states.STATES_DONE);
Object.assign(states, states.STATES_START, states.STATES_DONE);

export default states;
