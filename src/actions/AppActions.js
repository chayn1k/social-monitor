import CONST from '../constants/';
import AppDispatcher from '../core/AppDispatcher';


const AppActions = {

    changeQuery(query) {
        AppDispatcher.handleViewAction({
            type: CONST.ActionTypes.CHANGE_SEARCH_QUERY,
            data: query
        });
    },

    changeColumnsCount(count) {
        AppDispatcher.handleViewAction({
            type: CONST.ActionTypes.CHANGE_COLUMNS,
            data: count
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

