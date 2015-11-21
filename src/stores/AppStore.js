import {Store} from 'flux/utils';
import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../core/AppDispatcher';

let _state = {
    columns: 3
};

class AppStore extends Store {

    __onDispatch(payload) {
        const action = payload.action;

        switch (action.type) {
            case ActionTypes.CHANGE_COLUMNS:
                _state.columns = action.data;
                break;

            default:
                return true;
        }
        this.__emitChange();
    }

    get(key) {
        return _state[key];
    }

    getState() {
        return _state;
    }

}

const instance = new AppStore(Dispatcher);
export default instance;

