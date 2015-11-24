import http from '../core/HttpClient';
import dispatcher from '../core/AppDispatcher';
import CONST from '../constants/';
import logger from '../utils/logger.js';

const Api = CONST.Api;
const ActionTypes = CONST.ActionTypes;

class WebApiStream {

    async getMessagesByTag(query) {
        try {
            const messages = await http.get(`${Api.STREAM}?q=${query}`);
            dispatcher.handleServerAction({
                type: ActionTypes.REQUEST_MESSAGES_SUCCESS,
                data: messages
            });
        } catch (err) {
            logger.error(err);
            dispatcher.handleServerAction({
                type: ActionTypes.REQUEST_MESSAGES_ERROR,
                error: err
            });
        }
    }

}


export default new WebApiStream();
