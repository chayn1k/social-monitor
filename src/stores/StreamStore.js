import {Store} from 'flux/utils';
import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../core/AppDispatcher';
import moment from 'moment';

import logger from '../utils/logger';


const _messages = {};

class StreamStore extends Store {

    __onDispatch(payload) {
        const action = payload.action;

        switch (action.type) {
            case ActionTypes.REQUEST_MESSAGES:

                // @todo: update search value
                break;
            case ActionTypes.REQUEST_MESSAGES_SUCCESS:
                this.receiveMessages(action.data);
                break;
            case ActionTypes.REQUEST_MESSAGES_ERROR:
                logger.error('__onDispatch@StreamStore:25', action.error, action.error.stack);
                break;
            case ActionTypes.UPDATE_MESSAGE_TIME:
                this.updateMessages();
                break;
            default:
                return true;
        }

        this.__emitChange();
    }

    receiveMessages(messages) {
        messages.forEach(msg => {
            if (!_messages._index) {
                _messages._index = [];
            }

            _messages._index.push(msg.id);
            _messages[msg.id] = msg;
            _messages[msg.id].createdFromNow = moment(msg.createdAt).fromNow();
        });
    }

    updateMessages() {
        for (const msgId in _messages) if (_messages.hasOwnProperty(msgId)) {
            _messages[msgId].createdFromNow = moment(_messages[msgId].createdAt).fromNow();
        }
    }

    get(id) {
        return _messages[id];
    }

    getAll() {
        let result = [];

        if (Object.keys(_messages).length) {
            result = _messages._index.map(msgId => _messages[msgId]);
        }

        return result;
    }

}

const instance = new StreamStore(Dispatcher);
export default instance;

