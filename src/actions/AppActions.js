import CONST from '../constants/';
import AppDispatcher from '../core/AppDispatcher';


const AppActions = {

    queryChange(query) {
        AppDispatcher.handleViewAction({
            type: CONST.ActionTypes.CHANGE_SEARCH_QUERY,
            data: query
        });
    },

    columnsCountChange(count) {
        AppDispatcher.handleViewAction({
            type: CONST.ActionTypes.CHANGE_COLUMNS,
            data: count
        });
    },

    requestStateChange(state) {
        AppDispatcher.handleViewAction({
            type: CONST.RequestStates.STATE_CHANGED,
            data: state
        });
    }

};

export default AppActions;

