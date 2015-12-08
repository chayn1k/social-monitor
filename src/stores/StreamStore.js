import {Store} from 'flux/utils';
import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../core/AppDispatcher';
import moment from 'moment';

import logger from '../utils/logger';


let _messages = {
    __index: []
};

class StreamStore extends Store {

    __onDispatch(payload) {
        const action = payload.action;

        switch (action.type) {
            case ActionTypes.REQUEST_MESSAGES:
                break;

            case ActionTypes.REQUEST_MESSAGES_SUCCESS:
                this.addMessages(action.data);
                this.__emitChange();
                break;

            case ActionTypes.REQUEST_MESSAGES_ERROR:
                logger.error('__onDispatch@StreamStore:25', action.error, action.error.stack);
                break;

            case ActionTypes.UPDATE_MESSAGE_TIME:
                this.updateMessagesTime();
                this.__emitChange();
                break;

            case ActionTypes.CHANGE_SEARCH_QUERY:
                this.clearStore();
                break;

            default:
                return true;
        }
    }


    clearStore() {
        _messages = {
            __index: []
        };
    }


    addMessages(messages) {
        const tmpIndex = [];
        if (!_messages.__index) {
            _messages.__index = [];
        }

        messages.forEach(msg => {
            tmpIndex.push(msg.id);
            _messages[msg.id] = msg;
            _messages[msg.id].createdFromNow = moment(msg.createdAt).fromNow();
        });
        _messages.__index.unshift.apply(_messages.__index, tmpIndex);
    }

    updateMessagesTime() {
        const index = _messages.__index;
        for (let ind = 0, len = index.length; ind < len; ind++) {
            _messages[index[ind]].createdFromNow = moment(_messages[index[ind]].createdAt).fromNow();
        }
    }

    getMessages() {
        let result = [];

        if (_messages.__index && _messages.__index.length) {
            result = _messages.__index.map(msgId => _messages[msgId]);
        }

        return result;
    }


    getMessage(id) {
        return _messages[id];
    }

}

const instance = new StreamStore(Dispatcher);
export default instance;

