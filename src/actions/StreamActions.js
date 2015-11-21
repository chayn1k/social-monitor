import CONST from '../constants/';
import AppDispatcher from '../core/AppDispatcher';
import StreamAPI from '../utils/StreamAPI';


const StreamActions = {

    async receiveMessages(query) {
        AppDispatcher.handleViewAction({
            type: CONST.ActionTypes.REQUEST_MESSAGES,
            data: query
        });
        StreamAPI.getMessagesByTag(query);
        this.updateMessagesTime();
    },

    updateMessagesTime() {
        setInterval(() => {
            AppDispatcher.handleViewAction({
                type: CONST.ActionTypes.UPDATE_MESSAGE_TIME
            });
        }, 20 * 1000);
    }

};

export default StreamActions;

