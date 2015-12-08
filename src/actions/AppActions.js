import CONST from '../constants/';
import AppDispatcher from '../core/AppDispatcher';
import AppStore from '../stores/AppStore';
import history from '../core/History';


const AppActions = {

    changeQuery(query) {
        AppDispatcher.handleViewAction({
            type: CONST.ActionTypes.CHANGE_SEARCH_QUERY,
            data: query
        });
    },

    requestState(state) {
        AppDispatcher.handleViewAction({
            type: CONST.RequestStates.STATE_CHANGED,
            data: state
        });
    }

};

export default AppActions;

