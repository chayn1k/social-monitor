import http from '../core/HttpClient';
import dispatcher from '../core/AppDispatcher';
import CONST from '../constants/';
import logger from '../utils/logger.js';

const Api = CONST.Api;
const ActionTypes = CONST.ActionTypes;
const States = CONST.RequestStates;

class WebApiStream {

    async getMessagesByTag(query) {
        dispatcher.handleViewAction({
            type: States.STATE_CHANGED,
            data: States.REQUEST_START
        });
        try {
            const _query = query[0] === '#' ? query.slice(1) : query;
            const messages = await http.get(`${Api.STREAM}?q=${_query}`);
            dispatcher.handleServerAction({
                type: ActionTypes.REQUEST_MESSAGES_SUCCESS,
                data: messages
            });
            dispatcher.handleViewAction({
                type: States.STATE_CHANGED,
                data: States.REQUEST_SUCCESS
            });
        } catch (err) {
            logger.error(err);
            dispatcher.handleServerAction({
                type: ActionTypes.REQUEST_MESSAGES_ERROR,
                error: err
            });
            dispatcher.handleViewAction({
                type: States.STATE_CHANGED,
                data: States.REQUEST_ERROR
            });
        }
    }

}


export default new WebApiStream();
