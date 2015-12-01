import CONST from '../constants/';
import AppDispatcher from '../core/AppDispatcher';
import history from '../core/History';
import StreamAPI from '../utils/StreamAPI';


const AppActions = {

    async changeQuery(query) {
        AppDispatcher.handleViewAction({
            type: CONST.ActionTypes.CHANGE_SEARCH_QUERY,
            data: query
        });

        if (query) {
            await StreamAPI.getMessagesByTag(query);
            history.push(`/tag/${query}`);
        } else {
            history.push('/');
        }
    }

};

export default AppActions;

