import CONST from '../constants/';
import AppDispatcher from '../core/AppDispatcher';
import StreamAPI from '../utils/StreamAPI';


const StreamActions = {

    async receiveMessages(query) {
        console.log('receiveMessages@StreamActions:9');
        AppDispatcher.handleViewAction({
            type: CONST.ActionTypes.REQUEST_MESSAGES,
            data: query
        });
        StreamAPI.getMessagesByTag(query);
    },

    updateMessagesTime() {
        AppDispatcher.handleViewAction({
            type: CONST.ActionTypes.UPDATE_MESSAGE_TIME
        });
    }

};

export default StreamActions;

