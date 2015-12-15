import CONST from '../constants/';
import AppDispatcher from '../core/AppDispatcher';
import StreamAPI from '../utils/StreamAPI';


const StreamActions = {

    async receiveMessages(query) {
        AppDispatcher.handleViewAction({
            type: CONST.ActionTypes.REQUEST_MESSAGES,
            data: query
        });

        await StreamAPI.getMessagesByTag(query);
    },

    showNewMessages() {
        AppDispatcher.handleViewAction({
            type: CONST.ActionTypes.SHOW_NEW_MESSAGES
        });
    },

    updateMessagesTime() {
        AppDispatcher.handleViewAction({
            type: CONST.ActionTypes.UPDATE_MESSAGES_TIME
        });
    }

};

export default StreamActions;

