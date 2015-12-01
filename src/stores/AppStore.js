import {Store} from 'flux/utils';
import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../core/AppDispatcher';

const _state = {
    columns: 3,
    updateInterval: 20000, // 20 sec
    updateStreamInterval: 30000 // 30 sec
};

class AppStore extends Store {

    __onDispatch(payload) {
        const action = payload.action;

        switch (action.type) {
            case ActionTypes.CHANGE_COLUMNS:
                _state.columns = action.data;
                break;

            case ActionTypes.CHANGE_SEARCH_QUERY:
                _state.query = action.data;
                break;

            case ActionTypes.CHANGE_UPDATE_INTERVAL:
                _state.updateInterval = action.data;
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

