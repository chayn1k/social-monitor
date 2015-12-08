import React, { Component, PropTypes } from 'react';
import AppStore from '../../stores/AppStore';
import StreamStore from '../../stores/StreamStore';
import StreamAction from '../../actions/StreamActions';

import PostsList from '../PostsList';


function _getInitState() {
    const appState = AppStore.getState();
    return {
        query: appState.query,
        columns: appState.columns,
        updateInterval: appState.updateInterval,
        updateStreamInterval: appState.updateStreamInterval,
        posts: StreamStore.getMessages()
    };
}


class Stream extends Component {

    static propTypes = {
        params: PropTypes.object.isRequired,
        location: PropTypes.object
    };

    constructor(props) {
        super(props);

        this._appSubscription = AppStore.addListener(this._onChangeAppStore);
        this._streamSubscription = StreamStore.addListener(this._onChangeStreamStore);
    }

    state = _getInitState();

    componentDidMount() {
        if (this.state.query) {
            StreamAction.receiveMessages(this.state.query);
            this.intervalMsgUpdateID = setInterval(() => StreamAction.receiveMessages(this.state.query), this.state.updateStreamInterval);
        }

        this.intervalMsgTimeID = setInterval(StreamAction.updateMessagesTime, this.state.updateInterval);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.query !== nextState.query) {
            if (this.intervalMsgUpdateID) clearInterval(this.intervalMsgUpdateID);
            StreamAction.receiveMessages(nextState.query);
            this.intervalMsgUpdateID = setInterval(() => StreamAction.receiveMessages(nextState.query), this.state.updateStreamInterval);
        }
    }

    componentWillUnmount() {
        this._appSubscription.remove();
        this._streamSubscription.remove();
        if (this.intervalMsgTimeID) clearInterval(this.intervalMsgTimeID);
        if (this.intervalMsgUpdateID) clearInterval(this.intervalMsgUpdateID);
    }


    _onChangeAppStore = () => {
        const appState = AppStore.getState();
        return this.setState({
            query: appState.query,
            columns: appState.columns,
            updateInterval: appState.updateInterval,
            updateStreamInterval: appState.updateStreamInterval
        });
    };

    _onChangeStreamStore = () => {
        return this.setState({
            posts: StreamStore.getMessages()
        });
    };


    render() {
        return (
            <PostsList posts={this.state.posts} columns={this.state.columns} />
        );
    }

}


export default Stream;
